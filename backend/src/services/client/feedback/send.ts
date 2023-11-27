import { Response } from "express";
import { pool } from "../../../database/db";
import { Request_user } from "../../../config/types";

export const send = async (req: Request_user, res: Response) => {
	try {
		if (!req.body.msg || !req.body.name) {
			return res.status(401).json({
				error: "Invalid data data sent.",
			});
		}

		let email: string = req.user.user_email;
		let msg: string = req.body.msg;
		let name: string = req.body.name;

		const save = await pool.query(
			`INSERT INTO Feedback (msg, sender_name, sender_email, status) VALUES ($1, $2, $3, $4)`,
			[msg, name, email, "unread"],
		);
		return res.status(200).json({
			msg: "Massage sent successfully, you'll receive feedback by Email.",
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
