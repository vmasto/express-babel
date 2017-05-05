# Express.js with Babel Boilerplate

[![Code Climate](https://codeclimate.com/github/vmasto/express-babel/badges/gpa.svg)](https://codeclimate.com/github/vmasto/express-babel)
[![Dependencies Status](https://david-dm.org/vmasto/express-babel/status.svg)](https://david-dm.org/vmasto/express-babel)
[![Dev Dependencies Status](https://david-dm.org/vmasto/express-babel/dev-status.svg)](https://david-dm.org/vmasto/express-babel)
[![NSP Status](https://nodesecurity.io/orgs/vmasto/projects/d8089487-4f0e-4f69-abb1-938c6de1e6a7/badge)](https://nodesecurity.io/orgs/vmasto/projects/d8089487-4f0e-4f69-abb1-938c6de1e6a7)

A mostly unopinionated starter project for using Babel and ES2017+ features in a Node.js server environment as well as providing linting and testing solutions. It provides the setup for compiling, linting and testing your code but doesn't make any further assumptions on how your project should be structured.

It's a small improvement over [Babel's official approach](https://github.com/babel/example-node-server) and [express-generator](https://expressjs.com/en/starter/generator.html).

Make sure you read the FAQ for more details and info.

### Features:
- [Express.js](https://expressjs.com/) as the web framework.
- ES2017+ support with [Babel](https://babeljs.io/).
- Automatic polyfill requires based on environment with [babel-preset-env](https://github.com/babel/babel-preset-env).
- Linting with [ESLint](http://eslint.org/).
- Testing with [Jest](https://facebook.github.io/jest/).
- [Quick deployment guide](DEPLOYMENT.md) for Heroku, AWS Elastic Beanstalk, and App Engine.

## Getting started

```sh
# Clone the project
git clone git@github.com:vmasto/express-babel.git
cd express-babel

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm install

# or if you're using Yarn
yarn
```

_If you don't use [Yarn](https://yarnpkg.com/) you can just replace `yarn` with `npm` in the commands that follow._

Then you can begin development:

```sh
yarn run dev
```

This will launch a [nodemon](https://nodemon.io/) process for automatic server restarts when your code changes.

### Testing

Testing is powered by [Jest](https://facebook.github.io/jest/). This project also uses [supertest](https://github.com/visionmedia/supertest) for demonstrating a simple routing smoke test suite. Feel free to remove supertest entirely if you don't wish to use it.

Start the test runner in watch mode with:

```sh
yarn test
```

You can also generate coverage with:

```sh
yarn test -- --coverage
```

(the extra double hyphen `--` is necessary).

### Linting

Linting is set up using [ESLint](http://eslint.org/). It uses ESLint's default [eslint:recommended](https://github.com/eslint/eslint/blob/master/conf/eslint.json) rules. Feel free to use your own rules and/or extend another popular linting config (e.g. [airbnb's](https://www.npmjs.com/package/eslint-config-airbnb) or [standard](https://github.com/feross/eslint-config-standard)).

Begin linting in watch mode with:

```sh
yarn run lint
```

### Environmental variables in development

The project uses [dotenv](https://www.npmjs.com/package/dotenv) for setting environmental variables during development. Simply copy `.env.example`, rename it to `.env` and add your env vars as you see fit. 

It is **strongly** recommended **never** to check in your .env file to version control. It should only include environment-specific values such as database passwords or API keys used in development. Your production env variables should be different and be set differently depending on your hosting solution. `dotenv` is only for development.

### Deployment

Deployment is specific to hosting platform/provider but generally:

```sh
yarn run build
```

will compile your src into `/dist`, and 

```sh
yarn start
```

will run `build` (via the `prestart` hook) and start the compiled application from the `/dist` folder.

The last command is generally what most hosting providers use to start your application when deployed, so it should take care of everything.

You can find small guides for Heroku, App Engine and AWS in [the deployment](DEPLOYMENT.md) document.

## FAQ

**Where is all the configuration for ESLint, Jest and Babel?**

In `package.json`. Feel free to extract them in separate respective config files if you like.

**Why are you using `babel-register` instead of `babel-node`?**

`babel-node` contains a small "trap", it loads Babel's [polyfill](https://babeljs.io/docs/usage/polyfill/) by default. This means that if you use something that needs to be polyfilled, it'll work just fine in development (because `babel-node` polyfills it automatically) but it'll break in production because it needs to be explicitely included in Babel's CLI which handles the final build.

In order to avoid such confusions, `babel-register` is a more sensible approach in keeping the development and production runtimes equal. By using [babel-preset-env](https://github.com/babel/babel-preset-env) only code that's not supported by the running environment is transpiled and any polyfills required are automatically inserted.

**Should I use this?**

Full disclosure: If you have to ask perhaps you should reconsider. There is some debate on whether to use Babel-transpiled code on the server or not. Personally, I think it's fine and I've found this setup to be a sensible approach in doing so. That said, I'd suggest to take anything you read online with a grain of salt and refrain from blindly using boilerplates without first investigating personally.

Node is very rapidly converging with the latest ECMAScript specification, and there's mostly full native support for ES2015 and ES2016. The need to transpile on the server is way smaller nowadays, albeit the language is constantly improving and transpiling will probably always be a part of our workflow. At the time of this writing the main benefits are mainly ES6 module syntax and async/await without flags.

In any case, you can simply remove transpilation and keep everything else that this kit has to offer.

If you see anything that needs improvement feel free to open an issue for discussion!

You can also find me on twitter at [@vmasto](https://twitter.com/vmasto).

## License
MIT License. See the [LICENSE](LICENSE) file.
