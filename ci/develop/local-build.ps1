#!/usr/bin/env pwsh

#Get Environment Variables
. ./ci/develop/environment-variables.ps1

#Build Components
. ./ci/build-webapi.ps1

#Publish Components
. ./ci/publish-webapi.ps1