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
- ESLint
- Jest

## Quick start
- Install Global Depedencies: `yarn add global gulp-cli pg sequelize sequelize-cli typescript`
- Clone git repo: `git clone https://github.com/Mucilon/node-ts-api-boilerplate.git cool-name-api`
- Enter folder: `cd cool-name-api`
- Clear git history: `rm -r .git`
- Install Depedencies: `yarn`
- Generate dist files: `gulp`
- Start Server: `npm start`
- Tests: `yarn test`
- Develop: `yarn dev`

## Architecture
```
├── .vscode
│   └── launch.json
├── __tests__
│   ├── integration
│   │   ├── auth.test.ts
│   │   └── user.test.ts
│   └── unit
│       └── user.test.ts
├── src
│   ├── api
│   │   ├── api.ts
│   │   ├── resposeHandlers.ts
│   │   └── routes.ts
│   ├── config
│   │   └── database.ts
│   ├── database
│   │   ├── migrations
│   │   │   └── 20190521212458-create-user.js
│   │   └── seeders
│   ├── models
│   │   ├── index.ts
│   │   └── user.ts
│   ├── modules
│   │   ├── auth
│   │   │   └── auth.ts
│   │   └── user
│   │       ├── controller.ts
│   │       ├── interface.ts
│   │       └── service.ts
│   ├── auth.ts
│   └── server.ts
├── .env
├── .env.test
├── .eslintrc.js
├── .gitignore
├── .gitlab-ci.yml
├── .sequelizerc
├── gulpfile.js
├── jest.config.js
├── nodemon.json
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock
```
