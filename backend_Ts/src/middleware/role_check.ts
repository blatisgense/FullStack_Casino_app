import { NextFunction, Response } from "express";
import { Request_user } from "../config/types";

// verify user's role
export function role_check(roles: string[]) {
	return (req: Request_user, res: Response, next: NextFunction) => {
		try {
			// get role
			let ROLE: string = req.user.user_role;

			// checking variable
			let hasRole: boolean = false;

			// if user role in an allowed list, it's ok
			roles.map((el: string) => {
				if (ROLE === el) {
					hasRole = true;
					return;
					// go next if ok
				}
			});

			// if role denied, send error
			if (hasRole) {
				next();
			} else {
				return res
					.status(403)
					.json({
						error: "User have not access.",
					})
					.end();
			}
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	};
}
