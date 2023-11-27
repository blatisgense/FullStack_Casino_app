import { Pool } from "pg";
import { db_config } from "../config/types";

//should be in .env file;
let localPoolConfig: db_config = {
	password: "MegaEmmaPass",
	user: "postgres",
	host: "localhost",
	port: "5432",
	database: "megaemma",
};

const poolConfig: object = process.env.DB_CONNECTION_STRING
	? {
			connectionString: process.env.DB_CONNECTION_STRING,
			ssl: { rejectUnauthorized: false },
	  }
	: localPoolConfig;

export const pool = new Pool(poolConfig);
