#!/usr/bin/env pwsh

docker build -t stephenwike/beanie-kiosk:latest ./web/beanie-kiosk/
docker push stephenwike/beanie-kiosk:latest
