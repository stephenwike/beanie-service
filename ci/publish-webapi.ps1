#!/usr/bin/env pwsh

docker push "$env:DOCKER_REPO/${env:WEBAPI_DOCKER_IMAGE}:$env:VERSION"
docker push "$env:DOCKER_REPO/${env:WEBAPI_DOCKER_IMAGE}:latest"