import { pool } from "../../database/db";
import { Request, Response } from "express";

export const edit_products = async (req: Request, res: Response) => {
	try {
		if (!req.body.method || !req.body.value || !req.body.type) {
			return res.status(401).json({
				error: `Not enough parameters, check request.body.`,
			});
		}
		if (!(req.body.method === "delete" || req.body.method === "add")) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}
		if (!(req.body.type === "meditation" || req.body.type === "list")) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		switch (req.body.type) {
			case "meditation":
				return await product({ type: "products_meditation" });
			case "list":
				return await product({ type: "products_list" });
		}

		async function product({ type }) {
			let move: string;
			let msg: string;

			switch (req.body.method) {
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
				`UPDATE Products SET ${type} = ${move}(${type}, $1)`,
				[req.body.value],
			);
			if (products.error) {
				return res.status(401).json({ error: products.error });
			}

			return res.status(200).json({
				msg: `Item ${req.body.value} ${msg} successfully.`,
			});
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
