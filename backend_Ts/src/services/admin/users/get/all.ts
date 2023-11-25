import { pool } from "../../../../database/db";
import { Request, Response } from "express";

export const users_get_all = async (req: Request, res: Response) => {
	try {
		const users = await pool.query(`SELECT * FROM Users;`);
		if (users.error) {
			return res.status(500).json({ error: users.error });
		}
		return res.status(200).json({ res: users.rows });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
