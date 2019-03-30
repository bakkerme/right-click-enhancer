Read-Host 'Confirm you have run create-and-trust-certs.ps1 in an administrator powershell before running this!'

cd .\keys
& 'C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe' sign /fd SHA256 /a /f .\MyKey.pfx ..\RightClickEnhancer\edgeextension\package\edgeExtension.appx

cd ..\

echo "Signed!"
