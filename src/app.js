import express from 'express';
import mysql from 'mysql';
import * as api from './routes'

/** Mysql database connection **/
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || '0.0.0.0',
    port: process.env.MYSQL_PORT || '3307',
    user: process.env.MYSQL_USER || 'mcadmin',
    password: process.env.MYSQL_PW || 'MCPW1234',
    database: process.env.MYSQL_DB_NAME || 'task',
})

connection.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected!');
});
const app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true}));

app.use('/task', [api.apiRoutes]);

const API_PORT = process.env.API_PORT || 3000;
app.listen(API_PORT, "0.0.0.0", () => {
    console.log(`App listening on port ${API_PORT}!`);
});

export {connection}

