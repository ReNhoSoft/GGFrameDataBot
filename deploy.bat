tsc
del RoboMay.zip
7z a -tzip "RoboMay.zip" "./bin/"
7z a -tzip "RoboMay.zip" "node_modules"
7z a -tzip "RoboMay.zip" "data"
7z a -tzip "RoboMay.zip" "package.json"
7z a -tzip "RoboMay.zip" "tsconfig.json"
aws lambda update-function-code --function-name RoboMayEventHandler --zip-file fileb://RoboMay.zip --region us-east-1
