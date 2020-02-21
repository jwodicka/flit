FROM node:12

ENV npm_config_cache /usr/npmcache
WORKDIR /usr/src/flit

# copy package definitions for install
# COPY package*.json ./
COPY flit-client/package*.json flit-client/
COPY flit-server/package*.json flit-server/

WORKDIR /usr/src/flit/flit-client
RUN npm install
WORKDIR /usr/src/flit/flit-server
RUN npm install


# copy the source after dependencies are installed
WORKDIR /usr/src/flit
COPY . .

# Run the build scripts
WORKDIR /usr/src/flit/flit-client
RUN npm run build
WORKDIR /usr/src/flit/flit-server
RUN npm run build
