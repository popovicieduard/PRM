# PRM - Partner relationship management Platform

## Build Setup

``` bash
# install adonis cli
$ npm i --global @adonisjs/cli

# install dependencies
$ npm run install

# make a copy of .env.example to .env and setup your mysql username and password in .env
$ cp .env.example .env

# generate adonis key with command
$ adonis key:generate

# run the migration and seed
$ adonis migration:run --seed

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
