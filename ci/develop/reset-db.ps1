#!/usr/bin/env pwsh

#Instructions:
#Run from the root folder

$network="develop_default"
$databaseType="PostgreSQL"
$server="postgres"
$port="5432"
$database="beanie"
$username="user"
$password="pass"

Push-Location ./db
    docker build -t migration .
Pop-Location

docker run --network=$network migration --type=$databaseType --action=DropDb --server=$server --port=$port --database=$database --username=$username --password=$password
docker run --network=$network migration --type=$databaseType --action=CreateDb --server=$server --port=$port --database=$database --username=$username --password=$password
docker run --network=$network migration --type=$databaseType --action=MigrateDb --server=$server --port=$port --database=$database --username=$username --password=$password
