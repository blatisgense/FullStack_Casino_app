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
		//====================
		// AUTH
		//====================
		"/api/auth/login": {
			post: {
				tags: ["Auth"],
				summary: "Auth_controller | Login.",
				description: "Login into account, sets Auth cookies.",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									email: {
										type: "string",
										example: "lavr.marudenko@gmail.com",
										description: "User email.",
									},
									password: {
										type: "string",
										example: "pass1234",
										description: "User password.",
									},
								},
							},
						},
					},
				},
				responses: {
					"200": {
						description:
							"Successfully logins, set Access and Refresh tokens in cookies",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"You've logged in successfully.",
										},
									},
								},
							},
						},
					},
					"401": {
						description:
							"Invalid data sent | User not found | Password is incorrect | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"Password is incorrect, please try again.",
											description: "Error description",
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
				tags: ["Auth"],
				summary: "Auth_controller | Registration.",
				description: "Register new User.",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									email: {
										type: "string",
										example: "lavr.marudenko@gmail.com",
										description: "User email.",
									},
									password: {
										type: "string",
										example: "pass1234",
										description: "User password.",
									},
									name: {
										type: "string",
										example: "Lavrentij",
										description: "User name.",
									},
								},
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Successfully register new User.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example: `Success!<br> You can Sign In with your data.`,
										},
									},
								},
							},
						},
					},
					"401": {
						description:
							"Invalid data sent | This Email already used. | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "This Email already used.",
											description: "Error description",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/auth/logout": {
			delete: {
				tags: ["Auth"],
				summary: "Auth_controller | Logout",
				description: "Deletes Auth cookies.",
				responses: {
					"200": {
						description: "Successfully logouts.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"You have logout successfully.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		//====================
		// CLIENT
		//====================
		"/api/client/wheel/spin": {
			get: {
				tags: ["Client"],
				summary: "Client_controller | Spin 'wheel'.",
				description: "Spins 'wheel', return prize.",
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "Successfully logouts.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										item_name: {
											type: "string",
											example: "Morning",
										},
										prize: {
											type: "string",
											example: "Meditation",
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Not enough wheels | DB error.",
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
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/client/data/get": {
			get: {
				tags: ["Client"],
				summary: "Client_controller | Get User data.",
				description: "Return User data.",
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "Return User data.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										user_name: {
											type: "string",
											example: "Lavrentij",
										},
										user_email: {
											type: "string",
											example: "lavr.marudenko@gmail.com",
										},
										user_role: {
											type: "string",
											example: "ADMIN",
										},
										user_wheel: {
											type: "string",
											example: "10",
										},
										user_money: {
											type: "string",
											example: "2500",
										},
										user_meditation: {
											type: "string[]",
											example: ["one", "two"],
										},
										user_list: {
											type: "string[]",
											example: ["one", "two"],
										},
									},
								},
							},
						},
					},
					"401": {
						description: "DB error.",
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
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/client/promocode/verify": {
			post: {
				tags: ["Client"],
				summary: "Client_controller | Verify promo.",
				description: "Verify promocode, return prize.",
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
									promocode: {
										type: "string",
										example: "NdjnNdlsn",
									},
								},
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Promocode verified.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"You've got: 'list of prizes'.",
											description: "List of prizes.",
										},
									},
								},
							},
						},
					},
					"401": {
						description:
							"Invalid data sent | Promocode not found | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Promocode not found.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/client/feedback/send": {
			post: {
				tags: ["Client"],
				summary: "Client_controller | Send feedback.",
				description: "Send feedback to admins.",
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
									msg: {
										type: "string",
										example: "Massage text",
									},
									name: {
										type: "string",
										example: "Lavrentij",
									},
								},
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Feedback sent.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"Massage sent successfully, you'll receive feedback by Email.",
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Invalid data sent | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Invalid data sent",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		//====================
		// ADMIN
		//====================
		// USERS
		//change
		"/api/admin/users/change/money/:email/:value": {
			patch: {
				tags: ["Admin", "Admin_users", "Admin_users_change"],
				summary: "Admin_controller | Change User money",
				description: "Change User money.",
				parameters: [
					{
						name: "email",
						in: "path",
						required: true,
						description: "User's email",
						schema: {
							type: "string",
							example: "lavr.marudenko@gmail.com",
						},
					},
					{
						name: "value",
						in: "path",
						required: true,
						description: "Amount of money",
						schema: {
							type: "number",
							example: 1000,
						},
					},
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "Money changed",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"Money of ${req.params.email} changed to ${req.params.value}.",
										},
									},
								},
							},
						},
					},
					"401": {
						description:
							"Invalid data sent | Value should be a number | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"Invalid data sent, value should be a Number.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/admin/users/change/wheels/:email/:value": {
			patch: {
				tags: ["Admin", "Admin_users", "Admin_users_change"],
				summary: "Admin_controller | Change User wheels",
				description: "Change User wheels.",
				parameters: [
					{
						name: "email",
						in: "path",
						required: true,
						description: "User's email",
						schema: {
							type: "string",
							example: "lavr.marudenko@gmail.com",
						},
					},
					{
						name: "value",
						in: "path",
						required: true,
						description: "Amount of wheels",
						schema: {
							type: "number",
							example: 1000,
						},
					},
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "Wheels changed",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"Wheels of ${req.params.email} changed to ${req.params.value}.",
										},
									},
								},
							},
						},
					},
					"401": {
						description:
							"Invalid data sent | Value should be a number | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"Invalid data sent, value should be a Number.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/admin/users/change/role/:email/:value": {
			patch: {
				tags: ["Admin", "Admin_users", "Admin_users_change"],
				summary: "Admin_controller | Change User role",
				description: "Change User role.",
				parameters: [
					{
						name: "email",
						in: "path",
						required: true,
						description: "User's email",
						schema: {
							type: "string",
							example: "lavr.marudenko@gmail.com",
						},
					},
					{
						name: "value",
						in: "path",
						required: true,
						description: "New role",
						schema: {
							type: "string",
							example: "ADMIN",
						},
					},
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "Role changed",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"Role of ${req.params.email} changed to ${req.params.value}.",
										},
									},
								},
							},
						},
					},
					"401": {
						description:
							"Invalid data sent | should be a valid role | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Invalid data sent",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/admin/users/change/meditations/:email/:method/:value": {
			patch: {
				tags: ["Admin", "Admin_users", "Admin_users_change"],
				summary: "Admin_controller | Change User meditations",
				description: "Change User meditations.",
				parameters: [
					{
						name: "email",
						in: "path",
						required: true,
						description: "User's email",
						schema: {
							type: "string",
							example: "lavr.marudenko@gmail.com",
						},
					},
					{
						name: "value",
						in: "path",
						required: true,
						description: "Name of product",
						schema: {
							type: "string",
							example: "morning",
						},
					},
					{
						name: "method",
						in: "path",
						required: true,
						description: "Add/delete product",
						schema: {
							type: "string",
							example: "add",
						},
					},
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "Meditation added/deleted.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"Meditation ${req.params.value} added successfully.",
										},
									},
								},
							},
						},
					},
					"401": {
						description:
							"Invalid data sent | should be delete/add | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"Invalid data sent, method should be delete || add.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/admin/users/change/lists/:email/:method/:value": {
			patch: {
				tags: ["Admin", "Admin_users", "Admin_users_change"],
				summary: "Admin_controller | Change User lists",
				description: "Change User lists.",
				parameters: [
					{
						name: "email",
						in: "path",
						required: true,
						description: "User's email",
						schema: {
							type: "string",
							example: "lavr.marudenko@gmail.com",
						},
					},
					{
						name: "value",
						in: "path",
						required: true,
						description: "Name of product",
						schema: {
							type: "string",
							example: "morning",
						},
					},
					{
						name: "method",
						in: "path",
						required: true,
						description: "Add/delete product",
						schema: {
							type: "string",
							example: "add",
						},
					},
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "List added/deleted.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"List ${req.params.value} added successfully.",
										},
									},
								},
							},
						},
					},
					"401": {
						description:
							"Invalid data sent | should be delete/add | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"Invalid data sent, method should be delete || add.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		//add\delete
		"/api/admin/users/add": {
			put: {
				tags: ["Admin", "Admin_users"],
				summary: "Admin_controller | Add User",
				description: "Add new User.",
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
									email: {
										type: "string",
										example: "lavr.marudenko@gmail.com",
										description: "User email.",
									},
									password: {
										type: "string",
										example: "pass1234",
										description: "User password.",
									},
									name: {
										type: "string",
										example: "Lavrentij",
										description: "User name.",
									},
								},
							},
						},
					},
				},
				responses: {
					"200": {
						description: "User added.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"User ${req.body.name} created.",
										},
									},
								},
							},
						},
					},
					"401": {
						description:
							"Invalid data sent | Email already used | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "This Email already used.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/admin/users/delete/:email": {
			delete: {
				tags: ["Admin", "Admin_users"],
				summary: "Admin_controller | Delete User",
				description: "Delete User.",
				parameters: [
					{
						name: "email",
						in: "path",
						required: true,
						description: "User's email",
						schema: {
							type: "string",
							example: "lavr.marudenko@gmail.com",
						},
					},
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "User deleted.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"User ${req.params.email} deleted.",
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Invalid data sent | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Invalid data sent.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		//get
		"/api/admin/users/get/all": {
			get: {
				tags: ["Admin", "Admin_users"],
				summary: "Admin_controller | Get all Users",
				description: "Get array of all Users.",
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "Users returned to client.",
						content: {
							"application/json": {
								schema: {
									type: "string[]",
								},
							},
						},
					},
					"401": {
						description: "Invalid data sent | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Invalid data sent.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/admin/users/get/one/:email": {
			get: {
				tags: ["Admin", "Admin_users"],
				summary: "Admin_controller | Get User",
				description: "Get User.",
				parameters: [
					{
						name: "email",
						in: "path",
						required: true,
						description: "User's email",
						schema: {
							type: "string",
							example: "lavr.marudenko@gmail.com",
						},
					},
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "User returned to client.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										user_name: {
											type: "string",
											example: "Lavrentij",
										},
										user_email: {
											type: "string",
											example: "lavr.marudenko@gmail.com",
										},
										user_role: {
											type: "string",
											example: "ADMIN",
										},
										user_wheel: {
											type: "string",
											example: "10",
										},
										user_money: {
											type: "string",
											example: "2500",
										},
										user_meditation: {
											type: "string[]",
											example: ["one", "two"],
										},
										user_list: {
											type: "string[]",
											example: ["one", "two"],
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Invalid data sent | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Invalid data sent.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		//
		// FEEDBACK
		"/api/client/feedback/get/unread": {
			get: {
				tags: ["Admin", "Admin_feedback"],
				summary: "Admin_controller | Get unread messages",
				description: "Get unread messages.",
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "Messages returned to client.",
						content: {
							"application/json": {
								schema: {
									type: "string[]",
								},
							},
						},
					},
					"401": {
						description: "Invalid data sent | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Invalid data sent.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/client/send/read/one/:id": {
			patch: {
				tags: ["Admin", "Admin_feedback"],
				summary: "Admin_controller | Read message",
				description: "Read message.",
				parameters: [
					{
						name: "id",
						in: "path",
						required: true,
						description: "message's id",
						schema: {
							type: "number",
							example: 24,
						},
					},
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "Message status changed to 'read'.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"Message id${req.params.id} read",
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Invalid data sent | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Invalid data sent.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/client/feedback/read/all": {
			patch: {
				tags: ["Admin", "Admin_feedback"],
				summary: "Admin_controller | Read all messages",
				description: "Read all messages.",
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "All messages status changed to 'read'.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example: "All messages read",
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Invalid data sent | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Invalid data sent.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		//
		// PROMOCODES
		"/api/admin/promocodes/get": {
			get: {
				tags: ["Admin", "Admin_promocodes"],
				summary: "Admin_controller | Get all promocodes",
				description: "Get all promocodes.",
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "Promocodes returned to client.",
						content: {
							"application/json": {
								schema: {
									type: "string[]",
								},
							},
						},
					},
					"401": {
						description: "Invalid data sent | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Invalid data sent.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/admin/promocodes/add": {
			put: {
				tags: ["Admin", "Admin_promocodes"],
				summary: "Admin_controller | Add new promocode",
				description: "Add new promocode.",
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
									give: {
										type: "string",
										example: "money",
										description: "Type of prize.",
									},
									promo: {
										type: "string",
										example: "nsdcnsdds",
										description: "New promocode.",
									},
									value: {
										type: "string",
										example: "1000",
										description: "Value of prize.",
									},
								},
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Promocode created.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"Promocode ${req.body.promo} created successfully.",
										},
									},
								},
							},
						},
					},
					"401": {
						description:
							"Invalid data sent | should be a Number | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "This Email already used.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/admin/promocodes/delete/:promo": {
			delete: {
				tags: ["Admin", "Admin_promocodes"],
				summary: "Admin_controller | Delete promocode",
				description: "Delete promocode.",
				parameters: [
					{
						name: "promo",
						in: "path",
						required: true,
						description: "Promo to delete",
						schema: {
							type: "string",
							example: "sadhdsd",
						},
					},
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "Promocode deleted.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"Promocode ${req.params.promo} deleted.",
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Invalid data sent | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Invalid data sent.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		//
		// PRODUCTS
		//add
		"/api/admin/products/add/meditation/:name": {
			put: {
				tags: ["Admin", "Admin_products"],
				summary: "Admin_controller | Add new meditation",
				description: "Add new meditation.",
				parameters: [
					{
						name: "name",
						in: "path",
						required: true,
						description: "Meditation name to add",
						schema: {
							type: "string",
							example: "morning",
						},
					},
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "Meditation added.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"Meditation ${req.body.name} added.",
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Invalid data sent | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "This Email already used.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/admin/products/add/list/:name": {
			put: {
				tags: ["Admin", "Admin_products"],
				summary: "Admin_controller | Add new list",
				description: "Add new list.",
				parameters: [
					{
						name: "name",
						in: "path",
						required: true,
						description: "List name to add",
						schema: {
							type: "string",
							example: "morning",
						},
					},
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "List added.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"List ${req.body.name} added.",
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Invalid data sent | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "This Email already used.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		//delete
		"/api/admin/products/delete/meditation/:name": {
			delete: {
				tags: ["Admin", "Admin_products"],
				summary: "Admin_controller | Delete meditation",
				description: "Delete meditation.",
				parameters: [
					{
						name: "name",
						in: "path",
						required: true,
						description: "Meditation name to delete",
						schema: {
							type: "string",
							example: "morning",
						},
					},
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "Meditation deleted.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"Meditation ${req.params.name} deleted.",
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Invalid data sent | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Invalid data sent.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		"/api/admin/products/delete/list/:name": {
			delete: {
				tags: ["Admin", "Admin_products"],
				summary: "Admin_controller | Delete list",
				description: "Delete list.",
				parameters: [
					{
						name: "name",
						in: "path",
						required: true,
						description: "List name to delete",
						schema: {
							type: "string",
							example: "morning",
						},
					},
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "List deleted.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										msg: {
											type: "string",
											example:
												"List ${req.params.name} deleted.",
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Invalid data sent | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Invalid data sent.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
										},
									},
								},
							},
						},
					},
				},
			},
		},
		//get
		"/api/admin/products/get": {
			get: {
				tags: ["Admin", "Admin_products"],
				summary: "Admin_controller | Get all products",
				description: "Get all products.",
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
						description:
							"Refresh token, to verify auth if access Token expired",
						schema: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						},
					},
				],
				responses: {
					"200": {
						description: "Products returned to client.",
						content: {
							"application/json": {
								schema: {
									type: "string[]",
								},
							},
						},
					},
					"401": {
						description: "Invalid data sent | DB error.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example: "Invalid data sent.",
											description: "Error description",
										},
									},
								},
							},
						},
					},
					"403": {
						description: "Auth error | access issue.",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										error: {
											type: "string",
											example:
												"You're token expired or replaced, please authorize again!",
											description:
												"Unable to authorize, or you haven't access.",
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
