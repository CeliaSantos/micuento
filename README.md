# README #

Necessary steps to run the app. 

### MySQL initialization

* To initialize MySQL database schema, you first have to have Docker and docker-compose pre-installed in your computer.
Place yourself in the sources root directory ('~/micuento/') and follow the instructions below.
1. Create the docker network:
`docker network create micuento-network`
2. Start a mysql docker container:
`docker-compose up -d mysql-db`
3. Initialize database: 
`cd config/mysql/`
`./initializeMysql.sh`

Now your mysql database is ready! 

### Run task manager app

* Place yourself in the sources root directory and write: 
`npm install`
`npm start`

Now, you can start trying your postman requests! :)
