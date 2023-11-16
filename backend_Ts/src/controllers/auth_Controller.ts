// system
import { Controller, Get, Post, Req, Res, Delete } from "@nestjs/common";
import { Request, Response } from "express";
import { APIS } from "../config/API";
// services
import { login } from "../services/auth/login";
import { registration } from "../services/auth/registration";
import { refresh_token } from "../services/auth/refresh_token";
import { close_session } from "../services/auth/logout";
import { get_data } from "../services/auth/get_data";
import { Request_user } from "../config/types";

@Controller()
export class Auth_Controller {
	@Post(APIS.login)
	async Login(@Req() req: Request, @Res() res: Response) {
		await login(req, res);
	}

	@Post(APIS.register)
	async Registration(@Req() req: Request, @Res() res: Response) {
		await registration(req, res);
	}

	@Get(APIS.refresh_token)
	async Refresh_token(@Req() req: Request, @Res() res: Response) {
		await refresh_token(req, res);
	}

	@Delete(APIS.delete_token)
	async Close_session(@Req() req: Request, @Res() res: Response) {
		await close_session(req, res);
	}

	@Get(APIS.get_data)
	async Get_data(@Req() req: Request_user, @Res() res: Response) {
		await get_data(req, res);
	}
}
