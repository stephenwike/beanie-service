#!/usr/bin/env pwsh

Write-Host "Deploying WebApi Locally"

Push-Location ./src/beanie-webapi/Beanie.WebApi
    dotnet publish -o ../publish/Beanie.WebApi
Pop-Location

Push-Location ./src/beanie-webapi/publish/Beanie.WebApi
   Start-Process dotnet Beanie.WebApi.dll
Pop-Location