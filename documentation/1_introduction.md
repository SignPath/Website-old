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
      <td>Register for a free trial (paid subscriptions coming soon)</td>
    </tr>
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

</td>
    </tr>
    <tr>
      <td>Create user accounts</td>
      <td>Administrator</td>
      <td>

Set up your team:

* Invite other users to your organization
* Create CI user accounts to integrate SignPath in your automated builds
* Assign permissions by adding users to singing policies

</td>
    </tr>
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

</td>
    </tr>
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

</td>
    </tr>
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

# Key concepts

The major entities in SignPath are **projects**, **certificates** and **users**. They are all part of your **organization**.

Each **project** consists of

* an **artifact configuration** that defines how an artifact is structured, and which parts should be signed as well as the signing methods
* one or more **signing policies** (typically *test-signing* and *release-signing*) that declare the rules for signing and specify a **certificate**

When an artifact needs to be signed, a **signing request** for a specific **project** and **signing policy** is created.

This UML class diagram shows the fundamental relationships:
![Key concepts UML](key-concepts.png)

## Projects

In SignPath, you define a project for each artifact, or a set of artifacts that should be signed in a single step. Typically, there is one set of artifacts per software product, development team or project. If you use continuous integration (CI) tools, the artifacts will be the output of a single build configuration, or a part of it. Or maybe you have several build configurations that create different versions of structurally identical artifacts – those can still be represented by a single SignPath project. (If you don’t use CI, we highly recommend starting now. A reproducible build process is a most basic ingredient for safe code signing.)

At the core of each SignPath project is an artifact configuration. It describes the file type of your artifact and a corresponding code signing method (e.g. an EXE file signed with Authenticode). You can also sign multiple files or complex nested artifacts, e.g.

* a ZIP archive containing several artifacts that need Authenticode signing
* a CAB file containing EXE and DLL files, all of which should be signed with Authenticode
* an MSI installer containing an Office add-in, which in turn contains DLLs – the MSI file and the DLLs should be signed using Authenticode, while the Office add-in has a ClickOnce manifest that requires manifest signing

For complex nested artifacts, creating the artifact configuration is a bit more involved. You need to create an XML file that describes the artifact, with all its nested elements, and the signing actions you want performed on these files. See [creating an artifact configuration][artifact configuration].

Note that a tight configuration of your artifact reduces the risk of unwanted signatures. Add constraints liberally.

## Signing policies

The same project is usually signed for different purposes, most commonly test- and release-signing. Define signing policies for each project as required.
<table style="table-layout: auto;">
<thead>
  <tr>
    <th style="width: 10%;">Signing Policy</th>
    <th style="width: 20%;">Purpose</th>
    <th style="width: 20%;">Certificate requirements</th>
    <th style="width: 20%;">Signing requirements</th>
    <th style="width: 30%;">Remarks</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Test-signing</td>
    <td>

* Signing software for internal and external testing
* Testing signing configurations

</td><td>

* Distribute certificate only to testing devices
* Usually a self-signed certificate

</td>
    <td>Only permitted submitters (people or CI pipelines)</td>
    <td>Since certificate is only valid in test environments and builds are frequent, manual approval is usually not required.</td>
  </tr>
  <tr>
    <td>Release-signing</td>
    <td>

Signing software for

* distribution to customers and users
* installation on production environments

</td><td>

* Purchased from a public CA
* Issued by an in-house CA if only used internally

</td>
    <td>Usually requires manual approval for each build</td>
    <td>Release certificates are an attractive target. Be sure to review each signing request carefully before approval and don’t approve unexpected releases. Also, CI integration will help to make the entire build process more traceable.</td>
  </tr>
</tbody>
</table>

You might need more signing policies. For example, you might want to introduce an approval process for some submitters, but not for others. Or you might use different certificates for various kinds of builds. Define any number of signing policies to meet your organization’s requirements.

[key concepts]: #key-concepts
[artifact configuration]: 3_artifact_configuration.md.html
[build system integration]: 4_build_integration.md.html