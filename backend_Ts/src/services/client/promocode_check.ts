import { Request, Response } from "express";
import { pool } from "../../database/db";
import { Request_user } from "../../config/types";

export const promocode_check = async (req: Request_user, res: Response) => {
	try {
		if (!req.body.promocode) {
			return res.status(401).json({
				error: "Not enough data sent.",
			});
		}

		//variables
		const promocode = req.body.promocode;
		const user = req.user;
		let code = await pool.query(
			`SELECT * FROM PromoCodes WHERE promo = $1`,
			[promocode],
		);

		// error
		if (code.error) {
			return res.status(401).json({
				error: code.error,
			});
		}

		if (code.rows.length === 0) {
			return res.status(401).json({
				error: "Promocode not found.",
			});
		}

		//collect newData and returning msg
		code = await code.rows[0];
		let newData: {
			wheel: number;
			list: string[];
			meditation: string[];
			money: number;
		} = {
			wheel: user.user_wheel,
			list: [...user.user_list],
			meditation: [...user.user_meditation],
			money: user.user_money,
		};

		let msg = `You've got: <br>`;

		if (code.promo_wheel > 0) {
			newData.wheel = Number(newData.wheel) + Number(code.promo_wheel);
			msg += `Wheels: ${Number(code.promo_wheel)} <br>`;
		}

		if (code.promo_money > 0) {
			newData.money = Number(newData.money) + Number(code.promo_money);
			msg += `Money: ${Number(code.promo_money)} <br>`;
		}

		if (code.promo_list.length > 0) {
			msg += `Check lists: `;
			for (let i = 0; i < code.promo_list.length; i++) {
				msg += `${code.promo_list[i]}, `;
				if (!newData.list.includes(code.promo_list[i])) {
					newData.list.push(code.promo_list[i]);
				}
			}
			msg += `<br> `;
		}
		if (code.promo_meditation.length > 0) {
			msg += `Meditation: `;
			for (let i = 0; i < code.promo_meditation.length; i++) {
				msg += `${code.promo_meditation[i]}, `;
				if (!newData.meditation.includes(code.promo_meditation[i])) {
					newData.meditation.push(code.promo_meditation[i]);
				}
			}
		}

		//update data in Users database
		const update_data = await pool.query(
			`UPDATE Users SET (user_list, user_meditation, user_wheel, user_money) = ($1, $2, $3, $4) WHERE user_email = $5`,
			[
				newData.list,
				newData.meditation,
				newData.wheel,
				newData.money,
				user.user_email,
			],
		);
		if (update_data.error) {
			return res.status(401).json({ error: update_data.error });
		}

		//delete promo after use
		let delete_promo = await pool.query(
			`DELETE FROM PromoCodes WHERE promo = $1`,
			[promocode],
		);
		if (delete_promo.error) {
			console.log(delete_promo.error);
		}

		//return msg
		return res.status(200).json({ msg: msg });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
