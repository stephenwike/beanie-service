#!/usr/bin/env pwsh

helm uninstall $env:HELM_CHART_NAME

helm install $env:HELM_CHART_NAME ./chart/ `
    --set persistence.password=$env:POSTGRES_PASSWORD