#!/usr/bin/env pwsh

$dockerRepoName = "stephenwike"
$dockerImage = "beanie-service"
$version = "1.0.0"

Push-Location ./src/BeanieService
    dotnet publish -c $build_configuration -f netcoreapp3.1  -r linux-x64 -o out
    docker build -t "$dockerRepoName/${dockerImage}:$version" -t "$dockerRepoName/${processorName}:latest" .
Pop-Location