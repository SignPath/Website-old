[toc]

# Creating and deploying test certificates

Test certificates should not be created by commercial certificate authorities, and are therefore not recognized by operating systems and browsers.

This is a good thing, because you don't want your test-signing process to be as sensitive as your release-signing process. After all, a mistakenly or even maliciously signed binary should not affect your users and customers.

## Test certificate strategies

There are several strategies for creating and rolling out test certiticates.

<table><thead><tr>
    <th>Strategy</th>
    <th>Description</th>
  </tr></thead>

  <tbody>
    <tr><td><p>Manual installation of self-signed certificates</p></td>
    <td>

**Process:**

* Create a self-signed certificate in SignPath 
* Install it on every computer used for testing and development (manually or using a script)

**Advantages:**

* No set-up required

**Disadvantages:**

* Distribution mechanism not secure (users can be tricked into installing any certificate)
* Manual effort (once on every computer)
* Cannot revoke certificate in case of abuse

    </td></tr>
    <tr><td><p>Automatic installation of self-signed certificates</p></td>
    <td>

**Process:**

* Create a self-signed certificate in SignPath
* Install it on all or selected computers using auto-enrollment
* In case of serious incidents, disable these GPOs *and* add the certificate to computers *Untrusted Certificates* list

**Advantages:**

* Central control via GPOs
* Can use existing Active Directory groups and OUs for selection when using auto-enrollment

**Disadvantages:**

* Some configuration effort, especially if the certificate is to be trusted only on selected computers
* Cannot revoke certificatein case of abuse (but you can follow the incident process above)

    </td></tr>
    <tr><td><p>Issue certificate from an in-house CA</p></td>
    <td>

**Process:**

* Create a certificate signing request (CSR) in SignPath
* Depending on your permissions,
  * send the CSR to your PKI team, or
  * use your in-house CA (e.g. Microsoft Active Directory Certificate Services or OpenSSL) to issue the certificate
* Import the signed certificate in SignPath

**Advantages:**

* Central control via PKI
* Straight-forward revocation process

**Disadvantages:**

* Cannot easily limit certificate rollout to specific computers, business unites etc.

</td></tr>
</tbody></table>

## Certificate installation

### Certificate store selection

You shoud generally add self-signed test certificates to the `Trusted Root Certification Authorities` certificate store of computers you use for testing your software. If you do this, Windows will treat your test certificates as if they were issued by a trusted Root CA.

!!! info ![Information](info.png) Trusted Publishers
You may also add your test certificates to the `Trusted Publishers` store on internal machines. This is what happens when a user choses *always trust this publisher* during installation, and therefore results in the same behaviour, so don't do this if you want to replicate the default behaviour on user machines. Adding a certificate to this store will affect User Account Control (UAC) device driver installation prompts as well as whitelisting features such as Software Restriction Policies (SRP), AppLocker and WDAC Code Integrity Policies. (Only add your certificates to this store for computers in your own organization.)
!!!

### Manual installation

* Open the certificate in Windows Explorer
  * [Certificate file]: select *Open*.
  * Signed files: select *Properties* from the context menu, go to the *Digital Signatures* tab, open a signature *(Details)* and select *View Certificate*.
* In the certificate property window, click *Install Certificate...*
* Select *Current User* or *Local Machine* location
* Select the *Trusted Publishers* store

### Using scripts and batch files

* In PowerShell, use `Import-Certificate`
* In cmd.exe, use `CertUtil -ImportCert`

### Auto-enrollment

Use Group Policy Objects (GPOs) to add certificates to computers.

* In order to trust a certificate, create a GPO for
  * `Windows Settings`
  * `Security Settings`
  * `Public Key Policies/Trusted Root Certification Authorities`
* In order to explicitly un-trust a certificate, create a GPO for
  * `Windows Settings`
  * `Security Settings`
  * `Public Key Policies/Untrusted Certificates`

See also: [Configure certificate auto-enrollment][auto-enroll] (Microsoft)

[Certificate file]:../code-signing/2_theory#certificate-files
[auto-enroll]: https://docs.microsoft.com/en-us/windows-server/networking/core-network-guide/cncg/server-certs/configure-server-certificate-autoenrollment