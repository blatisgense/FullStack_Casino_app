import { pool } from "../../../../database/db";
import { Request, Response } from "express";

export const products_delete_meditation = async (
	req: Request,
	res: Response,
) => {
	try {
		if (!req.params.name) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		const meditations = await pool.query(
			`UPDATE Products SET products_meditation = ARRAY_REMOVE(products_meditation, $1)`,
			[req.params.name],
		);
		if (meditations.error) {
			return res.status(401).json({ error: meditations.error });
		}

		return res.status(200).json({
			msg: `Meditation ${req.params.name} deleted successfully.`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
