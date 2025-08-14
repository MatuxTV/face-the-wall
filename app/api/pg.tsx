import {Pool} from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,//name of database
  password: process.env.DB_PASSWORD,//password for PostgreSQL
  port: process.env.DB_PORT,//port for PostgreSQL
});

export default pool;