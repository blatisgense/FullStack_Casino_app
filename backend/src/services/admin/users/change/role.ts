import { pool } from "../../../../database/db";
import { Request, Response } from "express";

export const users_change_role = async (req: Request, res: Response) => {
	try {
		if (!req.params.email || !req.params.value) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		if (
			req.params.value.toUpperCase() != "USER" &&
			req.params.value.toUpperCase() != "ADMIN"
		) {
			return res.status(401).json({
				error: `Invalid data sent, value should be a valid role`,
			});
		}

		const query = await pool.query(
			`UPDATE Users SET user_role = $1 WHERE user_email = $2`,
			[req.params.value, req.params.email],
		);

		if (query.error) {
			return res.status(500).json({
				error: query.error,
			});
		}
		return res.status(200).json({
			msg: `Role of ${
				req.params.email
			} changed to ${req.params.value.toUpperCase()}`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
