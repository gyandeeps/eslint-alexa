echo clean up

rm -rf ./skill/*.zip

echo copy n install
cp ./index.js ./skill/index.js
cp -r src ./skill/
cd ./skill

#npm install alexa-sdk --no-save

echo zip file
"C:\Program Files\7-Zip\7z.exe" a -r skill.zip *

cd ..

echo done

