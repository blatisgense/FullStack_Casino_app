import { pool } from "../../../database/db";
import { Request, Response } from "express";

export const users_delete = async (req: Request, res: Response) => {
	try {
		if (!req.params.email) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		const query = await pool.query(
			`DELETE FROM Users WHERE user_email = $1`,
			[req.params.email],
		);

		if (query.error) {
			return res.status(500).json({
				error: query.error,
			});
		}
		return res.status(200).json({
			msg: `User ${req.params.email} deleted successfully`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
