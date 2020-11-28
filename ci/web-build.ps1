#!/usr/bin/env pwsh

docker build -t stephenwike/beanie-kiosk:latest ./src/beanie-kiosk/
docker push stephenwike/beanie-kiosk:latest
