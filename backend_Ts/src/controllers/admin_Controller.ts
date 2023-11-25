// system
import { Controller, Delete, Get, Patch, Put, Req, Res } from "@nestjs/common";
import { APIS } from "../config/API";
import { Request, Response } from "express";
//
// Services
//
//change User data
import { users_change_money } from "../services/admin/users/change/money";
import { users_change_role } from "../services/admin/users/change/role";
import { users_change_wheels } from "../services/admin/users/change/wheels";
import { users_change_meditations } from "../services/admin/users/change/meditations";
import { users_change_lists } from "../services/admin/users/change/lists";
//get Users
import { users_get_all } from "../services/admin/users/get/all";
import { users_get_one } from "../services/admin/users/get/one";
//delete\add User
import { users_add } from "../services/admin/users/add";
import { users_delete } from "../services/admin/users/delete";
//
//Feedback
import { feedback_read_all } from "../services/admin/feedback/read/all";
import { feedback_read_one } from "../services/admin/feedback/read/one";
import { feedback_get_unread } from "../services/admin/feedback/get/unread";
//
//Products
import { products_add_list } from "../services/admin/products/add/list";
import { products_add_meditation } from "../services/admin/products/add/meditation";
import { products_delete_list } from "../services/admin/products/delete/list";
import { products_delete_meditation } from "../services/admin/products/delete/meditation";
import { products_get_all } from "../services/admin/products/get";
//
//Promocodes
import { promocode_delete } from "../services/admin/promocodes/delete";
import { promocodes_get } from "../services/admin/promocodes/get";
import { promocode_add } from "../services/admin/promocodes/add";
//
@Controller()
export class Admin_Controller {
	//Users
	//
	//change User data
	@Patch(APIS.admin.users.change.money.apiUrl)
	async Users_change_money(@Req() req: Request, @Res() res: Response) {
		await users_change_money(req, res);
	}
	@Patch(APIS.admin.users.change.wheels.apiUrl)
	async Users_change_wheels(@Req() req: Request, @Res() res: Response) {
		await users_change_wheels(req, res);
	}
	@Patch(APIS.admin.users.change.role.apiUrl)
	async Users_change_role(@Req() req: Request, @Res() res: Response) {
		await users_change_role(req, res);
	}
	@Patch(APIS.admin.users.change.lists.apiUrl)
	async Users_change_lists(@Req() req: Request, @Res() res: Response) {
		await users_change_lists(req, res);
	}
	@Patch(APIS.admin.users.change.meditations.apiUrl)
	async Users_change_meditations(@Req() req: Request, @Res() res: Response) {
		await users_change_meditations(req, res);
	}
	//get Users
	@Get(APIS.admin.users.get.all.url)
	async Users_get_all(@Req() req: Request, @Res() res: Response) {
		await users_get_all(req, res);
	}
	@Get(APIS.admin.users.get.one.apiUrl)
	async Users_get_one(@Req() req: Request, @Res() res: Response) {
		await users_get_one(req, res);
	}
	//delete\add User
	@Put(APIS.admin.users.add.url)
	async Users_add(@Req() req: Request, @Res() res: Response) {
		await users_add(req, res);
	}
	@Delete(APIS.admin.users.delete.apiUrl)
	async Users_delete(@Req() req: Request, @Res() res: Response) {
		await users_delete(req, res);
	}
	//
	//Feedback
	//
	@Get(APIS.admin.feedback.get.unread.url)
	async Feedback_get_unread(@Req() req: Request, @Res() res: Response) {
		await feedback_get_unread(req, res);
	}
	@Patch(APIS.admin.feedback.read.all.url)
	async Feedback_read_all(@Req() req: Request, @Res() res: Response) {
		await feedback_read_all(req, res);
	}
	@Patch(APIS.admin.feedback.read.one.apiUrl)
	async Feedback_read_one(@Req() req: Request, @Res() res: Response) {
		await feedback_read_one(req, res);
	}
	//
	//Products
	//
	@Get(APIS.admin.products.get.url)
	async Products_get_all(@Req() req: Request, @Res() res: Response) {
		await products_get_all(req, res);
	}
	@Put(APIS.admin.products.add.list.apiUrl)
	async Products_list_add(@Req() req: Request, @Res() res: Response) {
		await products_add_list(req, res);
	}
	@Delete(APIS.admin.products.delete.list.apiUrl)
	async Products_list_delete(@Req() req: Request, @Res() res: Response) {
		await products_delete_list(req, res);
	}
	@Put(APIS.admin.products.add.meditation.apiUrl)
	async Products_meditation_add(@Req() req: Request, @Res() res: Response) {
		await products_add_meditation(req, res);
	}
	@Delete(APIS.admin.products.delete.meditation.apiUrl)
	async Products_meditation_delete(
		@Req() req: Request,
		@Res() res: Response,
	) {
		await products_delete_meditation(req, res);
	}
	//
	//Promocodes
	//
	@Get(APIS.admin.promocode.get.url)
	async Promocodes_get_all(@Req() req: Request, @Res() res: Response) {
		await promocodes_get(req, res);
	}
	@Put(APIS.admin.promocode.add.url)
	async Promocode_add(@Req() req: Request, @Res() res: Response) {
		await promocode_add(req, res);
	}
	@Delete(APIS.admin.promocode.delete.apiUrl)
	async Promocode_delete(@Req() req: Request, @Res() res: Response) {
		await promocode_delete(req, res);
	}
}
