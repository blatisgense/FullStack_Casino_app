import { auth_middle } from "./middleware/auth_midle";
import { role_check } from "./middleware/role_check";
import { APIS } from "./config/API";
import { RequestMethod } from "@nestjs/common";

export const middlewareConsumer = (consumer) => {
	//admin
	consumer.apply(auth_middle, role_check(["ADMIN"])).forRoutes(
		{
			path: APIS.promo_edit,
			method: RequestMethod.POST,
		},
		{
			path: APIS.change_user_data,
			method: RequestMethod.POST,
		},
		{
			path: APIS.change_user_products,
			method: RequestMethod.POST,
		},
		{
			path: APIS.products_edit,
			method: RequestMethod.POST,
		},
		{
			path: APIS.get_users,
			method: RequestMethod.POST,
		},
	);
	//auth
	consumer.apply(auth_middle).forRoutes({
		path: APIS.get_data,
		method: RequestMethod.GET,
	});
	//client
	consumer.apply(auth_middle).forRoutes(
		{ path: APIS.spin, method: RequestMethod.GET },
		{
			path: APIS.verify_promo,
			method: RequestMethod.POST,
		},
	);
};
