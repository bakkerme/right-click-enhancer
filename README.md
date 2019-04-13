<p align="center" style="color: #343a40">
  <img src="https://raw.githubusercontent.com/bakkerme/right-click-enhancer/master/assets/right-click-enhancer.png" alt="right click enhancer" height="250">
  <h1 align="center">Right Click Enhancer</h1>
</p>

Right Click Enhancer is a **WebExtention** for **Microsoft Edge** that adds handy features to the context menu. 

This is a work-in-progress and more features will be added if it sounds good and useful. This extension is available on the Microsoft Store.

<a href='//www.microsoft.com/store/apps/9P9C8ZWGGFV9?cid=storebadge&ocid=badge' ><img src='https://assets.windowsphone.com/85864462-9c82-451e-9355-a3d5f874397a/English_get-it-from-MS_InvariantCulture_Default.png' alt='English badge' width="142px" style='width: 284px; height: 104px;'/></a>

## Features
* Can open a valid but unlinked URL in the page by highligting it
* Can open an image in a new tab
* Can save an image without it being renamed and converted to a PNG while in InPrivate mode
* ...and more to come

## Developing
These scripts were designed to be run in Windows Subsystem for Linux, but will probably work in Cygwin or a Linux VM. The Powershell scripts do need to be run in Windows, however.

Opening in developer hotreloading mode
```bash
npm install
npm start
```
This will create a `build` folder, which you then add into Edge via the Extensions menu. You will need to switch on extension developer features in `about:flags` if you haven't already. Dev mode has hot reloading and other nice things.

Creating a developer build
```bash
npm install
npm run build
```
Much like above, this will create the `build` folder, but doesn't hot reload or rebuild on save. 

## Production Build
You will need the Windows SDK installed for this.

Run:
```bash
npm run build-prod
```

An `edgeExtension.appx` will result in `./RightClickEnhancer/edgeextension/package`. This is an unsigned `appx` package, ready for submission to the Microsoft Store, if you have the required rights to submit an Edge extension.

### Signing for testing

In order to install the package created above, you will also need to sign the package with a certificate. I've assumed that the Windows SDK is installed at `C:\Program Files (x86)\Windows Kits\10\bin\x64\`, this may or may not be valid. If you don't have any exes in there, check one of the build folders in that dir.

Open an administrator Powershell and run
```powershell
npm run create-and-trust-certs
npm run sign-appx
```

This will create a `keys/` folder and create the certificates and trust them, then sign the previously created appx. **This may open your computer to risk, please make sure you know what this means.**

By double clicking the `edgeExtension.appx` package, you can install the package.
