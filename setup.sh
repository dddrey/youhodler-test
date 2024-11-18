#! /bin/bash

cp .env.example .env
echo "Copying .env.example to .env"

source .env

echo "Building docker image ..."

docker build \
  --build-arg PORT=$PORT \
  --build-arg UPDATE_FREQUENCY_MS=$UPDATE_FREQUENCY_MS \
  --build-arg SERVICE_COMMISSION=$SERVICE_COMMISSION \
  -t youhodler-test .

echo "Docker image built"
echo "You can modify .env values if you need to"
echo "Now you can run the docker container with:"
echo "./run.sh"
