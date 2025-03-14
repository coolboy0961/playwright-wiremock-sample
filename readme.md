```
cd wiremock
./start.sh local1 8080
./start.sh local2 8081
./start.sh local3 8082
cd ../e2e
npm install
npm run test
```