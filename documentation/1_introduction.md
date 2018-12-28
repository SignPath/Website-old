**Title:** Introduction - SignPath.io

@[toc]

# Documentation <!-- TODO: table-of-contents or submenu -->

SignPath aims to turn code signing into a controlled and repeatable process that aligns the needs of both development teams and InfoSec people.

While practices, tools and services for code signing usually focus on certificate management, there are also important process requirements. There are many recommendations, but they are hard and expensive to implement. SignPath addresses code signing from a process perspective. Our topmost priority is to make it easy to set up a code signing process that just works for development teams and is secure and auditable at the same time.

There is often a conflict of interests: development teams need to be responsive and productive and want InfoSec to get out of the way. On the other hand, InfoSec is responsible for minimizing the considerable risk associated with code signing and therefore need to get control over the process.

<!-- TODO: nice-to-have: a table is not the ideal form to represent this information, maybe two divs that break on smaller screens are better --->

<table>
  <thead>
    <tr>
      <th>Developer priorities</th>
      <th>InfoSec priorities</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>

* *Sign code so it will work for end-users*
  * Installation of downloaded files
  * App store submissions
  * DevOps: Use application control/whitelisting on dedicated servers
* *Simplicity*
  * Sign multiple artifacts in one final step
  * Including nested artifacts (e.g. programs contained in installers)
  * Tool support, clear error messages
* *Agility*
  * Minimize overhead per release
  * Support release processes and branching models
* *Continuous integration (CI)*
  * Simple integration with CI tools and services
  * No messing with complicated tools, dongles, certificate stores
  * Fully automated builds

</td><td>

* *Sign code so execution policies can be installed*
  * Windows: WDAC Code Integrity or AppLocker
  * Third party whitelisting products
* *Control certificate issuance and renewal*
  * Get certificates from commercial or in-house Certificate Authorities
  * Monitor validity periods
* *Private key security*
  * Secure HSM key generation and storage
  * Create certificate signing requests
  * Prevent direct access to HSM
* *Ensure reliable signing methods*
  * Only use secure algorithms and ciphers, strong keys
  * Always use time stamps
* *Constrain certificate usage for products and projects*
  * Restrictions based on content
* *Enforce signing process through policies*  
  * Focus on policy definition, automate enforcement for individual signing requests
  * Define test- and release-signing policies per product/project
  * CA-issued certificates require stricter policies and monitoring than test certificates
  * Assign user roles for submission and approval
* *Full auditing and notifications*
  * Audit data must retain to release process
  * Detect unusual activities

</td>
    </tr>
  </tbody>
</table>

SignPath provides a simple model that meets the requirements of both parties. It's easy to set up and does not interfere with development processes, while at the same time providing full control for the InfoSec team.

## Setting up SignPath

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
      <td>InfoSec</td>
      <td>Register for a free trial (paid subscriptions coming soon)</td>
    </tr>
    <tr>
      <td>Create or import certificates</td>
      <td>InfoSec</td>
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
      <td>InfoSec</td>
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
* The [artifact configuration](creating-an-artifact-configuration/) may be maintained by the development team and submitted to SignPath administrators when they change.

</td>
    </tr>
    <tr>
      <td>Create signing policies</td>
      <td>InfoSec</td>
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

Use our PowerShell module or call our API for automatically submitting signing requests to SignPath. See [build system integration](build-system-integration/).
</td>
    </tr>
    <tr>
      <td>Disable old certificates</td>
      <td>InfoSec</td>
      <td>

When everything is working, consider revoking existing unsafe certificates via your CA. (Signatures of properly time stamped code will still be valid.)

</td>
    </tr>
  </tbody>
</table>

<!-- TODO: the link needs to be updated -->
See [key concepts](key-concepts/) for details about projects and signing policies.
Note that currently, all setup steps have to be performed using the Administrator role. This role might be assigned to InfoSec staff only, or shared with dedicated people from the development teams. If you aim for the highest security, we recommend giving this role only to InfoSec people and have them working directly with the development teams.

## Using SignPath

### Signing

There are two ways for submitting signing requests:

* Use the Web application to submit artifacts for signing
  * Go to the application dashboard
  * Select a project and signing policy
  * Upload a file
* Use the PowerShell module or call our API

In any case, you will receive e-mail notifications for your request and be able to monitor them in the Web application.

### Approval

For signing policies that require approval, each approver will receive an e-mail notification whenever an approval is requested. They can also review signing request waiting for their approval in the Web application.

### Administration

Administrator will be notified about important events. They can also use the Web application to see a full activity audit for each entity, including users, certificates, projects and policies, and signing requests.

# Key concepts

## Projects

In SignPath, you define a project for each artifact, or a set of artifacts that should be signed in a single step. Typically, there is one set of artifacts per software product, development team or project. If you use continuous integration (CI) tools, the artifacts will be the output of a single build configuration, or a part of it. Or maybe you have several build configurations that create different versions of structurally identical artifacts – those can still be represented by a single SignPath project. (If you don’t use CI, we highly recommend starting now. A reproducible build process is a most basic ingredient for safe code signing.)

At the core of each SignPath project is an artifact configuration. It describes the file type of your artifact and a corresponding code signing method (e.g. an EXE file signed with Authenticode). You can also sign multiple files or complex nested artifacts, e.g.

* a ZIP archive containing several artifacts that need Authenticode signing
* a CAB file containing EXE and DLL files, all of which should be signed with Authenticode
* an MSI installer containing an Office add-in, which in turn contains DLLs – the MSI file and the DLLs should be signed using Authenticode, while the Office add-in has a ClickOnce manifest that requires manifest signing

For complex nested artifacts, creating the artifact configuration is a bit more involved. You need to create an XML file that describes the artifact, with all its nested elements, and the signing actions you want performed on these files. See [creating an artifact configuration](creating-an-artifact-configuration/).

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
    <td>Limited to certain submitters (persons or CI)</td>
    <td>Since the scope of the certificate is very limited and builds are frequent, manual approval is usually not required.</td>
  </tr>
  <tr>
    <td>Release-signing</td>
    <td>
Signing software for

* Distribution to customers and users
* Installation on production environments

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