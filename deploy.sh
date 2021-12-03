cd secrets-manager-extension
chmod +x index.js
npm install
cd ..

chmod +x extensions/secrets-manager-extension
zip -r extension.zip .

aws lambda publish-layer-version \
 --layer-name "secrets-manager-extension" \
 --region "us-east-2" \
 --compatible-runtimes "nodejs12.x" \
 --zip-file  "fileb://extension.zip"
