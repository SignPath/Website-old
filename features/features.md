**Title:** Features - SignPath.io

# SignPath.io Features

@[toc]

## Benefits

With SignPath, it is easy to set up a secure and repeatable code signing process.

Benefits include:

* **Full control** for people in charge of **security**.
* **Simple workflows** for difficult topics including certificate management, user and machine permissions, automatic or rule-based approval.
* **No messing with details** such as signing tools and formats, time stamps, or HSMs.
* **Deep signing:** one-step signing of nested artifacts.
* Easy integration with **CI/CD pipelines**.

Security is the most important objective:

* SignPath eliminates the risk of **private key theft** without exposing you to the difficulties of key management, certificate storage and CSP drivers, USB tokens or HSM management.
* Using a few simple mechanisms, you can ensure that **only qualified builds will be signed**.
* Choose from various levels of **malware and virus detection**, including periodic re-scans.
* In case of an **incident**, you get full auditing and support for time-based certificate revocation and easy re-signing of earlier valid releases.

### Risk landscape

Code signing is a cornerstone of anti-malware protection. Operating systems, app stores, add-in systems, anti-malware tools and management software all rely on the validity of signatures and certificates. So naturally, code signing keys and processes are under constant attack. When they are compromised, an important line of defense in software distribution and updates is broken.

Software distributions and updates that are trusted to be from a specific author, vendor or publisher, might actually originate from hackers, blackmailers, or even political or corporate adversaries. They might simply be infected with a virus. Recent history has many cases of thorough attacks that started out with compromised code signing keys, including some well-reported high-profile attacks.

Insecure code signing practices and unprotected code signing keys are an invitation for hackers. Anyone who publishes software that is widely used, or used by customers that can be considered valuable targets, is also a potential first target in a staged attack. Recent research shows that ISVs and game studios make popular targets.

Compromised keys and certificates make users and customer organizations extremely vulnerable to various kinds of attacks. The owner of the compromised certificate will in turn face all kinds of problems, including reputation damage and liability claims.

Incident management is no breeze either without preparation -- what needs to be done when a code signing breach is discovered? Mistakes happen under distress, and it's a bad time to find out that you have made a mistake in the past, such as missing, invalid or weak time stamps.

## Objectives

SignPath aims to turn code signing into a controlled and repeatable process that aligns the needs of both development teams and InfoSec people.

While practices, tools and services for code signing usually focus on certificate management, there are also important process requirements. There are many recommendations, but they are hard and expensive to implement. SignPath addresses code signing from a process perspective. Our topmost priority is to make it easy to set up a code signing process that just works for development teams and is secure and auditable at the same time.

There is often a conflict of interests: development teams need to be responsive and productive and want InfoSec to get out of the way. On the other hand, InfoSec is responsible for minimizing the considerable risk associated with code signing and therefore need to get control over the process.

<!-- markdownlint-disable MD036 no emphasis as heading -->

## Goals map

### Developer goals

<table><thead><tr>
  <th>Goals</th>
  <th>SignPath features</th>
</tr></thead><tbody>
<tr><td>

**Sign code so it will work for end-users**

* Installation of downloaded files
* App store submissions
* DevOps: Use application control/whitelisting on dedicated servers

</td><td>

* Verification of certificates, signatures, time stamps and manifest identities.
* Warn if artifacts contain unsigned files.

</td></tr><tr><td>

**Simplicity**

* No code signing know-how required.
* Treat signing as a final or post-build step.
* Clear error messages.

</td><td>

* Sensible defaults, guidance where choices are required.
* Deep signing allows you to put code signing at the end or your build process -- or after building.
* When something goes wrong, developer tools do not always specify the exact reason. SignPath will accompany generic API error messages with likely reasons and advice.

</td></tr><tr><td>

**Agility**

* Minimize overhead per release
* Support release processes and branching models

</td><td>

* For each project, specify artifact contents and signing once, then sign automatically.
* Evolve these artifact configurations as your project changes.
* Re-signing old releases automatically uses the matching version of the artifact configuration.
* When old support branches start to differ, simply match your branching model in SignPath.

</td></tr><tr><td>

**Continuous integration and deployment (CI/CD)**

* Simple integration with CI tools and services
* No messing with complicated tools, USB tokens, certificate stores, vendor CSPs
* Fully automated builds

</td><td>

</td><td></tbody></table>

### InfoSec goals

<table><thead><tr>
  <th>Goals</th>
  <th>SignPath features</th>
</tr></thead><tbody>
<tr><td>

**Sign code so execution policies can be installed**

* Windows: WDAC Code Integrity or AppLocker
* Third party whitelisting products

</td><td>

</td></tr><tr><td>

**Control certificate issuance and renewal**

* Get certificates from commercial or in-house Certificate Authorities
* Monitor validity periods

</td><td>

</td></tr><tr><td>

**Private key security**

* Secure HSM key generation and storage
* Create certificate signing requests
* Prevent direct access to HSM

</td><td>

</td></tr><tr><td>

**Ensure reliable signing methods**

* Only use secure algorithms and ciphers, strong keys
* Always use time stamps

</td><td>

</td></tr><tr><td>

**Constrain certificate usage for products and projects**

* Restrictions based on content

</td><td>

</td></tr><tr><td>

**Enforce signing process through policies**

* Focus on policy definition, automate enforcement for individual signing requests
* Define test- and release-signing policies per product/project
* CA-issued certificates require stricter policies and monitoring than test certificates
* Assign user roles for submission and approval

</td><td>

</td></tr><tr><td>

**Full auditing and notifications**

* Audit data must retain to release process
* Detect unusual activities

</td><td>

</td></tr>
</tbody></table>

SignPath provides a simple model that meets the requirements of both parties. It's easy to set up and does not interfere with development processes, while at the same time providing full control for the InfoSec team.

<!-- markdownlint-enable MD036 -->
