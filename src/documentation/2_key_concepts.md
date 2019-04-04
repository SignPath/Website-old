**Title:** Key concepts - SignPath.io

@[toc]

# Key concepts

The major entities in SignPath are **projects**, **certificates** and **users**. They are all part of your **organization**.

Each **project** consists of

* one or more **artifact configurations** that define how an artifact (or a version of the artifact) is structured, and which parts should be signed as well as the signing methods
* one or more **signing policies** (typically *test-signing* and *release-signing*) that declare the rules for signing and specify a **certificate**

When an artifact needs to be signed, a **signing request** for a specific **project**, **signing policy** and **artifact configuration** are created.

This UML class diagram shows the fundamental relationships:
![Key concepts UML](documentation_key-concepts_v2.png)

## Projects

Define a project for each artifact, or for each set of artifacts that should be signed in a single step.

Typically, there is one set of artifacts per software product, development team or project. If you use continuous integration (CI) tools, the artifacts will be the output of a single build configuration, or a subset of that output. Or maybe you have several build configurations that create different versions of structurally identical artifacts – those can still be represented by a single SignPath project.

!!! info ![Information](info.png) Use build automation
If you don’t use a CI system or some other kind of build automation, we highly recommend starting now. A reproducible build process is a most basic ingredient for safe code signing.
!!!

## Artifact configurations

At the core of each SignPath project is an artifact configuration. It describes the file type of your artifact and a corresponding code signing method (e.g. an EXE file signed with Authenticode). You can specify multiple artifact configurations to allow different versions of your software to be signed (e.g. in case the structure of your artifact changes). You can also sign multiple files or complex nested artifacts, e.g.

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

* Distribute the certificate only to testing devices
* Usually a self-signed certificate

</td>
    <td>Only permitted submitters (people or CI pipelines)</td>
    <td>Since the certificate is only valid in test environments and builds are frequent, manual approval is usually not required.</td>
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

[artifact configuration]: 3_artifact_configuration.md.html
