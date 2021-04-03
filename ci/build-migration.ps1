#!/usr/bin/env pwsh

Push-Location -Path "./db"
   docker build -t "$env:DOCKER_REPO/${env:MIGRATION_DOCKER_IMAGE}:$env:VERSION" -t "$env:DOCKER_REPO/${env:MIGRATION_DOCKER_IMAGE}:latest" .
Pop-Location
