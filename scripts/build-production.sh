#!/bin/sh
echo "Creating build with ManifoldJS"
NODE_ENV=prod npm run build && manifoldjs -l debug -p edgeextension -f edgeextension -m build/manifest.json

echo "Copying over image assets"
cp -fr store-assets/* RightClickEnhancer/edgeextension/manifest/Assets/

echo "Updating Manifest"
cd ./RightClickEnhancer/edgeextension/manifest
sed -i 's/INSERT-YOUR-PACKAGE-IDENTITY-NAME-HERE/1778hyperfocus.systems.RightClickEnhancer/' appxmanifest.xml
sed -i 's/INSERT-YOUR-PACKAGE-IDENTITY-PUBLISHER-HERE/1A1BED3A-A583-4770-8B49-66781F57030A/' appxmanifest.xml
sed -i 's/Version="0.0.1.0"/Version="1.0.0.0"/' appxmanifest.xml
sed -i 's/INSERT-YOUR-PACKAGE-PROPERTIES-PUBLISHERDISPLAYNAME-HERE/hyperfocus.systems/' appxmanifest.xml
sed -i 's/transparent/black/' appxmanifest.xml

cd ../../../
manifoldjs -l debug -p edgeextension package RightClickEnhancer/edgeextension/manifest/

echo "Finished! Find your package in RightClickEnhancer/edgeextension/package"
