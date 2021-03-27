#!/usr/bin/env pwsh

Push-Location ./src/beanie-ui
   docker build -t "$env:DOCKER_REPO/${env:UI_DOCKER_IMAGE}:$env:VERSION" -t "$env:DOCKER_REPO/${env:UI_DOCKER_IMAGE}:latest" .
Pop-Location