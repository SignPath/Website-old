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

## Alignment of development and InfoSec objectives

Development teams and InfoSec people often have diverging objectives:

* For **software developers,** the job is done when things work. While security *is* an important part of the software development profession, there are so many other problems to take care of. Also, not every development team has a time budget for security. Code signing, like everything else, must be **simple and easy to automate.**
* Today's **agile development and DevOps teams** often tend to sacrifice secure processes for speed and flexibility. A long-winded 10 step code signin process involving several people will be the first thing some will throw out the window when it impedes automation. Also, CI and CD pipelines have enough pitfalls already, code signing must be reliable and **not break builds and deployments.**
* **InfoSec teams** often have a diametrically opposed purpose: they need to make sure that undesired activities *cannot* take place -- often at the expense of simplicity in development and operations teams. Their time is limited too: they want to define **secure operational policies** and move on to the next security-related matter.

**Simplicity is security!** Obscure process will be disregarded by teams under pressure. Even when executed in good faith, repetitive and tiresome manual processes are prone to errors caused by inattentiveness.

SignPath provides a simple model that meets the requirements of all parties including  corporate stakeholders. It's easy to set up and does not interfere with development processes, in fact it makes automation of code signing really simple. At the same time it provides full control for the InfoSec team at a policy level.

### Developer goals

<table><thead><tr>
  <th>Goals</th>
  <th>SignPath features</th>
</tr></thead><tbody>
<tr><td>

**Signed code works for users**

* Installation of downloaded files without warnings.
* Correct publisher name displayed during installation time.
* DevOps: Use application control/whitelisting.

</td><td>

**Automatic verification**

* Verification of certificates, signatures, time stamps and manifest identities ensures that code signing has the intended effects for your users. No surprises at installation time. ![TODO](..\todo.png)
* Warning if artifacts contain unsigned files. ![TODO](..\todo.png)

</td></tr><tr><td>

**Simplicity**

* No code signing know-how required.
* Treat signing as a final or post-build step.
* Get clear error messages.

</td><td>

**Rely upon secure defaults**

* Comprehensive documentation for code signing and SignPath available for those who want to dig deep.
* SignPath configurations are secure by defaults, guidance where choices are required.
* Deep signing allows you to put code signing at the end or your build process, or past it.
* When something goes wrong, developer tools do not always specify the exact reason. SignPath will accompany generic API error messages with likely reasons and advice.

</td></tr><tr><td>

**Agility**

* Minimize overhead per release.
* Support release processes and branching models.

</td><td>

**Projects and signing policies**

* For each project, specify artifact contents and signing policies once, then automate signing.
* Evolve artifact configurations as your project changes.
* When branches start to drift apart, simply match your branching model in SignPath. ![TODO](..\todo.png)

</td></tr><tr><td>

**Continuous integration and delivery (CI/CD)**

* Simple integration with CI tools and services.
* No messing with complicated tools, USB tokens, certificate stores, vendor CSPs.
* Fully automated builds.

</td><td>

**Build system integration**

* Call SignPath from build scripts using our PowerShell script or simple REST APIs.
* Use synchronous or asynchronous mode (for delayed approvals).
* No failed builds: SignPath.io service downtimes are within timeout limits.

</td><td></tbody></table>

### InfoSec goals

<table><thead><tr>
  <th>Goals</th>
  <th>SignPath features</th>
</tr></thead><tbody>
<tr><td>

**Sign code so code execution policies can be installed**

* Use with Windows WDAC Code Integrity Policies, AppLocker or third party whitelisting products.
* Every executable file, including DLLs, needs to be signed for whitelisting.
* Cannot fall back to individual file hashes (administration nightmare).

</td><td>

**Deep signing**

* With SignPath deep signing, development teams and contractors can easily sign all files in a package.
* For packages with incomplete signing, use SignPath to deep-sign packages based on their own signature. ![TODO](..\todo.png)

</td></tr>
<tr><td>

**Control certificate issuance and renewal**

* Get certificates from commercial or in-house Certificate Authorities.
* Monitor validity periods.

</td><td>

**Certificate management**

* Easily create Certificate Signing Requests (CSRs) for secure certificate purchase or in-house issuance.
* Import existing certificates.
* Create self-signed certificates for test-signing.
* Get notified before certificates expire. ![TODO](..\todo.png)
* Renew certificates.

</td></tr>
<tr><td>

**Private key security**

* Secure HSM key generation and key storage.
* Prevent direct access to HSM.
* Ensure that signing is authorized.

</td><td>

**HSM key storage and signing requests**

* SignPath.io uses SafeNet Luna Network HSMs [validated][luna fips] for FIPS 140-1 and FIPS 140-2 Level 3, and certified for Common Criteria (ISO/IEC15408).
* SignPath always creates HSM-based keys as *non-exportable*, they cannot be read or copied from HSM storage even with physical administrative access.
* Access to HSMs is limited to dedicated servers. These servers are several tiers from the Web server farm and do not participate in synchronous transactions. ![TODO](..\todo.png) <!-- currently access is required in order to read certain HSM key properties -->
* Only authorized (and approved) signing requests will be processed by servers with access to HSMs.

</td></tr>
<tr><td>

**Ensure reliable signing methods**

* Only use secure algorithms and ciphers, strong keys
* Always use time stamps

</td><td>

**No insecure or outdated methods**

* Certificates created or requested by SignPath use SHA-256 hash digests and 2048 bit RSA keys
* Signaturs always uses the SHA-256 hash algorithm for artifact digests.
* Even for formats that still default to insecure SHA-1 signatures, SignPath always uses SHA-256 (including time stamps).

**Reliable time stamp authority**

* No more depending on free but unreliable public time stamp servers - SignPath.io uses a paid time stamp authority. ![TODO](..\todo.png)
* SignPath signatures are always time stamped, regardless of methods and certificates.

</td></tr>
<tr><td>

**Constrain certificate usage for products and projects**

* Restrictions based on content.

</td><td>

**Artifact configurations**

* Signing requests are restricted to the content specified in the project's artifact configuration.
* Unexpected files are not signed.
* If containers (e.g. installation packages) contain unexpected executable files, signing will be denied or approvers will be warned (depending on configuration). ![TODO](../todo.png)

</td></tr>
<tr><td>

**Enforce signing process through policies**

* CA-issued certificates require stricter policies and monitoring than test certificates.
* Assign user roles for submission and approval.

</td><td>

**Define projects with artifact configurations and signing policies**

* Administrators control signing process by defining policies.
* Approval and automation can be decentralized.
* Define test- and release-signing policies per product/project.

</td></tr>
<tr><td>

**Full auditing and notifications**

* Keep track of all administrative activities as well as signing submissions and aprovals.
* Audit data must be relatable to develpment and release processes.
* Log every private key usage, but don't get lost in noise.

</td><td>

**Append-only data storage**

* SignPath.io uses [event sourcing], an append-only data architecture for applications.
* Activities are not merely logged: the log *is* the primary data source for every entity.
* Data views are only caches that can be verified or rebuilt at any time.

**Mulit-level logging and correlation**

* Audit logs are maintained on HSM and application levels.
* Audit logs can be downloaded for routine or random sample inspections, and for forensic evaluation. ![TODO](..\todo.png)
* Tooling for log correlation allows to verify that every private key usage can be accounted for by an authorized signing request. ![TODO](..\todo.png)
* Single-request deep signing ensures that multiple key usages can be traced to a single signing request (build, release, approval).

</td></tr>
</tbody></table>

<!-- markdownlint-enable MD036 -->

[luna fips]: https://data-protection-updates.gemalto.com/2018/07/24/safenet-luna-hsm-7-now-fips-140-2-level-3-validated/
[event sourcing]: https://martinfowler.com/eaaDev/EventSourcing.html