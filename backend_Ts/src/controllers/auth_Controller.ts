// system
import { Controller, Post, Req, Res, Delete } from "@nestjs/common";
import { Request, Response } from "express";
import { APIS } from "../config/API";
// services
import { login } from "../services/auth/login";
import { registration } from "../services/auth/registration";
import { logout } from "../services/auth/logout";

@Controller()
export class Auth_Controller {
	@Post(APIS.auth.login.url)
	async Login(@Req() req: Request, @Res() res: Response) {
		await login(req, res);
	}

	@Post(APIS.auth.register.url)
	async Registration(@Req() req: Request, @Res() res: Response) {
		await registration(req, res);
	}

	@Delete(APIS.auth.logout.url)
	async Close_session(@Req() req: Request, @Res() res: Response) {
		await logout(req, res);
	}
}
