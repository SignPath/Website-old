# Working with test certificates

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

* Central control
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

* Central control via existing PKI infrastructure
* Straight-forward revocation process

**Disadvantages:**

* Cannot easily limit certificate rollout to specific computers, business unites etc.

</td></tr>
</tbody></table>

## Certificate installation

### Manual

* You can open any certificate in Windows Explorer
  * Open a certificate file
  * Open a program file's property page in Windows Explorer and go to the *Digital Signatures* tab. From here, open a signature *(Details)* and select *View Certificate*.
* In the certificate property window, click *Install Certificate...*
* Select *Current User* or *Local Machine* location
* Select the *Trusted Publishers* store

### Scripting

* In PowerShell, use `Import-Certificate`
* In cmd.exe, use `CertUtil -ImportCert`

[auto-enroll]: https://docs.microsoft.com/en-us/windows-server/networking/core-network-guide/cncg/server-certs/configure-server-certificate-autoenrollment

### Auto-enrollment

Use Group Policy Objects (GPOs) to add certificates to computers.

* In order to trust a certificate, create a GPO for `Windows Settings/Security Settings/Public Key Policies/Trusted Publishers Certificates`
* In order to explicitly un-trust a certificate, create a GPO for  `Windows Settings/Security Settings/Public Key Policies/Untrusted Certificates`