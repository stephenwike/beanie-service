#!/usr/bin/env pwsh

#Get Environment Variables
. ./ci/develop/environment-variables.ps1

#Build Components
. ./ci/build-webapi.ps1
. ./ci/build-ui.ps1

#Deploy Components
. ./ci/develop/deploy-webapi.ps1
. ./ci/develop/docker-compose.ps1
. ./ci/develop/reset-db.ps1

#Publish Components
#. ./ci/publish-webapi.ps1
#. ./ci/publish-ui.ps1