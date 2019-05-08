# Code signing maturity guide

## How do you keep your keys secure?

Extended Validation (EV) certificates are only available with hardware protection. While Organization Validated (OV) certificates can still be obtained from many Certificate Authorities without hardware protection, this is considered insecure.

<table><thead><tr>
  <th>Rating</th>
  <th>Private key location</th>
  <th>Risks</th>
</tr></thead><tbody>

<tr><td><p>0</p></td><td>

[PFX files] with private keys </td><td>

* A brute force attack on the PFX password might successfully retrieve your private key.
  * Depending on the entropy of your password and the password cipher your PFX file uses.
  * The PFX format does not prescribe a specific cipher.
  * Also, some files use a weak cipher for the container and a strong cipher for the private key with the same encryption key, so a brute force attack on the weak cipher will also reveal the encryption key for the private key.
* If your password leaks, your private key is accessible to everyone who has access to the PFX file.
  * In general, memorable passwords are unsafe, and high-entropy passwords need to be stored securely.
  * You basically shift the burden from private key secrecy to password secrecy.
* Sometimes PFX files are considered secure because they are only used for certificate installation. However, even a temporary exposure of the PFX file (e.g. via file shares, backup media or e-mail storage) will nullify this assumption.
* Key theft or abuse cannot be detected.

</td></tr>
<tr><td><p>1</p></td><td>

Windows certificate store</td><td>

* Certificates can be installed on machines without allowing key export. However, this relies on DPAPI storage, which relies on password secrecy and supports several restore options. DPAPI should not be trusted to keep secrets from people with access to the computer or disk, whether physical or remote, running or at rest.
* While DPAPI supports a certain level of event logging, this is intended for troubleshooting, not security.
* While CryptoAPI (which is used by Microsoft's signing tools) provides logging, it is up to the computer's administrator to ensure that logging is enabled, that logs are stored for a defined period, and that logs cannot be truncated and will not roll over.
* Even if the private key cannot be obtained as clear text, it can still be used by authorized users and services to create unwanted signatures.
* Key theft or abuse cannot be detected reliably.

</td></tr>
<tr><td><p>2</p></td><td>

USB [HSM] tokens </td><td>

Assuming FIPS 140-2 Level 2 or higher.

* While the private key cannot be retrieved from the USB device, the device itself must be kept secure. Since USB devices can easily be removed, this basically rules out permanent installation on build machines unless additional physical security measures are taken.
* Access to private keys is usually protected with proprietary password protection. Password entry is usually designed for manual usage scenarios such as authentication or signing of documents. USB HSM tokens do not usually provide secure authentication for automated scenarios.
* Unless the USB device has a proprietary logging mechanism, key abuse cannot be detected.

</td></tr>
<tr><td><p>3</p></td><td>

Professional [HSMs][HSM] </td><td>

Assuming FIPS 140-2 Level 2 or higher.

* Depending on connectivity, the HSM is always available on the network or on the computer where it is installed, access to the HSM must be constrained to ensure that only authorized users and services can use the private keys of code signing certificates.
* Additional measures are necessary in order to ensure that only valid signings are performed, especially in scenarios where many users, services or computers have access to the HSM.
  * Consider that developers, build engineers and test engineers often have extensive permission on build environments for troubleshooting, including remote access. In this case, it is easy to perform unmonitored and unaudited code signings.
* While secure logging is usually provided by HSMs, the resulting low-level log entries are hard to correlate to code signings, especially in scenarios where multiple software artifacts are signed for a single software release.

</td></tr></tbody></table>

While HSMs are strongly recommended, their security comes with a price.

* Considerable hardware cost for professional HSMs
* Administrative procedures and training for professional HSMs
* Dependency on physical device access for non-network devices (USB or PCI)
* Dependency on installation of vendor CSPs *(CryptoAPI Cryptographic Service Providers)*
  * Note that CryptoAPI is a legacy technology, so vendor CSPs are sometimes outdated and poorly supported. However, most code signing mechanisms by Microsoft including Authenticode cannot use the more modern *Cryptography API: Next Generation* (CNG) model.

[PFX files]: ../code-signing/2_theory#certificate-files
[HSM]: ../code-signing/3_windows#hardware-security-modules-hsms