## Disclaimer

Hey there! Just wanted to let you know that I'm not really a JS developer, so I'm not exactly an expert when it comes to Express either. So if you do decide to use it, please keep that in mind and use at your own risk!

## Description

This is a simple API written in Express, which runs by default on port 3000
It also contains SlackBot that runs on 3001 but currently is configured to use socket connection. By doing this, 
I don't need to expose it on the domain for now. It will change in the future. 

## Installation

- in order to configure SlackBot Applicaiton in Slack - read "materials used" - Build a slackbot in node with slacks bolt API
- `npm i`
- `npx sequelize-cli db:migrate`
- `npx sequelize-cli seed:generate --name system-message`
- `docker-compose up -d`

or without docker:

- `npm i`
- `nodemon index.js`

## Run without docker

- 'npm install'
- 'npm start'

## Materials used

- [Build a slackbot in node with slacks bolt API](https://blog.logrocket.com/build-a-slackbot-in-node-js-with-slacks-bolt-api/)

