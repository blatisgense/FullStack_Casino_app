import { pool } from "../../../database/db";
import { random_product } from "../../../config/random_product";
import { spin_algorithm } from "../../../config/spin_algorithm";
import { Response } from "express";
import { Request_user } from "../../../config/types";

export const spin = async (req: Request_user, res: Response) => {
	try {
		let user = req.user;

		if (Number(user.user_wheel) <= 0) {
			return res.status(401).json({
				error: "You have not enough wheels for spin.",
			});
		}

		// prize name
		let item_name: string;
		// getting the prize
		let prize: string = spin_algorithm();

		async function return_data() {
			return res.status(200).json({
				item_name: item_name,
				prize: prize,
			});
		}

		if (prize === "wheel" || prize === "money" || prize === "nothing") {
			async function prize_fn({ name }: { name: string }) {
				item_name = name;
				let wheels: number;

				if (prize === "wheel") {
					wheels = Number(user.user_wheel) + 1;
				}

				if (prize === "nothing") {
					wheels = Number(user.user_wheel) - 1;
				}

				const update_data = await pool.query(
					`UPDATE Users SET user_wheel = $1 WHERE user_email = $2`,
					[wheels, user.user_email],
				);
				if (update_data.error) {
					return res.status(401).json({
						error: update_data.error,
					});
				}
				return await return_data();
			}

			switch (prize) {
				case "wheel":
					return await prize_fn({ name: "wheel" });
				case "nothing":
					return await prize_fn({ name: "nothing" });
				case "money":
					item_name = `money`;
					const update_data_money = await pool.query(
						`UPDATE Users SET (user_money, user_wheel) = ($1, $2) WHERE user_email = $3`,
						[
							Number(user.user_money) + 500,
							Number(user.user_wheel) - 1,
							user.user_email,
						],
					);
					if (update_data_money.error) {
						return res.status(401).json({
							error: update_data_money.error,
						});
					}
					return await return_data();
			}
		}

		if (prize === "list" || prize === "meditation") {
			async function prize_fn({
				name,
				arr,
				query,
			}: {
				name: string;
				arr: string[];
				query: string;
			}) {
				item_name = await random_product(name);
				let result = [...arr];
				if (!arr.includes(item_name)) {
					result.push(item_name);
				}

				const update_data = await pool.query(
					`UPDATE Users SET (${query}, user_wheel) = ($1, $2) WHERE user_email = $3`,
					[result, Number(user.user_wheel) - 1, user.user_email],
				);

				if (update_data.error) {
					return res.status(401).json({
						error: update_data.error,
					});
				}

				return await return_data();
			}

			switch (prize) {
				case "meditation":
					return await prize_fn({
						name: "meditation",
						arr: user.user_meditation,
						query: "user_meditation",
					});
				case "list":
					return await prize_fn({
						name: "list",
						arr: user.user_list,
						query: "user_list",
					});
			}
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
