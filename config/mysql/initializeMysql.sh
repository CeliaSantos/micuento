#!/bin/bash

BASEDIR=$(dirname "$0")
cd "${BASEDIR}"

echo "Setting up the MySQL schema"
docker exec -i $(docker-compose ps -q mysql-db) mysql -uroot -pMCPW1234 < createDatabaseDDL.sql
echo "Creating MiCuentoAdmin user"
docker exec -i $(docker-compose ps -q mysql-db) mysql -uroot -pMCPW1234 task < createMiCuentoAdmin.sql
echo "MySQL initialization completed"