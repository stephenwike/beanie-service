$dockerRepoName="stephenwike"
$dbMigration="beanie-migration"
$version="1.0.0"

Push-Location -Path "./db"
    docker build -t "${dockerRepoName}/${dbMigration}:${version}" -t "${dockerRepoName}/${dbMigration}:latest" -t database-reset .
    docker push "${dockerRepoName}/${dbMigration}:${version}" 
    docker push "${dockerRepoName}/${dbMigration}:latest"
Pop-Location

Push-Location -Path "./devtools"
    docker-compose up -d
Pop-Location

$network="devtools_default"
$databaseType="PostgreSQL"
$server="postgres"
$port="5432"
$database="beanie"
$username="user"
$password="pass"

docker run --network=$network database-reset --type=$databaseType --action=DropDb --server=$server --port=$port --database=$database --username=$username --password=$password
docker run --network=$network database-reset --type=$databaseType --action=CreateDb --server=$server --port=$port --database=$database --username=$username --password=$password
docker run --network=$network database-reset --type=$databaseType --action=MigrateDb --server=$server --port=$port --database=$database --username=$username --password=$password
