// system
import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { APIS } from "../config/API";
import { Response } from "express";
import { Request_user } from "../config/types";

//services
import { spin } from "../services/client/wheel/spin";
import { verify } from "../services/client/promocode/verify";
import { get } from "../services/client/data/get";
import { send } from "../services/client/feedback/send";

@Controller()
export class Client_Controller {
	@Get(APIS.client.wheel.spin.url)
	async Spin_wheel(@Req() req: Request_user, @Res() res: Response) {
		await spin(req, res);
	}
	@Get(APIS.client.data.get.url)
	async Get_data(@Req() req: Request_user, @Res() res: Response) {
		await get(req, res);
	}
	@Post(APIS.client.promocode.verify.url)
	async Promocode_check(@Req() req: Request_user, @Res() res: Response) {
		await verify(req, res);
	}
	@Post(APIS.client.feedback.send.url)
	async Feedback_send(@Req() req: Request_user, @Res() res: Response) {
		await send(req, res);
	}
}
