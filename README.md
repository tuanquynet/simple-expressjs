

## Prerequisite
To be able exec the commands in this demo, you need to install the following tools
- docker 17+
- aws cli

## Install app dependency
- `yarn`

## Config build environment
- Open gulpfile.js
- Change appName, ecrRepoId to correct value accordingly

## Build docker file for <app-name>-<env>
- `yarn build-app-image`

## Test app locally in docker container
- Login to aws ecr: `yarn aws-get-login`
- Run command returned by command above
- `yarn run-app-in-container`
- Open browser with "http://localhost:8080"

## Push image onto aws ecr
- `yarn push-app-image`

## General steps:
- Build docker image: `docker build -t <app-name>-<env> .`
- Run docker container: `docker run --name <app-name>-<env> -p 8080:8080 -e "APP_NAME=<app-name>-<env>" -e "SERVER_PORT=8080" -d <app-name>-<env>`
- Enter container: `docker exec -it <container id> /bin/bash`
- Logs container: `docker logs <container id>`
- Retrieve the docker login command: `aws ecr get-login --no-include-email --region ap-southeast-1`
- Run the docker login command was returned in the previous step
- Tag your image so you can push the image to this repository: `docker tag <app-name>-<env>:<version> <erc-repo-id>.dkr.ecr.ap-southeast-1.amazonaws.com/<app-name>-<env>:<version>`
- Push image onto aws ecs registry: `docker push <erc-repo-id>.dkr.ecr.ap-southeast-1.amazonaws.com/<app-name>-<env>:<version>`