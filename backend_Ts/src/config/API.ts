export const APIS = {
	//auth
	login: `/api/auth/login`, //auth, post
	register: `/api/auth/register`, //auth, post
	get_data: `/api/auth/get_data`, //auth, get
	delete_token: `/api/auth/delete_session`, //auth, delete
	refresh_token: `/api/auth/refresh_tokens`, //auth, get
	//client
	spin: `/api/client/spin`, //client ,get
	verify_promo: `/api/client/promocode_check`, //client ,post
	//admin
	change_user_data: `/api/admin/change_data`, //admin ,post
	change_user_products: `/api/admin/change_product`, //admin ,post
	promo_edit: `/api/admin/create`, //admin ,post
	products_edit: `/api/admin/edit`, //admin ,post
	get_users: `/api/admin/get`, //admin ,post
};
