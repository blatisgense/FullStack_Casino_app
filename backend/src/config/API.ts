export const APIS = {
	auth: {
		login: {
			url: "/api/auth/login",
			method: "POST",
		},
		register: {
			url: "/api/auth/register",
			method: "POST",
		},
		logout: {
			url: "/api/auth/logout",
			method: "DELETE",
		},
	},
	client: {
		wheel: {
			spin: {
				url: "/api/client/wheel/spin",
				method: "GET",
			},
		},
		data: {
			get: {
				url: "/api/client/data/get",
				method: "GET",
			},
		},
		promocode: {
			verify: {
				url: "/api/client/promocode/verify",
				method: "POST",
			},
		},
		feedback: {
			send: {
				url: "/api/client/feedback/send",
				method: "POST",
			},
		},
	},
	admin: {
		users: {
			change: {
				money: {
					apiUrl: "/api/admin/users/change/money/:email/:value",
					url: "/api/admin/users/change/money",
					method: "PATCH",
				},
				wheels: {
					apiUrl: "/api/admin/users/change/wheels/:email/:value",
					url: "/api/admin/users/change/wheels",
					method: "PATCH",
				},
				role: {
					apiUrl: "/api/admin/users/change/role/:email/:value",
					url: "/api/admin/users/change/role",
					method: "PATCH",
				},
				meditations: {
					apiUrl: "/api/admin/users/change/meditations/:email/:method/:value",
					url: "/api/admin/users/change/meditations",
					method: "PATCH",
				},
				lists: {
					apiUrl: "/api/admin/users/change/lists/:email/:method/:value",
					url: "/api/admin/users/change/lists",
					method: "PATCH",
				},
			},
			add: {
				url: "/api/admin/users/add",
				method: "PUT",
			},
			delete: {
				apiUrl: "/api/admin/users/delete/:email",
				url: "/api/admin/users/delete",
				method: "DELETE",
			},
			get: {
				all: {
					url: "/api/admin/users/get/all",
					method: "GET",
				},
				one: {
					apiUrl: "/api/admin/users/get/one/:email",
					url: "/api/admin/users/get/one",
					method: "GET",
				},
			},
		},
		promocode: {
			get: {
				url: "/api/admin/promocodes/get",
				method: "GET",
			},
			add: {
				url: "/api/admin/promocodes/add",
				method: "PUT",
			},
			delete: {
				apiUrl: "/api/admin/promocodes/delete/:promo",
				url: "/api/admin/promocodes/delete",
				method: "DELETE",
			},
		},
		products: {
			get: {
				url: "/api/admin/products/get",
				method: "GET",
			},
			add: {
				meditation: {
					apiUrl: "/api/admin/products/add/meditation/:name",
					url: "/api/admin/products/add/meditation",
					method: "PUT",
				},
				list: {
					apiUrl: "/api/admin/products/add/list/:name",
					url: "/api/admin/products/add/list",
					method: "PUT",
				},
			},
			delete: {
				meditation: {
					apiUrl: "/api/admin/products/delete/meditation/:name",
					url: "/api/admin/products/delete/meditation",
					method: "DELETE",
				},
				list: {
					apiUrl: "/api/admin/products/delete/list/:name",
					url: "/api/admin/products/delete/list",
					method: "DELETE",
				},
			},
		},
		feedback: {
			read: {
				one: {
					apiUrl: "/api/admin/feedback/read/one/:id",
					url: "/api/admin/feedback/read/one",
					method: "PATCH",
				},
				all: {
					url: "/api/admin/feedback/read/all",
					method: "PATCH",
				},
			},
			get: {
				unread: {
					url: "/api/admin/feedback/get/unread",
					method: "GET",
				},
			},
		},
	},
};
