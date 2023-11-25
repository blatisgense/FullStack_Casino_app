import { pool } from "../../../database/db";
import { Request, Response } from "express";

export const promocodes_get = async (req: Request, res: Response) => {
	try {
		const query = await pool.query(`SELECT * FROM PromoCodes;`);

		if (query.error) {
			return res.status(500).json({
				error: query.error,
			});
		}
		return res.status(200).json({
			res: query.rows,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
