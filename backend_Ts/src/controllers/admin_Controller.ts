// system
import { Controller, Post, Req, Res } from "@nestjs/common";
import { APIS } from "../config/API";
import { Request, Response } from "express";
// services
import { edit_promocode } from "../services/admin/edit_promocode";
import { change_user_data } from "../services/admin/change_user_data";
import { change_user_products } from "../services/admin/change_user_products";
import { get_users } from "../services/admin/get_users";
import { edit_products } from "../services/admin/edit_products";

@Controller()
export class Admin_Controller {
	@Post(APIS.change_user_data)
	async Change_user_data(@Req() req: Request, @Res() res: Response) {
		await change_user_data(req, res);
	}
	@Post(APIS.change_user_products)
	async Change_user_products(@Req() req: Request, @Res() res: Response) {
		await change_user_products(req, res);
	}
	@Post(APIS.promo_edit)
	async Edit_promocode(@Req() req: Request, @Res() res: Response) {
		await edit_promocode(req, res);
	}

	@Post(APIS.products_edit)
	async Edit_products(@Req() req: Request, @Res() res: Response) {
		await edit_products(req, res);
	}

	@Post(APIS.get_users)
	async Get_users(@Req() req: Request, @Res() res: Response) {
		await get_users(req, res);
	}
}
