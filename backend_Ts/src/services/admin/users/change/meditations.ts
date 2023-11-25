import { pool } from "../../../../database/db";
import { Request, Response } from "express";

export const users_change_meditations = async (req: Request, res: Response) => {
	try {
		if (!req.params.email || !req.params.value || !req.params.method) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		if (req.params.method != "delete" && req.params.method != "add") {
			return res.status(401).json({
				error: `Invalid data sent, method should be delete || add.`,
			});
		}

		let move: string;
		let msg: string;

		switch (req.params.method) {
			case "delete":
				move = "ARRAY_REMOVE";
				msg = "deleted";
				break;
			case "add":
				move = "ARRAY_APPEND";
				msg = "added";
				break;
		}

		const query = await pool.query(
			`UPDATE Users SET user_meditation = ${move}(user_meditation, $1) WHERE user_email = $2`,
			[req.params.value, req.params.email],
		);

		if (query.error) {
			return res.status(500).json({
				error: query.error,
			});
		}

		return res.status(200).json({
			msg: `Meditation ${req.params.value} ${msg} successfully.`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
