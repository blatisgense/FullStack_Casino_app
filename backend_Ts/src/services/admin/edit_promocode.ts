import { pool } from "../../database/db";
import { Promo } from "../../models/PromoCode";
import { Request, Response } from "express";

export const edit_promocode = async (req: Request, res: Response) => {
	try {
		if (!req.body.method || !req.body.promo) {
			return res.status(401).json({
				error: `Not enough parameters, check request.body.`,
			});
		}

		if (!(req.body.method === "delete" || req.body.method === "add")) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		if (req.body.method === "delete") {
			const delete_promo = await pool.query(
				`DELETE FROM PromoCodes WHERE promo = $1`,
				[req.body.promo],
			);
			if (delete_promo.error) {
				return res.status(500).json({ error: delete_promo.error });
			}
			return res.status(200).json({
				msg: `Promocode ${req.body.promo} deleted successfully.`,
			});
		}

		if (!req.body.give || !req.body.value) {
			return res.status(401).json({
				error: `Not enough parameters, check request.body.`,
			});
		}

		if (
			!(
				req.body.give === "money" ||
				req.body.give === "wheel" ||
				req.body.give === "meditation" ||
				req.body.give === "list"
			)
		) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		if (
			(req.body.give === "money" || req.body.give === "wheel") &&
			isNaN(Number(req.body.value))
		) {
			return res.status(401).json({
				error: `Invalid data sent, value should be a Number.`,
			});
		}

		if (req.body.method === "add") {
			const isAlreadyUse = await pool.query(
				`SELECT * FROM PromoCodes WHERE promo = $1`,
				[req.body.promo],
			);
			if (isAlreadyUse.rows.length > 0) {
				return res.status(401).json({
					error: "This Promo already exist.",
				});
			}

			let promoTemplate: Promo = new Promo({
				promo: req.body.promo,
			});

			switch (req.body.give) {
				case "wheel":
					promoTemplate.wheel = Number(req.body.value);
					break;
				case "money":
					promoTemplate.money = Number(req.body.value);
					break;
				case "meditation":
					promoTemplate.meditation.push(req.body.value);
					break;
				case "list":
					promoTemplate.list.push(req.body.value);
					break;
			}

			const newPromo = await pool.query(
				`INSERT INTO PromoCodes (promo, promo_wheel, promo_money, promo_meditation, promo_list) VALUES ($1, $2, $3, $4, $5)`,
				[
					promoTemplate.promo,
					promoTemplate.wheel,
					promoTemplate.money,
					promoTemplate.meditation,
					promoTemplate.list,
				],
			);
			if (newPromo.error) {
				return res.status(500).json({ error: newPromo.error });
			}
			res.status(200).json({
				msg: `Promocode ${req.body.promo} created successfully.`,
			});
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
