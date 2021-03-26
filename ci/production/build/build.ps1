#!/usr/bin/env pwsh

. ./Push-Location ./src/Bct.FleetInventory.Processor
dotnet publish -c $build_configuration -f netcoreapp3.1  -r linux-x64 -o out
docker build -t "$dockerRepoName/${processorName}:$version" -t "$dockerRepoName/${processorName}:latest" .
Pop-Location