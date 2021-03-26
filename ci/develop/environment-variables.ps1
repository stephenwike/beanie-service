#!/usr/bin/env pwsh

function Set-BuildEnvironmentVariable
{
    param(
        [Parameter(Mandatory=$true)]
        [string]
        $name,
        [Parameter(Mandatory=$true)]
        [string[]]
        $value
    )
    if ($null -ne $env:GITHUB_PATH)
    {
        Write-Output "$name=$value" | Out-File -FilePath $env:GITHUB_ENV -Encoding utf8 -Append
    }
    Set-Item "env:$name" $value
    Write-Output "$name=$value"
}

Set-BuildEnvironmentVariable VERSION "0.0.1"
Set-BuildEnvironmentVariable BUILD_CONFIGURATION "Release"
Set-BuildEnvironmentVariable DOCKER_REPO "stephenwike"
Set-BuildEnvironmentVariable SERVICE_DOCKER_IMAGE "beanie-service"

