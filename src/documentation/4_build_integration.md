**Title:** Build system integration - SignPath.io

# Build system integration

@[toc]

## Abstract

This section describes how SignPath can be integrated into automated builds using continuous integration software. You can use the PowerShell module provided by SignPath, directly call the Web API to submit signing requests, or integrate SignPath as part of your AppVeyor build step.

!!! info ![Information](info.png) Locating ID values
All necessary IDs can be found on the signing policy details page, including a code snippet that calls the PowerShell module.
!!!

## Authorization

Before accessing the API, you have to create a CI User in the User section of the SignPath application.

The API token is displayed when a new CI user is created. (If you lose the API key, you will need to generate a new one.)

Make sure to keep the access token in a secure location. Most Continuous Integration (CI) systems provides a mechanism to store secrets, which is usually the best place to keep API tokens. If you use several distinct systems for API access, we recommend that you create individual CI User accounts in SignPath.

## PowerShell

SignPath can be integrated in your automated build process by using our API. For convenience, we provide a PowerShell module that can be used from within your build/deploy chain. The module can be downloaded from [PowerShell Gallery](https://www.powershellgallery.com/packages/SignPath).

Signing requests can be created by calling the following commands via PowerShell:

```powershell
Install-Module -Name SignPath

# Submit a signing request and get a signing request ID without waiting for completion ...
$signingRequestID = Submit-SigningRequest
    -CIUserToken $CI_USER_TOKEN
    -OrganizationId $YOUR_ORGANIZATION_ID
    -SigningPolicyId $SIGNING_POLICY_ID
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
    -SigningPolicyId $SIGNING_POLICY_ID
    -InputArtifactPath $PATH_TO_INPUT_ARTIFACT
    -OutputArtifactPath $PATH_TO_OUTPUT_ARTIFACT
    -WaitForCompletion
```

## HTTP REST API

In case the PowerShell module is not sufficient, you can communicate directly with our API by calling our public HTTP REST endpoints.

### Base URL and authentication

SignPath.io uses bearer authentication.

| Common API arguments            |     |
| ------------------------------- | --- |
| Base URL                        | `https://app.signpath.io/API/v1/`OrganizationId
| Authorization HTTP header field | `Authorization: Bearer <token>`

You need to provide these values for every single API request.

### Submit a signing request

| Synopsis           |      |
| ------------------ | ---- |
| URL                | `/SigningRequests`
| Method             | POST
| Encoding            | multipart/form-data
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

**Success result:** HTTP status code `201`. A HTTP `Location` response-header field is returned with the URL of the created entity.

### Check the status of a signing request

| Synopsis   |      |
| ---------- | ---- |
| URL        | `/SigningRequests/`id <br> (`Location` response-header field from `/SigningRequests`)
| Method     | GET
| Parameters | none

**Example:**

```bash
curl -H "Authorization: Bearer $CI_USER_TOKEN" \
     https://app.signpath.io/API/v1/$ORGANIZATION_ID/SigningRequest/$SIGNING_REQUEST_ID
```

**Success result:** HTTP status code `200`. Status of the signing request in JSON format:

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

**Success result:** HTTP status code `200`. Returns the binary content of the signed artifact.

## AppVeyor

If you are using the CI service AppVeyor, there is an alternative CI integration. Instead of pushing the artifact from your build script, you can issue an AppVeyor notification after your build, and SignPath.io will pull the artifact from AppVeyor. This results in additional confidence and provides the foundation for restricted Open Source signing.

### Rationale

By pulling the artifact from AppVeyor, SignPath.io can make sure that the binary artifact is a result of a specific build process applied to specific source code (branch and commit).

### Prerequisites and restrictions

This feature is a proof-of-concept for Open Source projects. Future versions may allow disabling certain limitations in paid subscriptions.

Current limitations:

  * The AppVeyor project and the Git repository must be public on one of the following hosting services:
    * GitHub
    * GitLab
    * Bitbucket

These are verified in order to guarantee that the binary results from the specified source code:

  * No additional scripts may be executed during the build step and no cache entries may be used (so that the build remains fully traceable and is only built from the repository)
  * The build settings must not be modified between starting the AppVeyor build and calling SignPath.io


### Build documentation

In order to enable independent verification of builds, SignPath performs the following actions:

  * For NuGet packages:
    1 The build settings are stored in an AppVeyorSettings.json file in the root of the NuGet package
    2 The commit hash and repository URL are written to the metadata of the NuGet package

These steps allow consumers of the signed artifact to confidently link the it to a specific source code version and build settings.

### Setup
This shows the secrets that need to be shared between AppVeyor.com and SignPath.io:
![AppVeyor Setup flow](documentation_build-integration_appveyor.png)

<table style="table-layout: auto;">
<thead>
  <tr>
    <th style="width: 20%;">Action</th>
    <th style="width: 40%;">Remarks</th>
    <th style="width: 40%;">Step by step</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Add an AppVeyor integration to a SignPath project</td>
    <td>SignPath.io must authenticate against Appveyor to retrieve the build artifacts</td>
    <td>

  1. On [ci.appveyor.com](https://ci.appveyor.com), select _My Profile_ and _API Keys_, then remember the **Bearer token** for the next step
  2. On SignPath.io, add an _AppVeyor integration_ to your _project_ and enter the **API key** you just acquired

  </td>
  </tr>
  <tr>
    <td>Encrypt the SignPath API token in AppVeyor</td>
    <td>AppVeyor lets you encrypt secret values. You can then safely use the encrypted string in your appveyor.yaml file</td>
    <td>

  1. On SignPath.io, choose the Users menu and create a new _CI User_ or open an existing one
  2. Remember the **SignPath API token** for the next step
  3. On [ci.appveyor.com](https://ci.appveyor.com), open _Account Settings_ and choose _[Encrypt YAML](https://ci.appveyor.com/tools/encrypt)_
  4. Enter **"Bearer &lt;SignPath API token&gt;"** (without quotes)
  5. Remember the **encrypted SignPath API token** for the next step

  </td>
  </tr>
  <tr>
    <td>Add a deploy Webhook</td>
    <td colspan="2">Append this to your appveyor.yaml file:

```yaml
deploy:
- provider: Webhook
  url: https://app.signpath.io/API/v1/<ORGANIZATION_ID>
/Integrations/AppVeyor?SigningPolicyId=<SIGNING_POLICY_ID>
  on_build_success: true
  on_build_failure: false
  on_build_status_changed: false
  method: POST
  authorization:
     secure: <ENCRYPTED_ACCESS_TOKEN>
```

Replace the parameters:

* `<ORGANIZATION_ID>` and `<SIGNING_POLICY_ID>` values can be retrieved from the Signing policy page
* `<ENCRYPTED_ACCESS_TOKEN>` is the value from the previous step

</td>
</tr>
</tbody>
</table>
