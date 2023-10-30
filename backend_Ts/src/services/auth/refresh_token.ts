import { JWT_tokens } from "../../config/jwt";
import * as jwt from "jsonwebtoken";
import { pool } from "../../database/db";

export const refresh_token = (req, res) => {
	try {
		const refresh_token = req.cookies.refresh_token;

		if (refresh_token === null) {
			return res.status(401).json("Refresh TOKEN not found");
		}

		jwt.verify(
			refresh_token,
			process.env.UPDATE_TOKEN_SECRET,
			async (error, user) => {
				if (error) {
					return res.status(403).json({ error: error.message });
				}

				const email = user.user_email;
				let newData = await pool.query(
					`SELECT * FROM Users WHERE user_email = $1`,
					[email],
				);
				newData = await newData.rows[0];
				let TOKENS: { access_token: string; refresh_token: string } =
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
				return res.status(200).json("Success");
			},
		);
	} catch (error) {
		return res.status(401).json({ error: error.message });
	}
};
