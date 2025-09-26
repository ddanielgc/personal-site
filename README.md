# Personal Website Infrastructure

This project provisions the infrastructure for hosting the personal website `danielgusmaocampos.com` using Pulumi and AWS. The website is a React-based static SPA hosted on S3, served via CloudFront, secured with ACM, and managed with Route53 DNS.

## Stack Overview

- **Frontend**: React SPA
- **Infrastructure**:
  - **S3**: Static site hosting
  - **CloudFront**: Content delivery network (CDN) with HTTPS
  - **ACM**: SSL/TLS certificates for HTTPS
  - **Route53**: DNS management for `danielgusmaocampos.com`
- **IaC Tool**: Pulumi (TypeScript)

## Prerequisites

- Pulumi CLI (>= v3): [Install Pulumi](https://www.pulumi.com/docs/get-started/install/)
- Node.js (>= 14): [Install Node.js](https://nodejs.org/)
- AWS credentials configured (e.g., via `aws configure` or environment variables)

## Getting Started

1. Install dependencies:

    ```bash
    npm install
    ```

2. Configure Pulumi stack:

    ```bash
    pulumi stack select prod
    ```

3. Deploy the infrastructure:

    ```bash
    pulumi up --yes
    ```

4. Access the website:
   - The website will be available at the CloudFront distribution domain name.

## Project Layout

- `Pulumi.yaml` — Pulumi project and template metadata
- `index.ts` — Pulumi program defining the AWS infrastructure
- `tsconfig.json` — TypeScript configuration
- `package.json` — Project dependencies and scripts
- `components/` — React components for the website
- `public/` — Static assets for the website

## Deployment

To deploy the website to production:

```bash
npm run deploy:prod
```

## Teardown

To destroy the infrastructure:

```bash
pulumi destroy --yes
```
