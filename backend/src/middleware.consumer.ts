import { auth_middle } from "./middleware/auth_middle";
import { role_check } from "./middleware/role_check";
import { APIS } from "./config/API";
import { RequestMethod } from "@nestjs/common";

export const middlewareConsumer = (consumer) => {
	//admin
	consumer.apply(auth_middle, role_check(["ADMIN"])).forRoutes(
		{
			path: APIS.admin.users.change.money.apiUrl,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.users.change.lists.apiUrl,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.users.change.role.apiUrl,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.users.change.wheels.apiUrl,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.users.change.meditations.apiUrl,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.users.get.all.url,
			method: RequestMethod.GET,
		},
		{
			path: APIS.admin.users.get.one.apiUrl,
			method: RequestMethod.GET,
		},
		{
			path: APIS.admin.users.add.url,
			method: RequestMethod.PUT,
		},
		{
			path: APIS.admin.users.delete.apiUrl,
			method: RequestMethod.DELETE,
		},
		//Feedback
		{
			path: APIS.admin.feedback.get.unread.url,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.feedback.read.all.url,
			method: RequestMethod.PATCH,
		},
		{
			path: APIS.admin.feedback.read.one.apiUrl,
			method: RequestMethod.PATCH,
		},
		//Products
		{
			path: APIS.admin.products.delete.list.apiUrl,
			method: RequestMethod.DELETE,
		},
		{
			path: APIS.admin.products.get.url,
			method: RequestMethod.GET,
		},
		{
			path: APIS.admin.products.add.meditation.apiUrl,
			method: RequestMethod.PUT,
		},
		{
			path: APIS.admin.products.add.list.apiUrl,
			method: RequestMethod.PUT,
		},
		{
			path: APIS.admin.products.delete.meditation.apiUrl,
			method: RequestMethod.DELETE,
		},
		//Promocodes
		{
			path: APIS.admin.promocode.get.url,
			method: RequestMethod.GET,
		},
		{
			path: APIS.admin.promocode.add.url,
			method: RequestMethod.PUT,
		},
		{
			path: APIS.admin.promocode.delete.apiUrl,
			method: RequestMethod.DELETE,
		},
	);

	//client
	consumer.apply(auth_middle).forRoutes(
		{
			path: APIS.client.wheel.spin.url,
			method: RequestMethod.GET,
		},
		{
			path: APIS.client.data.get.url,
			method: RequestMethod.GET,
		},
		{
			path: APIS.client.promocode.verify.url,
			method: RequestMethod.POST,
		},
		{
			path: APIS.client.feedback.send.url,
			method: RequestMethod.POST,
		},
	);
};
