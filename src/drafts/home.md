# SignPath.io

## Why do you need SignPath?

SignPath Features

<table>
<tr><td>

**Secure key storage**
</td><td>

* Private keys are generated and stored on a FIPS validated HSM in a secured data center
* Keys cannot be stolen

</td></tr><tr><td>

**Extended Validation**
</td><td>

* Get Extended Validation (EV) certificates without USB tokens
* Immediate SmartScreen reputation, no user warnings

</td></tr><tr><td>

**Deep signing**
</td><td>

* Define complex and nested artifacts
* Specify which files will be signed signing and signing methods
* Nested artifacts will be signed inside-out in one step

</td></tr><tr><td>

**Build automation**
</td><td>

* Easily integrate code signing into build automation/CI
* PowerShell script, Web API and CI integrations provided
* Sign in one step at the end of the build process (or after it) thanks to deep signing
* Support versioning and branching strategies

</td></tr><tr><td>

**Policy definition and enforcement**
</td><td>

* Define usage constraints for release certificates
* Create signing projects for repeated signing
* For release signing, combine manual approval (single approver or k-out-of-n)
* ... and automatic verification based on
  * file structure (names, composition, meta data)
  * existing signatures (e.g. third party components)
  * build system and source control properties (e.g. repositories, branches, build configurations)
* Compulsory virus scanning

</td></tr><tr><td>

**User and role management**
</td><td>

* Define usage constraints for release certificates
* Create signing projects for repeated signing
* For release signing, combine manual approval (single approver or k-out-of-n)
* ... and automatic verification based on
  * file structure (names, composition, meta data)
  * existing signatures (e.g. third party components)
  * build system and source control properties (e.g. branches)
* Compulsory virus scanning

</td></tr><tr><td>

**User and role management**
</td><td>

* Separation of roles between development teams and security teams
* Assign roles per project for release-signing, test-signing, or more
* Use machine identities for build systems
* Use username/password login (provided by Microsoft Azure B2C) or social accounts (currently Microsoft, Google, GitHub)
* Azure AD integration and SAML-based login available soon

</td></tr><tr><td>

**Auditing**
</td><td>

* Every action is recorded: configuration changes, submission, approval, processing, signing
* Append-only event log is the primary data source, other data can be reconstructed or verified
* User and access data are recorded (including internal IP address if reported by proxy)
* Deep signing allows for clear audit presentation
* Sound foundation for incident research, forensics, as well as certificate revocation decisions and re-signing

</td></tr><tr><td>

**Signing Methods**
</td><td>

* Microsoft Authenticode (executables, installers, PowerShell scripts)
* ClickOnce manifest signing (includes Office add-ins)
* Open Packaging Conventions signing (includes Visual Studio extensions)
* NuGet signing

</td><td><table>
