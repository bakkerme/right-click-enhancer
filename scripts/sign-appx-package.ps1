Read-Host 'Confirm you have run npm run create-and-trust-certs before running this!'

cd .\keys
& 'C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe' sign /fd SHA256 /a /f .\MyKey.pfx ..\RightClickEnhancer\edgeextension\package\edgeExtension.appx

cd ..\

echo "Signed!"