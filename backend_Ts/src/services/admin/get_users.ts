import { pool } from "../../database/db";
import { Request, Response } from "express";

export const get_users = async (req: Request, res: Response) => {
	try {
		if (
			Object.keys(req.body).length === 0 ||
			(req.body.all == null &&
				(req.body.identificator == null || req.body.method == null))
		) {
			return res.status(401).json({
				error: `Not enough data sent, check request.body.`,
			});
		}

		//if we want to get all users
		if (req.body.all === "true") {
			const users = await pool.query(`SELECT * FROM Users;`);
			if (users.error) {
				return res.status(401).json({ error: users.error });
			}
			return res.status(200).json({ res: users.rows });
		}

		// //if one
		async function get(field: string, msg: string) {
			const users = await pool.query(
				`SELECT * FROM Users WHERE ${field} = $1`,
				[req.body.identificator],
			);
			if (users.error) {
				return res.status(401).json({ error: users.error });
			}
			if (users.rows.length === 0) {
				return res.status(401).json({
					error: `User not found, check entered ${msg}.`,
				});
			}
			return res.status(200).json(users.rows[0]);
		}

		if (req.body.method === "id") {
			await get("user_id", "ID");
			return;
		}

		if (req.body.method === "email") {
			await get("user_email", "Email");
			return;
		}

		return res.status(401).json({
			error: `Invalid data sent, check request.body.`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
