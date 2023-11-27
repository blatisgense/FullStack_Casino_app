import { pool } from "../../../../database/db";
import { Request, Response } from "express";

export const users_get_one = async (req: Request, res: Response) => {
	try {
		const users = await pool.query(
			`SELECT * FROM Users WHERE user_email = $1`,
			[req.params.email],
		);
		if (users.error) {
			return res.status(401).json({ error: users.error });
		}
		if (users.rows.length === 0) {
			return res.status(401).json({
				error: `User not found, check entered email.`,
			});
		}
		return res.status(200).json(users.rows[0]);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
