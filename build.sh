#!/bin/bash

set -exuo pipefail

cd ./flit-client
npm install
npm run build
cd ../flit-server
npm install
npm run build

