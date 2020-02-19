== Getting started with Flit

This is a quick-and-dirty monorepo for development purposes, containing two separate repos.

`flit-client` contains the frontend client, which was bootstrapped with `create-react-app` using the
TypeScript template. The command used was `npx create-react-app flit-client --template typescript`.

`flit-server` contains the backend service, which was bootstrapped from the [Microsoft *TypeScript
Node Starter* repo](https://github.com/microsoft/TypeScript-Node-Starter). The command used was 
`git clone --depth=1 https://github.com/Microsoft/TypeScript-Node-Starter.git flit-server`. After
cloning the template repo, `npm install` was run, followed by `npm audit fix` to correct a set of
security vulnerabilities.

The git repos created by both these bootstrap steps were then destroyed by calling `rm -rf .git`
within the `flit-client` and `flit-server` directories, a new git repo was set up in the root
directory with `git init`, and the initial state of both directories was committed to it.
