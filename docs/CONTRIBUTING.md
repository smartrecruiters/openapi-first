# How to contribute

So nice to have you here! 

If you have an idea how to improve this module, please do not hesitate to open and issue so we can together find the
best solution. Please raise an issue also when you get in any trouble while using or developing this module.

If you already know how to enhance this module, pull requests are more then welcome!

## Getting started

You can use [nvm](https://github.com/creationix/nvm) to set appropriate node version (`$ nvm install`).
If you have node installed, `$ npm install` and you are ready to go.

## Submitting changes

Before submitting pull request, you can `$ npm run preversion`. It will:

 * audit package.json dependencies (we use [nsp](https://nodesecurity.io/)),
 * lint the code (we use [eslint](https://eslint.org/) and [@smartrecruiters/eslint-config](https://www.npmjs.com/package/@smartrecruiters/eslint-config) and [eslint-plugin-security](https://github.com/nodesecurity/eslint-plugin-security)),
 * test the code and check coverage (we use [mocha](https://mochajs.org/), [chai](http://www.chaijs.com/api/bdd/), [sinon](http://sinonjs.org/) and [istanbul](https://istanbul.js.org/)),
 * regenerate README.md (we use [jsdoc-to-markdown](https://www.npmjs.com/package/jsdoc-to-markdown)).

## Fixing README.md

Project's readme is generated using [docs/README.hbs](docs/README.hbs), so please modify this file.
