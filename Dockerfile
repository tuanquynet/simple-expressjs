# Specify based image
FROM node:8-alpine
#FROM alpine

# Set one or more individual labels
LABEL plus.goalify.rnd.simpleapp.version="0.1.1"
LABEL vendor="Goalify"
LABEL simpleapp.release-date="2017-09-12"
LABEL simpleapp.is-production="false"

# Install OS dependencies
#RUN apk add git

# Install app dependencies
COPY package.json /app/package.json
RUN cd /app; npm install
RUN touch /app/.env

# Bundle app source
COPY src /app/

WORKDIR /app

EXPOSE  8080
CMD ["node", "index.js"]