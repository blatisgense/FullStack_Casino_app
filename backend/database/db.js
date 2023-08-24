import pg from "pg";
const {Pool} = pg;


let localPoolConfig = {
    password: "MegaEmmaPass",
    user: "postgres",
    host: "localhost",
    port: "5432",
    database: "megaemma"
}

const poolConfig = process.env.DB_CONNECTION_STRING ? {connectionString: process.env.DB_CONNECTION_STRING, ssl: {rejectUnauthorized: false}} : localPoolConfig;

const pool = new Pool(poolConfig);

export default pool;
