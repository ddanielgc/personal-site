import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

/**
 * Configs (Pulumi.<stack>.yaml)
 * - project:domain           (obrigatório) ex: danielgusmaocampos.com
 * - project:bucketName       (opcional)    ex: danielgusmaocampos-com-prod-951590687560
 * - project:hostedZoneId     (opcional)    ex: Z0ABCDEF123456
 * - project:certificateArn   (opcional)    ex: arn:aws:acm:us-east-1:...:certificate/uuid
 */
const cfg = new pulumi.Config();
const domain = cfg.require("domain");
const bucketNameCfg = cfg.get("bucketName");     // opcional
const hostedZoneIdCfg = cfg.get("hostedZoneId"); // opcional
const certificateArnCfg = cfg.get("certificateArn"); // opcional

// Provider us-east-1 para ACM do CloudFront
const use1 = new aws.Provider("use1", { region: "us-east-1" });

/* =========================
 * Bucket S3 (nome do YAML se houver, senão determinístico e estável)
 * ========================= */
const accountId = aws.getCallerIdentityOutput().accountId;
const base = domain.replace(/\./g, "-").toLowerCase(); // danielgusmaocampos-com
const defaultBucketName = pulumi.interpolate`${base}-${pulumi.getStack()}-${accountId}`;
const bucketName = bucketNameCfg ?? defaultBucketName;

const siteBucket = new aws.s3.Bucket("site-bucket", { bucket: bucketName });

new aws.s3.BucketPublicAccessBlock("site-bucket-pubblock", {
  bucket: siteBucket.id,
  blockPublicAcls: true,
  blockPublicPolicy: true,
  ignorePublicAcls: true,
  restrictPublicBuckets: true,
});

/* =========================
 * Hosted Zone (reusa se hostedZoneId vier do YAML; senão, cria)
 * ========================= */
let hostedZoneId: pulumi.Output<string>;
let hostedZoneName: pulumi.Output<string>;
let nameServersOut: pulumi.Output<string[]>;

if (hostedZoneIdCfg) {
  const z = aws.route53.getZoneOutput({ zoneId: hostedZoneIdCfg });
  hostedZoneId = z.zoneId;
  hostedZoneName = z.name;
  nameServersOut = z.nameServers;
} else {
  const zone = new aws.route53.Zone("hosted-zone", { name: domain }, { protect: true });
  hostedZoneId = zone.zoneId;
  hostedZoneName = zone.name;
  // Para mostrar os NS como output mesmo quando criamos a zona
  const createdZ = hostedZoneId.apply(id => aws.route53.getZone({ zoneId: id }));
  nameServersOut = createdZ.apply(z => z.nameServers!);
}

/* =========================
 * ACM (reusa certificateArn do YAML; senão emite e valida por DNS)
 * ========================= */
let certificateArn: pulumi.Input<string>;

if (certificateArnCfg) {
  certificateArn = certificateArnCfg;
} else {
  const cert = new aws.acm.Certificate("cert", {
    domainName: domain,
    validationMethod: "DNS",
    subjectAlternativeNames: [`www.${domain}`],
  }, { provider: use1 });

  // Registros de validação na zona em uso
  const certVal = cert.domainValidationOptions.apply((opts) =>
    opts.map((o, i) =>
      new aws.route53.Record(`cert-val-${i}`, {
        zoneId: hostedZoneId,
        name: o.resourceRecordName,
        type: o.resourceRecordType,
        records: [o.resourceRecordValue],
        ttl: 60,
        allowOverwrite: true,
      })
    )
  );

  const certValidated = new aws.acm.CertificateValidation("certValidated", {
    certificateArn: cert.arn,
    validationRecordFqdns: certVal.apply((rs) => rs.map((r) => r.fqdn)),
  }, { provider: use1 });

  certificateArn = certValidated.certificateArn;
}

/* =========================
 * CloudFront (S3 REST + OAC; HTTPS; aliases para apex e www)
 * ========================= */
const oac = new aws.cloudfront.OriginAccessControl("oac", {
  originAccessControlOriginType: "s3",
  signingBehavior: "always",
  signingProtocol: "sigv4",
});

const cdn = new aws.cloudfront.Distribution("cdn", {
  enabled: true,
  isIpv6Enabled: true,
  comment: `CDN for ${domain}`,
  aliases: [domain, `www.${domain}`],
  origins: [{
    originId: "s3-origin",
    domainName: siteBucket.bucketRegionalDomainName, // REST endpoint (NÃO websiteEndpoint)
    originAccessControlId: oac.id,
    // Tipagem do provider pede a chave; com OAC, deixe string vazia:
    s3OriginConfig: { originAccessIdentity: "" },
  }],
  defaultRootObject: "index.html",
  defaultCacheBehavior: {
    targetOriginId: "s3-origin",
    viewerProtocolPolicy: "redirect-to-https", // 301 HTTP→HTTPS
    allowedMethods: ["GET", "HEAD"],
    cachedMethods: ["GET", "HEAD"],
    compress: true,
    forwardedValues: { queryString: false, cookies: { forward: "none" } },
    minTtl: 0, defaultTtl: 3600, maxTtl: 86400,
  },
  priceClass: "PriceClass_100",
  viewerCertificate: {
    acmCertificateArn: certificateArn,
    sslSupportMethod: "sni-only",
    minimumProtocolVersion: "TLSv1.2_2021",
  },
  restrictions: { geoRestriction: { restrictionType: "none" } },
  // Opcional (SPA): trata 403/404 como /index.html
  customErrorResponses: [
    { errorCode: 403, responseCode: 200, responsePagePath: "/index.html" },
    { errorCode: 404, responseCode: 200, responsePagePath: "/index.html" },
  ],
});

/* =========================
 * Bucket Policy (permite leitura S3 apenas via CloudFront OAC)
 * ========================= */
new aws.s3.BucketPolicy("site-bucket-policy", {
  bucket: siteBucket.id,
  policy: pulumi.all([siteBucket.arn, cdn.arn]).apply(([bArn, distArn]) => JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Sid: "AllowCloudFrontReadViaOAC",
      Effect: "Allow",
      Principal: { Service: "cloudfront.amazonaws.com" },
      Action: ["s3:GetObject"],
      Resource: `${bArn}/*`,
      Condition: { StringEquals: { "AWS:SourceArn": distArn } },
    }],
  })),
});

/* =========================
 * Route 53 Records (A/AAAA apex e www → CloudFront)
 * ========================= */
new aws.route53.Record("apex-a", {
  zoneId: hostedZoneId,
  name: domain,
  type: "A",
  aliases: [{ name: cdn.domainName, zoneId: cdn.hostedZoneId, evaluateTargetHealth: false }],
  allowOverwrite: true,
});
new aws.route53.Record("apex-aaaa", {
  zoneId: hostedZoneId,
  name: domain,
  type: "AAAA",
  aliases: [{ name: cdn.domainName, zoneId: cdn.hostedZoneId, evaluateTargetHealth: false }],
  allowOverwrite: true,
});
new aws.route53.Record("www-a", {
  zoneId: hostedZoneId,
  name: `www.${domain}`,
  type: "A",
  aliases: [{ name: cdn.domainName, zoneId: cdn.hostedZoneId, evaluateTargetHealth: false }],
  allowOverwrite: true,
});
new aws.route53.Record("www-aaaa", {
  zoneId: hostedZoneId,
  name: `www.${domain}`,
  type: "AAAA",
  aliases: [{ name: cdn.domainName, zoneId: cdn.hostedZoneId, evaluateTargetHealth: false }],
  allowOverwrite: true,
});

/* =========================
 * Outputs
 * ========================= */
export const bucketNameOut = siteBucket.bucket;
export const cloudFrontDomain = cdn.domainName;
export const distributionId = cdn.id;
export const certificateArnOut = certificateArn;
export const hostedZoneIdOut = hostedZoneId;
export const hostedZoneNameOut = hostedZoneName;
export const nameServers = nameServersOut; // útil para colar em Registered domains
