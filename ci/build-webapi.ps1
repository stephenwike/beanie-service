#!/usr/bin/env pwsh

Push-Location ./src/beanie-webapi
   dotnet publish -c $env:BUILD_CONFIGURATION -f netcoreapp3.1  -r linux-x64 -o out
   docker build -t "$env:DOCKER_REPO/${env:SERVICE_DOCKER_IMAGE}:$env:VERSION" -t "$env:DOCKER_REPO/${env:SERVICE_DOCKER_IMAGE}:latest" .
Pop-Location