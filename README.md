# Build docker file for demo-simpleapp

## Create Dockerfile


## Build docker image
- `docker build -t demo-simpleapp .`

## Run docker container
- `docker run --name demo-simpleapp -p 8080:8080 -e "APP_NAME=demo-simpleapp" -e "SERVER_PORT=8080" -d demo-simpleapp`

## Enter container
- `docker exec -it <container id> /bin/bash`

## Logs container
- `docker logs <container id>`

## Retrieve the docker login command
- `aws ecr get-login --no-include-email --region ap-southeast-1`

## Run the docker login command was returned in the previous step

## tag your image so you can push the image to this repository
- `docker tag demo-simpleapp:latest 255179364299.dkr.ecr.ap-southeast-1.amazonaws.com/demo-simpleapp:1.0.0`

## Push image onto aws ecs registry
- `docker push 255179364299.dkr.ecr.ap-southeast-1.amazonaws.com/demo-simpleapp:1.0.0`