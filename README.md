# Contributing to Splunk-Data-Dictionary

## Folder Structure
backend folder contains the backend code with serverless node.js configuration
frontend-code folder contains frontend react code . 

## Overview of frontend-code

The project contains a variety of packages that are published and versioned collectively. Each package lives in its own 
directory in the `/packages` directory. Each package is self contained, and defines its dependencies in a package.json file.

We use [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) and [Lerna](https://github.com/lerna/lerna) for
managing and publishing multiple packages in the same repository.


## Getting Started

### To run frontend code

1. Clone the repo.
2. cd frontend-code -> Install yarn (>= 1.2) if you haven't already: `npm install --global yarn`.
3. Run the setup task: `yarn run setup`.
4. cd packages/frontend -> yarn run start:demo To start the application

After this step, the following tasks will be available:

* `start` – Run the `start` task for each project
* `build` – Create a production bundle for all projects
* `test` – Run unit tests for each project
* `lint` – Run JS and CSS linters for each project
* `format` – Run prettier to auto-format `*.js`, `*.jsx` and `*.css` files. This command will overwrite files without 
asking, `format:verify` won't.

Running `yarn run setup` once is required to enable all other tasks. The command might take a few minutes to finish.

### To run backend code

1. cd backend -> npm  install
2. cd aws-node-http-api-project
3. Run command node index.js


