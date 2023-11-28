import { Pool } from "pg";
import { db_config } from "../config/types";
import "dotenv/config";

//should be in .env file;
let localPoolConfig: db_config = {
	password: process.env.PG_PASS,
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	database: process.env.PG_DB,
};

const poolConfig: object = process.env.DB_CONNECTION_STRING
	? {
			connectionString: process.env.DB_CONNECTION_STRING,
			ssl: { rejectUnauthorized: false },
	  }
	: localPoolConfig;

export const pool = new Pool(poolConfig);
