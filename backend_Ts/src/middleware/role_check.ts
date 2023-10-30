import { NextFunction, Request, Response } from "express";

interface AuthRequest extends Request {
	user: {
		user_role: string;
	};
}

// verify user's role
export function role_check(roles: string[]) {
	return (req: AuthRequest, res: Response, next: NextFunction) => {
		try {
			// get role
			let ROLE = req.user.user_role;

			// checking variable
			let hasRole = false;

			// if user role in allowed list, it's ok
			roles.map((el) => {
				if (ROLE === el) {
					hasRole = true;
					// go next if ok
					next();
				}
			});

			// if role denied, send error
			if (!hasRole) {
				return res.status(403).json({ message: "User have not access" });
			}
		} catch (error) {
			return res.status(403).json({ message: error.message });
		}
	};
}
