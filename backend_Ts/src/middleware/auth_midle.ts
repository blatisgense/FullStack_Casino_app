import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { pool } from "../database/db";
import { JWT_tokens } from "../config/jwt";

interface AuthRequest extends Request {
	user: object;
}

let required = false;
// check if user authorized
export function auth_middle(
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) {
	try {
		//check for access token
		if (req.cookies.access_token) {
			jwt.verify(
				req.cookies.access_token,
				process.env.ACCESS_TOKEN_SECRET,
				async (error, user) => {
					if (!error && user.user_role) {
						// set users data to request
						let newData = await pool.query(
							`SELECT * FROM Users WHERE user_email = $1`,
							[user.user_email],
						);
						newData = await newData.rows[0];
						if (newData.error) {
							return res.status(403).json({ error: error.message }).end();
						}

						req.user = await newData;
						next();
					} else {
						required = true;
					}
				},
			);
		} else {
			required = true;
		}

		//check for refresh token
		if (required) {
			if (req.cookies.refresh_token) {
				jwt.verify(
					req.cookies.refresh_token,
					process.env.UPDATE_TOKEN_SECRET,
					async (error, user) => {
						if (error || user.user_role == null) {
							return res
								.status(403)
								.json({
									error:
										"You're token expired or replaced, please authorize again!",
								})
								.end();
						}

						let newData = await pool.query(
							`SELECT * FROM Users WHERE user_email = $1`,
							[user.user_email],
						);
						newData = await newData.rows[0];
						if (newData.error) {
							return res.status(403).json({ error: error.message }).end();
						}

						let TOKENS: { refresh_token: string; access_token: string } =
							JWT_tokens(newData);
						res.cookie("refresh_token", TOKENS.refresh_token, {
							httpOnly: true,
							sameSite: "none",
							secure: true,
						});
						res.cookie("access_token", TOKENS.access_token, {
							httpOnly: true,
							sameSite: "none",
							secure: true,
						});

						// set users data to request
						req.user = await newData;
						next();
					},
				);
			} else {
				return res
					.status(403)
					.json({
						error: "You're tokens expired or replaced, please authorize again!",
					})
					.end();
			}
		}
	} catch (error) {
		return res.status(500).json({ error: error }).end();
	}
}
