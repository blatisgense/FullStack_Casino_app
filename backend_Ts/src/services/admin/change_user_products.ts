import { pool } from "../../database/db";
import { Request, Response } from "express";

export const change_user_products = async (req: Request, res: Response) => {
	try {
		if (
			!req.body.identificator ||
			!req.body.method ||
			!req.body.value ||
			!req.body.type ||
			!req.body.move
		) {
			return res.status(401).json({
				error: `Not enough parameters, check request.body.`,
			});
		}
		if (!(req.body.move === "delete" || req.body.move === "add")) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}
		if (!(req.body.type === "meditation" || req.body.type === "list")) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}
		if (!(req.body.method === "email" || req.body.method === "id")) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}
		switch (req.body.method) {
			case "id":
				return await change({ field: "user_id" });
			case "email":
				return await change({ field: "user_email" });
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
				case "meditation":
					return await product({ type: "user_meditation" });
				case "list":
					return await product({ type: "user_list" });
			}
			async function product({ type }) {
				let move: string;
				let msg: string;

				switch (req.body.move) {
					case "delete":
						move = "ARRAY_REMOVE";
						msg = "deleted";
						break;
					case "add":
						move = "ARRAY_APPEND";
						msg = "added";
						break;
				}

				const products = await pool.query(
					`UPDATE Users SET ${type} = ${move}(${type}, $1) WHERE ${field} = $2`,
					[req.body.value, req.body.identificator],
				);

				if (products.error) {
					return res.status(401).json({ error: products.error });
				}

				return res.status(200).json({
					msg: `Item ${req.body.value} ${msg} successfully.`,
				});
			}
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};
