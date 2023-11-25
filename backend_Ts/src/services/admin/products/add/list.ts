import { pool } from "../../../../database/db";
import { Request, Response } from "express";

export const products_add_list = async (req: Request, res: Response) => {
	try {
		if (!req.params.name) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		const list = await pool.query(
			`UPDATE Products SET products_list = ARRAY_APPEND(products_list, $1)`,
			[req.params.name],
		);
		if (list.error) {
			return res.status(401).json({ error: list.error });
		}

		return res.status(200).json({
			msg: `List ${req.params.name} added successfully.`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
