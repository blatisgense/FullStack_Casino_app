import { pool } from "../../../../database/db";
import { Request, Response } from "express";

export const feedback_read_one = async (req: Request, res: Response) => {
	try {
		if (!req.params.id) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		const feedback = await pool.query(
			`UPDATE Feedback SET status = 'read' WHERE msg_id = $1;`,
			[req.params.id],
		);
		if (feedback.error) {
			return res.status(500).json({ error: feedback.error });
		}
		return res
			.status(200)
			.json({ msg: `Message id${req.params.id} read.` });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
