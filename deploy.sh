#!/bin/bash

echo "Deploy bash script..."
pwd
cd node_modules/webstudiopro-sails-auth/
npm i
cd ..
bower i
delete angular-animate folder
bower i --save-dev angular-animate@1.6.4