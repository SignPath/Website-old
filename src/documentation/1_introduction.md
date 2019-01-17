**Title:** Introduction - SignPath.io

# Introduction to SignPath.io

@[toc]

## Setting up SignPath

The following table separates steps between two roles:

* **Administrator**: has control over your SignPath organization, but does not necessarily know how the development team works.
* **Development**: people who know the details of your development process, but don't necessarily have administrative privileges in SignPath.

See also: [Distribution of roles](#distribution-of-roles)

### Steps

<table>
  <thead>
    <tr>
      <th>Step</th>
      <th>Responsible</th>
      <th>Description</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Create an organization</td>
      <td>Administrator</td>
      <td>

Register for a free trial or paid subscriptions ![TODO](todo.png)

</td></tr>
    <tr>
      <td>Create or import certificates</td>
      <td>Administrator</td>
      <td>

You will need at least two certificates:

* For test signing: create self-signed certificates.
* For release signing: create Certificate Signing Requests (CSRs) and get certificates from a commercial Certificate Authority (CA) or an in-house CA.

Notes:

* You may choose to get different certificates for each product, customer, etc.
* You can also import existing certificates. You will be warned that this is potentially insecure.

</td></tr>
    <tr>
      <td>Create user accounts</td>
      <td>Administrator</td>
      <td>

Set up your team:

* Invite other users to your organization
* Create CI user accounts to integrate SignPath in your automated builds
* Assign permissions by adding users to singing policies

</td></tr>
    <tr>
      <td>Create projects</td>
      <td>Development</td>
      <td>

Identify projects that need to be signed, restrict their content and define which elements need signing.

* Multiple files can be signed in a single step (includes deep signing of nested artifacts)
* The [artifact configuration] may be maintained by the development team and submitted to SignPath administrators when it changes.

</td>
    </tr>
    <tr>
      <td>Create signing policies</td>
      <td>Administrator</td>
      <td>

For each project
  
* create at least a test-signing and a release-signing policy
* assign a certificate and user permissions to each signing policy

</td></tr>
    <tr>
      <td>Integrate into CI builds</td>
      <td>Development</td>
      <!-- TODO: the link needs to be updated -->
      <td>

Use our PowerShell module or call our API for automatically submitting signing requests to SignPath. See [build system integration].
</td>
    </tr>
    <tr>
      <td>Disable old certificates</td>
      <td>Administrator</td>
      <td>

When everything is working, consider revoking existing unsafe certificates via your CA. (Signatures of properly time stamped code will still be valid.)

</td></tr>
  </tbody>
</table>

See [key concepts] for details about *projects* and *signing policies*.

## Distribution of roles

SignPath is designed to make sure that people in charge of security have full control over code signing. Therefore, it makes sense to assign the role of *organization administrator* to security persons, such as InfoSec officers. It is also possible to assign administrative privileges to people in the development team. This can be on a permanent basis, or only temporarily to speed up initial setup. You can go with a model where every change has to be implemented by a dedicated administrator, or you can decentralize administration and have InfoSec review change audit logs regularly. Use the model that works best for your organization.

If you aim for the highest security, we recommend assigning the administrator role only to InfoSec staff and have them working directly with the development teams.

## Using SignPath

### Signing code

There are two ways for submitting signing requests:

* Use the Web application to submit artifacts for signing
  * Go to the application dashboard
  * Select a project and signing policy
  * Upload a file
* Use the PowerShell module or call our API

In any case, you will receive e-mail notifications for your request and be able to monitor them in the Web application.

### Approving signing requests

For signing policies that require approval, each approver will receive an e-mail notification whenever an approval is requested. Approvers will also see signing request waiting for their approval in the application dashboard.

### Administration

Administrators will be notified about important events. They can also use the Web application to see a full activity audit for each entity, including users, certificates, projects, signing policies and signing requests.

[key concepts]: 2_key_concepts.md.html
[artifact configuration]: 3_artifact_configuration.md.html
[build system integration]: 4_build_integration.md.html