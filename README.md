# APEIRO Connector
This Codebase is a HTTP service that basically connects to APEIRO database and exposes the data to clients.

## Deploying on AWS:
- Remember to set the environment variables for DB_DATABASE, DB_HOST, DB_PASS, DB_USER, 
NODE_ENV.

## To run locally:
```
nvm use
npm i
npm start
```

### To Deploy on Elastic Beanstalk

Login to AWS CLI:
```
aws configure
```

Git commit the code to master branch and push.

Deploy:
```
eb deploy
```
