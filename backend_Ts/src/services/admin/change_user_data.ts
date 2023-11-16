import { pool } from "../../database/db";
import { Request, Response } from "express";

export const change_user_data = async (req: Request, res: Response) => {
	try {
		if (
			!req.body.identificator ||
			!req.body.method ||
			!req.body.value ||
			!req.body.type
		) {
			return res.status(401).json({
				error: `Not enough parameters, check request.body.`,
			});
		}
		if (
			!(
				req.body.type === "money" ||
				req.body.type === "wheel" ||
				req.body.type === "role"
			)
		) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		if (
			(req.body.type === "money" || req.body.type === "wheel") &&
			isNaN(Number(req.body.value))
		) {
			return res.status(401).json({
				error: `Invalid data sent, value should be a Number.`,
			});
		}

		if (
			req.body.type === "role" &&
			req.body.value.toUpperCase() !== "ADMIN" &&
			req.body.value.toUpperCase() !== "USER"
		) {
			return res.status(401).json({
				error: `Role should be USER or ADMIN`,
			});
		}

		if (!(req.body.method === "email" || req.body.method === "id")) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		switch (req.body.method) {
			case "id":
				await change({ field: "user_id" });
				break;
			case "email":
				await change({ field: "user_email" });
				break;
		}

		async function change({ field }) {
			const users = await pool.query(
				`SELECT * FROM Users WHERE ${field} = $1`,
				[req.body.identificator],
			);
			if (users.rows.length === 0) {
				return res.status(401).json({
					error: "User not found, check the data.",
				});
			}

			switch (req.body.type) {
				case "wheel":
					await replace({ param: "user_wheel", msg: "Wheels" });
					break;
				case "role":
					await replace({ param: "user_role", msg: "Role" });
					break;
				case "money":
					await replace({ param: "user_money", msg: "Money" });
					break;
			}

			async function replace({ param, msg }) {
				const change_data = await pool.query(
					`UPDATE Users SET ${param} = $1 WHERE ${field} = $2`,
					[req.body.value, req.body.identificator],
				);

				if (change_data.error) {
					return res.status(500).json({
						error: change_data.error,
					});
				}

				return res.status(200).json({
					msg: `${msg} changed to ${req.body.value}`,
				});
			}
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
