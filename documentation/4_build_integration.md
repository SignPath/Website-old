**Title:** Build system integration - SignPath.io

@[toc]

# Build system integration

## Abstract

This section describes how SignPath can be integrated into automated builds using continuous integration software. You can use the PowerShell module provided by SignPath, or directly call the Web API to submit signing requests.

!!! info ![Information](../info.png) Locating ID values
All necessary IDs can be found on the signing policy details page, including a code snippet that calls the PowerShell module.
!!!

## Authorization

Before accessing the API, you have to create a CI User in the User section of the SignPath application. Make sure to keep the access token in a secure location.

## PowerShell

SignPath can be integrated in your automated build process by using our API. For convenience, we provide a PowerShell module that can be used from within your build/deploy chain. The module can be downloaded from [signpath.io](https://app.signpath.io/API/v1/Tools/SignPath.psm1).

Signing requests can be created by calling the following commands via PowerShell:

```powershell
Import-Module .\SignPath.psm1

# Submit a signing request and get a signing request ID without waiting for completion ...
$signingRequestID = Submit-SigningRequest
    -CIUserToken $CI_USER_TOKEN
    -OrganizationId $YOUR_ORGANIZATION_ID
    -CertificateConfigurationId $CERTIFICATE_CONFIGURATION_ID
    -InputArtifactPath $PATH_TO_INPUT_ARTIFACT

# ... and download the signed artifact later.
Get-SignedArtifact
    -CIUserToken $CI_USER_TOKEN
    -OrganizationId $YOUR_ORGANIZATION_ID
    -SigningRequestId $signingRequestID
    -OutputArtifactPath $PATH_TO_OUTPUT_ARTIFACT

# Or submit a signing request and wait for completion.
Submit-SigningRequest
    -CIUserToken $CI_USER_TOKEN
    -OrganizationId $YOUR_ORGANIZATION_ID
    -CertificateConfigurationId $CERTIFICATE_CONFIGURATION_ID
    -InputArtifactPath $PATH_TO_INPUT_ARTIFACT
    -OutputArtifactPath $PATH_TO_OUTPUT_ARTIFACT
    -WaitForCompletion
```

## HTTP REST API

In case the PowerShell module is not sufficient, you can communicate directly with our API by calling our public HTTP REST endpoints.

### Base URL and authorization

In order to call SignPath.io REST APIs, you need:

* an organization ID 
* the API token of a CI user

| Common values                   |     |
| ------------------------------- | --- |
| Base URL                        | `https://app.signpath.io/API/v1/`OrganizationId
| Authorization HTTP header field | `Authorization: Bearer <token>`

### Submit a signing request

| Synopsis           |      |
| ------------------ | ---- |
| URL                | `/SigningRequests`
| Method             | POST
| Format             | multipart/form-data
| `SigningPolicyId`  | Signing policy for which you want to create the signing request
| `Artifact`         | Artifact file
| `Description`      | Optional description for your signing request (e.g. version number)

**Example:**

```bash
curl -H "Authorization: Bearer $CI_USER_TOKEN" \
     -F "SigningPolicyId=$SIGNING_POLICY_ID" \
     -F "Artifact=@$PATH_TO_ARTIFACT" \
     -F "Description=$DESCRIPTION" \  
     https://app.signpath.io/API/v1/$ORGANIZATION_ID/SigningRequests
```

**Succcessful result:** HTTP status code `201`. A HTTP `Location` response-header field is returned with the URL of the created entity.

### Check the status of a signing request

| Synopsis   |      |
| ---------- | ---- |
| URL        | `/SigningRequests/`id <br> (`Location` response-header field from `SigningRequest)
| Method     | GET
| Parameters | none

**Example:**

```bash
curl -H "Authorization: Bearer $CI_USER_TOKEN" \
     https://app.signpath.io/API/v1/$ORGANIZATION_ID/SigningRequest/$SIGNING_REQUEST_ID
```

**Successful result:** HTTP status code `200`. Status of the signing request in JSON format:

```json
{
  "status":"Completed",
  "description":"called by curl",
  "projectId":"edd545ef-e113-48ba-aba7-de2d59ea2f26",
  "projectName":"SignPath Test Project",
  "signingPolicyId":"9ebd30b0-ef6b-4e46-a248-103516bc36fc",
  "signingPolicyName":"test-signing",
  "uploadedArtifactLink":"https://app.signpath.io/API/v1/a05be341-8a85-4c06-828a-710459e325ab/SigningRequests/a15e4d4f-7e03-4b15-9e2e-f3d8daeeaa75/UploadedArtifact",
  "signedArtifactLink":"https://app.signpath.io/API/v1/a05be341-8a85-4c06-828a-710459e325ab/SigningRequests/a15e4d4f-7e03-4b15-9e2e-f3d8daeeaa75/SignedArtifact"
}
```

**Possible `status` values:** `WaitingForApproval`, `QueuedForProcessing`, `Processing`, `Completed`, `Failed`, `Denied`, `Canceled`

### Download the signed artifact

Once the signing request has been successfully completed, the status response contains a `signedArtifactLink` field with a link to the signed artifact file. It can easily be retrieved by issuing the following command:

| Synopsis   |      |
| ---------- | ---- |
| URL        | `/SigningRequests/`id`/SignedArtifact` <br> (`signedArtifactLink` field from `GET SigningRequests/`id)
| Method     | GET  |
| Parameters | none

**Example:**

```bash
curl -H "Authorization: Bearer $CI_USER_TOKEN" \
     -o $LOCAL_PATH_TO_DOWNLOADED_ARTIFACT \
     https://app.signpath.io/API/v1/$ORGANIZATION_ID/SigningRequest/$SIGNING_REQUEST_ID/SignedArtifact
```

**Successful result:** HTTP status code `200`. Returns the binary content of the signed artifact.