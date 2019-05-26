# Boilerplate Node-TypeScript Rest API.
Uses nodejs, typescript, sequelize and postgreSql, to create rest Api.

![Build Status](https://gitlab.com/Mucilon/ts-api/badges/master/build.svg)

## Features
- Node.js
- TypeScript
- Sequelize
- PostgreSql
- Passport
- Gitlab-CI
- Gulp
- Tslint
- Mocha Unit and Integration Test
- Nyc Code Coverage

## Quick start
- Install Global Depedencies: `npm i gulp-cli pg sequelize sequelize-cli tslint typescript -g`
- Clone git repo: `git clone https://github.com/Mucilon/node-ts-api-boilerplate.git cool-name-api`
- Enter folder: `cd cool-name-api`
- Clear git history: `rm -r .git`
- Install Depedencies: `npm install`
- Set enviroment values: `npm Start/server/config/env/`
- Generate dist files: `gulp`
- Start Server: `npm start`
- Unit Test: `npm run unit-local-test`
- Integration Test: `integration-local-test`
- Unit Coverage: `unit-coverage`
- Integration Coverage: `integration-coverage`

## Architecture
```
Server
├── api
│   ├── api.ts
│   ├── resposeHandlers.ts
│   └── routes.ts
├── config
│   ├── config.json
│   ├── env
│   │   ├── config.ts
│   │   ├── debbuger.env.ts
│   │   ├── development.env.ts
│   │   ├── test.env.ts
│   │   └── testlocal.env.ts
│   └── test
│       ├── helpers.ts
│       └── mocha.opts
├── migrations
│   └── 20190521212458-create-user.js
├── models
│   ├── index.ts
│   └── user.ts
├── modules
│   ├── auth
│   │   ├── auth.ts
│   │   └── integration.test.ts
│   └── user
│       ├── controller.ts
│       ├── integration.test.ts
│       ├── interface.ts
│       ├── routes.ts
│       ├── service.ts
│       └── unit.test.ts
├── auth.ts
└── server.ts
```
