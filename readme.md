```
cd wiremock
./start.sh local 8080
./start.sh local 8081
./start.sh local 8082
cd ../e2e
npm install
npm run test
```