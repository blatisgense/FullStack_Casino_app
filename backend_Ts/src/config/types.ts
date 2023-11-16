import { Request } from "express";

export interface User {
	user_name: string;
	user_email: string;
	user_role: string;
	user_wheel: number;
	user_money: number;
	user_meditation: string[];
	user_list: string[];
}

export interface db_config {
	host: string;
	port: string;
	database: string;
	user: string;
	password: string;
}

export interface Request_user extends Request {
	user: User;
}
