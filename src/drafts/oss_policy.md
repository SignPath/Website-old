# Code of Conduct for Open Source projects

**Draft**

## SignPath.io Terms and Services

* No signing of malware and potentially unwanted programs

## Additional conditions for free OSS SignPath.io subscriptions

* The project must use a OSI-approved Open Source license without commercial dual-licensing
* The project must be actively maintained

If you bring your own certificate, that's it. If your certificate is issued by [SignPath Foundation], see the next section for additional constraints.

## Code of Conduct for free code signing certificates (SignPath Foundation)

The code signing certificate is issued to [SignPath Foundation]. This means that SignPath Foundation is the publisher of the OSS project.

SignPath Foundation will therefore define and execute technical constraints and require project members to follow certain rules.

If any of the rules in the Code of Conduct are violated by the project team, SignPath Foundation reserves the right to

* pause or terminate the subscription without prior notice
* revoke the certificate effective immediately or retroactively

SignPath Foundation cannot except any liability for damages resulting from software signed with certificates that were issued to SignPath Foundation.

### OSS Subscription types

* Full OSS subscriptions
  * Allow projects to sign any file type, including executables and installers that are typically invoked by end users
  * SignPath Foundation will accept applications for full OSS subscriptions based on a projects reputation
* OSS library subscriptions
  * Allow projects to sign libraries and packages intended for software developers.
  * Since software developers can be expected to make educated decisions about which OSS libraries to trust and use, reputation checks are not normally performed.
  * However, SignPath Foundation reserves the right to reject any application.

### All OSS projects

#### Restrictions

* **Sign your own projects only**
  The team responsible for code signing must also be the team responsible for development and maintenance, including ownership of the source code repository.
* **Sign your own binaries only**
  The team must only sign software artifacts built from their own source  code.
  * Your team must be the maintainers of all source code files and build scripts
  * If you need signed libraries from another OSS project (“upstream”), ask them to get a signature via [SignPath Foundation] or any other means
  * If you need to build your own modified version of upstream software, you may sign it with your project’s certificate if
    * the upstream project publishes signed builds
    * your project visibly uses a fork of the upstream project, e.g. using GitHub’s fork feature
    * the release branches you use for signing are based on upstream branches that are usually signed
    * you fulfill all other obligations as required for your own project by this policy, e.g. code reviews for all changes of the upstream code base
  * You may include unsigned binaries of upstream OSS projects, e.g. DLL files, in your signed packages, e.g. MSI installers.
    * We kindly ask you to try and get as much signing coverage. If you use upstream libraries, please ask their maintainers to sign their code. Note that the “OSS library subscription” of SignPath.io and SignPath Foundation are available to all OSS library projects.
    * Note that in the future, SignPath Foundation may require that signed packages only include signed program and library files.
* **Don’t fight the system**
  You must accept all technical constraints in place for SignPath.io OSS subscription and not try to work around them. Noteworthy constraints include:
  * Binary artifacts must be built from source code in a verifiable way
  * Every release needs manual approval for signing
  * All team members must use multi-factor authentication
  * All signed binaries must have metadata attributes set enforced using [file attribute restrictions]
    * Set all *product name* attributes to your project's name
    * Set all *product version* attributes to the same value in each build
    * (remember that other project's binaries must not be signed, but may be included in signed packages and installers)

  Note that some constraints are not implemented yet.
* **No hacking tools**
  Software must not include features that may be used to circumvent security measures or exploit security vulnerabilities of their execution environment (e.g. operating system), including security diagnosis tools
  * We are aware of the utility of white hat security tools, but cannot sign them using SignPath Foundation certificates.

#### Program coding and information requirements

* **Respect user privacy and security**
  Software must not include features that compromise the privacy or security of users and their systems
  * Software that collects user data and transfers it to systems not specified by the user must a) describe this behavior in a privacy policy, b) display this policy during installation and c) include installation options to disable these functions
* **Announce system changes**
  Software must not modify the user’s system configuration without proper warnings
* **Provide uninstallation**
  Software that includes instructions or automated facilities for installation must also include instructions or automated facilities for uninstallation.

#### SignPath requirements

* **Assign code signing roles**
  The OSS project team must self-organize to create a team structure with clear responsibilities
  * **Authors**: people who are trusted to modify the source code in the project’s version control system without additional reviews
  * **Reviewers**: each change proposed by people who are not committers (e.g. pull requests) must be reviewed by a team member
  * **Approvers**: each signing request must be approved by a team member trusted by the entire team to decide if a certain release can be code signed (especially if all contributions
* **Specify a code signing policy**
  A code signing policy must be specified on the project’s home page
  * Use the term "**Code signing policy**" on your project’s home page and download/release pages (section header or link to a dedicated page)
  * Include the following information:
    * "Free code signing provided by [SignPath.io], certificate by [SignPath Foundation]"
    * Team role and their members (see above, may include references to the project’s permission groups). Example (markdown syntax):
      * Committers and reviewers: `[Members team](https://github.com/orgs/…/teams/members)`
      * Approvers: `[Owners](https://github.com/orgs/…/people?query=role%3Aowner)`
    * Privacy policy:
      * Link to your privacy policy or “This program will not transfer any information to other networked systems unless specifically requested by the user or the person installing or operating it.”
      * Remember to specify the privacy policies of other Open Source or third party components your application uses if your users are affected.
**Investigate accusations of violation**
  When SignPath Foundation receives complaints about violation of the Code of Conduct, the project team must assist in verification, investigation and root cause analysis.

### Additional conditions for OSS library subscriptions (SignPath Foundation)

* **Developer libraries only**
  Signed software must be built for the sole purpose of being used by other software developers.
  * Signed software must not be able to execute on computers of end users, e.g. by implementing plugin/add-in/extension interfaces of other applications.
  * If you want to build add-ins for other applications, you need to apply for a full OSS subscription.

[file attribute restrictions]:../documentation/3_artifact_configuration#file-attribute-restrictions

[SignPath Foundation]:https://signpath.org
[SignPath.io]:https://signpath.io
