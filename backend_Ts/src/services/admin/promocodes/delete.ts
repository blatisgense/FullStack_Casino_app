import { pool } from "../../../database/db";
import { Request, Response } from "express";

export const promocode_delete = async (req: Request, res: Response) => {
	try {
		if (!req.params.promo) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		const query = await pool.query(
			`DELETE FROM PromoCodes WHERE promo = $1`,
			[req.params.promo],
		);

		if (query.error) {
			return res.status(500).json({
				error: query.error,
			});
		}
		return res.status(200).json({
			msg: `Promocode ${req.params.promo} deleted successfully.`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
