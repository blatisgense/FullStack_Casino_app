import { pool } from "../../../../database/db";
import { Request, Response } from "express";

export const feedback_get_unread = async (req: Request, res: Response) => {
	try {
		const feedback = await pool.query(
			`SELECT * FROM Feedback WHERE status = 'unread';`,
		);
		if (feedback.error) {
			return res.status(500).json({ error: feedback.error });
		}
		return res.status(200).json({ res: feedback.rows });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
