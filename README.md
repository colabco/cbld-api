# cbld-api

# prerequisites

- please use nvm to manage your node installations: [nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
- pnpm is the package manager for this project: [pnpm](https://pnpm.io/installation)

# Setup

After cloning this repository:

- `nvm use` to switch to the correct node version
- `pnpm install` to install the project dependencies
- `pnpm dev` to start the server in development mode

# Other tasks

- run `pnpm routes` to see the list of routes available
- run `pnpm test` to run tests and see coverage report
- run `pnpm build` to build the project for production
- run `pnpm start` to start the server in production mode

# Setting up the service with Heroku

- Create an heroku account, visit - [Heroku Sign up](https://signup.heroku.com/) 
- Intall the heroku CLI, use the link based on your operating system. [Install Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). 
- Once the the above steps has been completed, use the `heroku login` command to log into heroku vai the CLI.
-  run the command to start the service locally via heroku `heroku local web --port 3000`
-  Navigate to the `localhost:3000/v0/projects` route
- To easily test the API use swagger UI via the route `localhost:3000/docs`

Note that the steps above should be done after you have checked into the right branch. 
# Development Cycle

- create a local branch for the ticket you are working on. **All tasks must have a corresponding ticket.**:
  - e.g. `git checkout -b feature/23-add-login-route` (for a ticket with id 23). If it's a bug, do something like `git checkout bug/23-fix-login-route` instead.
- If working on new/changed routes, ensure the corresponding tests are added updated in `/tests`. (See the [Test Cycle](#test-cycle) section below for more details)
- run tests to make sure tests are passing: `pnmp test`.
- commit your changes locally, e.g.:
- `git add .`
- `git commit -m "I added the new login route"`
- create a PR:
- `git push origin feature/23-add-login-route`
- click on the link offered by git cli to open a new PR in your browser (Or, login to github, find the branch you just pushed, and create a new PR for it).
- once the PR is merged, you can delete the branch you created.

# Test Cycle

- The test coverage tool is **[c8](https://github.com/bcoe/c8)**.
- Test execution can use **[node:test](https://nodejs.org/api/test.html#test-runner)** and **[node:assert](https://nodejs.org/api/assert/assert)** as the assertion library.
- `test/helper.ts` creates a test configuration which is passed to an app instance (bootstrapped with @fastify-cli/helper) which is then handed to a test suite.

# Fastify CLI

Note that this repo contains [fastify-cli](https://github.com/fastify/fastify-cli), which is a CLI for fastify. It is installed when you run `pnpm install`.
You can feed it a fastify plugin file **_and it will run the server for you._**.
The majority of commands in `package.json` are therefore fastify-cli commands that are simply fed the api app in `src/app.ts`.
The **actual** server is in the `src/server.ts` file. This is what will run the api app when fastify-cli isn't around to run it.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).
