import { pool } from "../../../../database/db";
import { Request, Response } from "express";

export const feedback_read_all = async (req: Request, res: Response) => {
	try {
		const feedback = await pool.query(
			`UPDATE Feedback SET status = 'read' WHERE status = 'unread';`,
		);
		if (feedback.error) {
			return res.status(500).json({ error: feedback.error });
		}
		return res.status(200).json({ msg: "All messages read." });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
