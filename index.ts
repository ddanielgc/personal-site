import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create an S3 bucket
const siteBucket = new aws.s3.Bucket("siteBucket");

// Configure the bucket for static website hosting
const siteBucketWebsite = new aws.s3.BucketWebsiteConfiguration("siteBucketWebsite", {
    bucket: siteBucket.id,
    indexDocument: {
        suffix: "index.html",
    },
    errorDocument: {
        key: "error.html",
    },
});

// Create a CloudFront distribution for the S3 bucket
const cdn = new aws.cloudfront.Distribution("cdn", {
    origins: [
        {
            domainName: siteBucket.websiteEndpoint,
            originId: siteBucket.arn,
            customOriginConfig: {
                originProtocolPolicy: "http-only",
                httpPort: 80,
                httpsPort: 443,
                originSslProtocols: ["TLSv1.2"],
            },
        },
    ],
    enabled: true,
    isIpv6Enabled: true,
    defaultRootObject: "index.html",
    defaultCacheBehavior: {
        targetOriginId: siteBucket.arn,
        viewerProtocolPolicy: "redirect-to-https",
        allowedMethods: ["GET", "HEAD"],
        cachedMethods: ["GET", "HEAD"],
        forwardedValues: {
            queryString: false,
            cookies: { forward: "none" },
        },
        minTtl: 0,
        defaultTtl: 3600,
        maxTtl: 86400,
    },
    priceClass: "PriceClass_100",
    viewerCertificate: {
        cloudfrontDefaultCertificate: true,
    },
    restrictions: {
        geoRestriction: {
            restrictionType: "none",
        },
    },
});

// Request an ACM certificate for the domain
const certificate = new aws.acm.Certificate("certificate", {
    domainName: "danielgusmaocampos.com",
    validationMethod: "DNS",
});

// Create a Route53 hosted zone
const hostedZone = new aws.route53.Zone("hostedZone", {
    name: "danielgusmaocampos.com",
});

// Create a DNS record to point to the CloudFront distribution
const dnsRecord = new aws.route53.Record("dnsRecord", {
    zoneId: hostedZone.zoneId,
    name: hostedZone.name,
    type: "A",
    aliases: [
        {
            name: cdn.domainName,
            zoneId: cdn.hostedZoneId,
            evaluateTargetHealth: false,
        },
    ],
});

// Export the bucket name, website endpoint, CloudFront distribution domain name, certificate ARN, and hosted zone ID
export const bucketName = siteBucket.bucket;
export const bucketEndpoint = siteBucketWebsite.websiteEndpoint;
export const cdnDomainName = cdn.domainName;
export const certificateArn = certificate.arn;
export const hostedZoneId = hostedZone.zoneId;
