# SignPath.io documentation

**This repository contains the product documentation and general code signing information displayed on [signpath.io](https://about.signpath.io/).**

The main sections are

* SignPath.io features
* Code signing
  * General information
  * Code signing for Windows (Authenticode, ClickOnce, OPC/VSIX, NuGet)
* SignPath product documentation

# How to build it
You can build a local version (including a TOC and some styling) by running
    
    npm run buildLocal

To build a release version, run

    npm run build

    _*Note: Important - you must upload all images to Wordpress first. Make sure to check all generated pages in the build folder thoroughly before calling the webhook.*_

For convenience, there are also `watch` and `watchLocal` commands that automatically rebuild when a markdown file changes. The generated files are in the folders `build` and `buildLocal` respectively.

In the future, merging into the `master` branch will automatically deploy the website and merging into a (yet-to-create) `develop` branch will deploy to a staging system. Currently, for production systems, the deployment has to be started manually.
