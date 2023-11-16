// system
import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { APIS } from "../config/API";
import { Response } from "express";
//services
import { spin_wheel } from "../services/client/spin_wheel";
import { promocode_check } from "../services/client/promocode_check";
import { Request_user } from "../config/types";

@Controller()
export class Client_Controller {
	@Get(APIS.spin)
	async Spin_wheel(@Req() req: Request_user, @Res() res: Response) {
		await spin_wheel(req, res);
	}
	@Post(APIS.verify_promo)
	async Promocode_check(@Req() req: Request_user, @Res() res: Response) {
		await promocode_check(req, res);
	}
}
