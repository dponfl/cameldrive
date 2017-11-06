#!/bin/bash

echo "Deploy bash script..."
pwd
cd node_modules/webstudiopro-sails-auth/
npm i
cd ..
bower i
rm -rf ./assets/vendor/angular-animate/
bower i --save-dev angular-animate@1.6.4