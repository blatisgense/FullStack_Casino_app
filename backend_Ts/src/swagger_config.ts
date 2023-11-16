import { OpenAPIObject } from "@nestjs/swagger";

export const swagger_config: OpenAPIObject = {
	openapi: "3.0.0",
	info: {
		title: "Magic Wheel",
		description: "List of APIs for Magic Wheel",
		version: "1.0",
		contact: {
			name: "Lavrentij",
			url: "https://t.me/Blatisgense",
			email: "lavr.marudenko@gmail.com",
		},
	},
	paths: {
		//client_controller
		"/api/client/spin": {
			get: {
				summary: "Client_controller | Spins the 'wheel'.",
				description:
					"Spins the 'wheel' and return 'prize' to the client, update User data.",
				parameters: [
					{
						name: "Access Token",
						in: "cookie",
						required: true,
						description: "Access token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
					{
						name: "Refresh Token",
						in: "cookie",
						required: true,
						description: "Refresh token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],

				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									username: {
										type: "string",
									},
								},
							},
						},
					},
				},

				responses: {
					"200": {
						description:
							"Successfully spins the 'wheel' and return 'prize' to the client, successfully write result to DB",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										id: {
											type: "integer",
											example: 4,
										},
										name: {
											type: "string",
											example: "Jessica Smith",
										},
									},
								},
							},
						},
					},
				},
			},
		},

		"/api/client/promocode_check": {
			post: {
				summary: "Client_controller | Spins the 'wheel'.",
				description:
					"Spins the 'wheel' and return 'prize' to the client, update User data.",
				parameters: [
					{
						name: "Access Token",
						in: "cookie",
						required: true,
						description: "Access token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
					{
						name: "Refresh Token",
						in: "cookie",
						required: true,
						description: "Refresh token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],

				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									username: {
										type: "string",
									},
								},
							},
						},
					},
				},

				responses: {
					"200": {
						description:
							"Successfully spins the 'wheel' and return 'prize' to the client, successfully write result to DB",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										id: {
											type: "integer",
											example: 4,
										},
										name: {
											type: "string",
											example: "Jessica Smith",
										},
									},
								},
							},
						},
					},
				},
			},
		},

		//auth_controller
		"/api/auth/login": {
			post: {
				summary: "Client_controller | Spins the 'wheel'.",
				description:
					"Spins the 'wheel' and return 'prize' to the client, update User data.",
				parameters: [
					{
						name: "Access Token",
						in: "cookie",
						required: true,
						description: "Access token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
					{
						name: "Refresh Token",
						in: "cookie",
						required: true,
						description: "Refresh token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],

				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									username: {
										type: "string",
									},
								},
							},
						},
					},
				},

				responses: {
					"200": {
						description:
							"Successfully spins the 'wheel' and return 'prize' to the client, successfully write result to DB",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										id: {
											type: "integer",
											example: 4,
										},
										name: {
											type: "string",
											example: "Jessica Smith",
										},
									},
								},
							},
						},
					},
				},
			},
		},

		"/api/auth/register": {
			post: {
				summary: "Client_controller | Spins the 'wheel'.",
				description:
					"Spins the 'wheel' and return 'prize' to the client, update User data.",
				parameters: [
					{
						name: "Access Token",
						in: "cookie",
						required: true,
						description: "Access token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
					{
						name: "Refresh Token",
						in: "cookie",
						required: true,
						description: "Refresh token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],

				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									username: {
										type: "string",
									},
								},
							},
						},
					},
				},

				responses: {
					"200": {
						description:
							"Successfully spins the 'wheel' and return 'prize' to the client, successfully write result to DB",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										id: {
											type: "integer",
											example: 4,
										},
										name: {
											type: "string",
											example: "Jessica Smith",
										},
									},
								},
							},
						},
					},
				},
			},
		},

		"/api/auth/refresh_tokens": {
			post: {
				summary: "Client_controller | Spins the 'wheel'.",
				description:
					"Spins the 'wheel' and return 'prize' to the client, update User data.",
				parameters: [
					{
						name: "Access Token",
						in: "cookie",
						required: true,
						description: "Access token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
					{
						name: "Refresh Token",
						in: "cookie",
						required: true,
						description: "Refresh token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],

				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									username: {
										type: "string",
									},
								},
							},
						},
					},
				},

				responses: {
					"200": {
						description:
							"Successfully spins the 'wheel' and return 'prize' to the client, successfully write result to DB",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										id: {
											type: "integer",
											example: 4,
										},
										name: {
											type: "string",
											example: "Jessica Smith",
										},
									},
								},
							},
						},
					},
				},
			},
		},

		"/api/auth/delete_session": {
			post: {
				summary: "Client_controller | Spins the 'wheel'.",
				description:
					"Spins the 'wheel' and return 'prize' to the client, update User data.",
				parameters: [
					{
						name: "Access Token",
						in: "cookie",
						required: true,
						description: "Access token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
					{
						name: "Refresh Token",
						in: "cookie",
						required: true,
						description: "Refresh token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],

				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									username: {
										type: "string",
									},
								},
							},
						},
					},
				},

				responses: {
					"200": {
						description:
							"Successfully spins the 'wheel' and return 'prize' to the client, successfully write result to DB",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										id: {
											type: "integer",
											example: 4,
										},
										name: {
											type: "string",
											example: "Jessica Smith",
										},
									},
								},
							},
						},
					},
				},
			},
		},

		"/api/auth/get_data": {
			post: {
				summary: "Client_controller | Spins the 'wheel'.",
				description:
					"Spins the 'wheel' and return 'prize' to the client, update User data.",
				parameters: [
					{
						name: "Access Token",
						in: "cookie",
						required: true,
						description: "Access token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
					{
						name: "Refresh Token",
						in: "cookie",
						required: true,
						description: "Refresh token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],

				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									username: {
										type: "string",
									},
								},
							},
						},
					},
				},

				responses: {
					"200": {
						description:
							"Successfully spins the 'wheel' and return 'prize' to the client, successfully write result to DB",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										id: {
											type: "integer",
											example: 4,
										},
										name: {
											type: "string",
											example: "Jessica Smith",
										},
									},
								},
							},
						},
					},
				},
			},
		},

		//admin_controller
		"/api/admin/create": {
			post: {
				summary: "Client_controller | Spins the 'wheel'.",
				description:
					"Spins the 'wheel' and return 'prize' to the client, update User data.",
				parameters: [
					{
						name: "Access Token",
						in: "cookie",
						required: true,
						description: "Access token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
					{
						name: "Refresh Token",
						in: "cookie",
						required: true,
						description: "Refresh token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],

				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									username: {
										type: "string",
									},
								},
							},
						},
					},
				},

				responses: {
					"200": {
						description:
							"Successfully spins the 'wheel' and return 'prize' to the client, successfully write result to DB",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										id: {
											type: "integer",
											example: 4,
										},
										name: {
											type: "string",
											example: "Jessica Smith",
										},
									},
								},
							},
						},
					},
				},
			},
		},

		"/api/admin/get": {
			post: {
				summary:
					"Admin_controller | Send list of users or user to the client.",
				description: "Send list of users or user to the client.",
				parameters: [
					{
						name: "Access Token",
						in: "cookie",
						required: true,
						description: "Access token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
					{
						name: "Refresh Token",
						in: "cookie",
						required: false,
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],

				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									all: {
										type: "string",
										example: "true",
										description:
											'Set "true" (string) to get all users, if "true" other properties are ignored',
									},
									method: {
										type: "string",
										example: "id",
										description:
											"Choose which unique User field use for search (id | email)",
									},
									identificator: {
										type: "string",
										example:
											"9e30b7de-906c-46ed-8973-a8d094b94d11",
										description:
											"Set email or ID (in dependency of 'method' property) of User, that you search",
									},
								},
							},
						},
					},
				},

				responses: {
					"200": {
						description:
							"Successfully get Users/User from DB, send to the client.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										user_id: {
											type: "string",
											example:
												"9e30b7de-906c-46ed-8973-a8d094b94d11",
											description: "Unique User's ID",
										},
										user_email: {
											type: "string",
											example: "lavr.marudenko@gmail.com",
											description: "Unique User's Email",
										},
										user_name: {
											type: "string",
											example: "Lavrentij",
											description: "User's name",
										},
										user_password: {
											type: "string",
											example:
												"aaisjdasj-asiodasjd-aksdipasjd",
											description:
												"User's password (encrypted)",
										},
										user_wheel: {
											type: "integer",
											example: 10,
											description:
												"User's tries to spin wheel",
										},
										user_list: {
											type: "string[]",
											example: ["a", "b"],
											description: "User's check-lists",
										},
										user_meditation: {
											type: "string[]",
											example: ["a", "b"],
											description: "User's meditations",
										},
										user_money: {
											type: "integer",
											example: 1500,
											description: "User's money",
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Request body error, invalid data sent.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Error description text",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description: "Unable to authorize",
										},
									},
								},
							},
						},
					},
					"500": {
						description: "Internal server error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Error description text",
											description: "Error description",
										},
									},
								},
							},
						},
					},
				},
			},
		}, //

		"/api/admin/change_product": {
			post: {
				summary:
					"Admin_controller | Change User products (Check-lists, meditations).",
				description: "Change User products (Check-lists, meditations)",
				parameters: [
					{
						name: "Access Token",
						in: "cookie",
						required: true,
						description: "Access token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
					{
						name: "Refresh Token",
						in: "cookie",
						required: true,
						description: "Refresh token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],

				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									method: {
										type: "string",
										example: "id",
										description:
											"Choose which unique User field use for search (id | email)",
									},
									identificator: {
										type: "string",
										example:
											"9e30b7de-906c-46ed-8973-a8d094b94d11",
										description:
											"Set email or ID (in dependency of 'method' property) of User, that you search",
									},
									type: {
										example: "meditation",
										type: "string",
										description:
											"Choose which User product change",
									},
									value: {
										example: "meditation_name",
										type: "string",
										description:
											"Adds/deletes products to User",
									},
									move: {
										example: "delete",
										type: "string",
										description:
											"Choose to Adds/Deletes product",
									},
								},
							},
						},
					},
				},

				responses: {
					"200": {
						description: "Successfully change User product",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"Item product name deletes successfully.",
											description: "Message with info",
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Request body error, invalid data sent.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Error description text",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description: "Unable to authorize",
										},
									},
								},
							},
						},
					},
					"500": {
						description: "Internal server error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Error description text",
											description: "Error description",
										},
									},
								},
							},
						},
					},
				},
			},
		}, //

		"/api/admin/change_data": {
			post: {
				summary:
					"Admin_controller | Change User data (Role, money, wheels).",
				description: "Change User data (Role, money, wheels).",
				parameters: [
					{
						name: "Access Token",
						in: "cookie",
						required: true,
						description: "Access token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
					{
						name: "Refresh Token",
						in: "cookie",
						required: true,
						description: "Refresh token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],

				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									method: {
										type: "string",
										example: "id",
										description:
											"Choose which unique User field use for search (id | email)",
									},
									identificator: {
										type: "string",
										example:
											"9e30b7de-906c-46ed-8973-a8d094b94d11",
										description:
											"Set email or ID (in dependency of 'method' property) of User, that you search",
									},
									type: {
										example: "role",
										type: "string",
										description:
											"Choose which User parameter change",
									},
									value: {
										example: "ADMIN",
										type: "string",
										description:
											"New value of changing parameter",
									},
								},
							},
						},
					},
				},

				responses: {
					"200": {
						description: "Successfully change User parameter",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"Parameter_name changed to New_value",
											description: "Message with info",
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Request body error, invalid data sent.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Error description text",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description: "Unable to authorize",
										},
									},
								},
							},
						},
					},
					"500": {
						description: "Internal server error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Error description text",
											description: "Error description",
										},
									},
								},
							},
						},
					},
				},
			},
		}, //

		"/api/admin/edit": {
			post: {
				summary: "Client_controller | Spins the 'wheel'.",
				description:
					"Spins the 'wheel' and return 'prize' to the client, update User data.",
				parameters: [
					{
						name: "Access Token",
						in: "cookie",
						required: true,
						description: "Access token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
					{
						name: "Refresh Token",
						in: "cookie",
						required: true,
						description: "Refresh token, to verify auth.",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],

				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									username: {
										type: "string",
									},
								},
							},
						},
					},
				},

				responses: {
					"200": {
						description:
							"Successfully spins the 'wheel' and return 'prize' to the client, successfully write result to DB",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										id: {
											type: "integer",
											example: 4,
										},
										name: {
											type: "string",
											example: "Jessica Smith",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},
};
