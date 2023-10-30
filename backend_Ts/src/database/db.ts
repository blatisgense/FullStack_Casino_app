import { Pool } from "pg";

interface config {
	host: string;
	port: string;
	database: string;
	user: string;
	password: string;
}

//should be in .env file;
let localPoolConfig: config = {
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
