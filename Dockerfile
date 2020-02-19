FROM node:12

ENV npm_config_cache /usr/npmcache
WORKDIR /usr/src/flit

# copy package definitions for install
COPY package*.json ./
COPY flit-client/package*.json flit-client/
COPY flit-server/package*.json flit-server/

RUN npm install
RUN npm install flit-client
RUN npm install flit-server

# copy the source after dependencies are installed
COPY . .
