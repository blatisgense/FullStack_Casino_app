// system
import {
	Controller,
	Get,
	Post,
	Req,
	Res
} from "@nestjs/common";
import { APIS } from "../config/API";
import { Request, Response } from "express";
//services
import { spin_wheel } from "../services/client/spin_wheel";
import { promocode_check } from "../services/client/promocode_check";

@Controller()
export class Client_Controller {
	@Get(APIS.spin)
	async Spin_wheel(@Req() req: Request, @Res() res: Response) {
		await spin_wheel(req, res);
	}
	@Post(APIS.verify_promo)
	async Promocode_check(@Req() req: Request, @Res() res: Response) {
		await promocode_check(req, res);
	}
}
