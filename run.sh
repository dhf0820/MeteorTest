#!/bin/bash

echo "Creating docker volume for node_modules"

docker volume create node_modules

echo "build the docker image"

docker build -t meteor_test .

echo "Running container.."

docker run -p 3000:3000 -v `pwd`:/app/ -v node_modules:/app/node_modules  meteor_test
