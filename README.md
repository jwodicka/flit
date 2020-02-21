== Getting started with Flit

This is a quick-and-dirty monorepo for development purposes, containing two separate repos.

* `flit-client` contains the frontend client.
* `flit-server` contains the backend service.

== Running

To run the client, from a command prompt in the `flit-client` folder, run:
```
 npm install
 npm run build
 npm start
```

To run the server, from a command prompt in the `flit-server` folder, run:
```
 npm install
 npm run build
 npm start
```

By default the client starts a service on port 3000, and the server on
port 4000.

=== Docker

To run in docker, from the `flit` project directory, run:

`docker compose up -d`

This will build an image with node depenencies and start a container
named `flit_dev_1`.

To start the client and server, connect to the container by running:

`docker exec -ti dev_flit_1 bash`

then, within the container, start the client with:
```
cd /usr/src/flit/flit-client
npm start
```

or the server with:
```
cd /usr/src/flit/flit-server
npm start
```

=== History
`flit-client` was bootstrapped with `create-react-app` using the TypeScript template. The command used was `npx create-react-app flit-client --template typescript`.

`flit-server` contains the backend service, which was bootstrapped from the [Microsoft *TypeScript
Node Starter* repo](https://github.com/microsoft/TypeScript-Node-Starter). The command used was 
`git clone --depth=1 https://github.com/Microsoft/TypeScript-Node-Starter.git flit-server`. After
cloning the template repo, `npm install` was run, followed by `npm audit fix` to correct a set of
security vulnerabilities.

The git repos created by both these bootstrap steps were then destroyed by calling `rm -rf .git`
within the `flit-client` and `flit-server` directories, a new git repo was set up in the root
directory with `git init`, and the initial state of both directories was committed to it.

