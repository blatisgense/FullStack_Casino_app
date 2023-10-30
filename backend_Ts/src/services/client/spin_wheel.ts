import { pool } from "../../database/db";
import { random_product } from "../../config/random_product";
import { spin_algorithm } from "../../config/spin_algorithm";

export const spin_wheel = async (req, res) => {
	try {
		let user = req.user;
		if (Number(user.user_wheel) > 0) {
			// prize name
			let item_name: string;
			// getting the prize
			let prize: any = spin_algorithm();
			console.log(prize);

			switch (prize) {
				case "meditation":
					let prize_meditation = await random_product("meditation");
					if (prize_meditation.error) {
						return res.status(403).json({ error: prize_meditation.error });
					}
					// set prize name
					item_name = `${prize_meditation}`;

					// check if user already have this prize
					if (!user.user_meditation.includes(prize_meditation)) {
						let arr = [];
						arr.push(prize_meditation);
						user.user_meditation.map((el) => {
							arr.push(el);
						});
						//update data in Users database
						const update_data_meditation = await pool.query(
							`UPDATE Users SET (user_meditation, user_wheel) = ($1, $2) WHERE user_email = $3`,
							[arr, Number(user.user_wheel) - 1, user.user_email],
						);
						if (update_data_meditation.error) {
							return res
								.status(403)
								.json({ error: update_data_meditation.error });
						}
					} else {
						//update data in Users database
						const update_data_meditation = await pool.query(
							`UPDATE Users SET user_wheel = $1 WHERE user_email = $2`,
							[Number(user.user_wheel) - 1, user.user_email],
						);
						if (update_data_meditation.error) {
							return res
								.status(403)
								.json({ error: update_data_meditation.error });
						}
					}
					break;

				case "wheel":
					item_name = `wheel`;
					const update_data_wheel = await pool.query(
						`UPDATE Users SET user_wheel = $1 WHERE user_email = $2`,
						[Number(user.user_wheel) - 1, user.user_email],
					);
					if (update_data_wheel.error) {
						return res.status(403).json({ error: update_data_wheel.error });
					}
					break;

				case "list":
					let prize_list = await random_product("list");
					if (prize_list.error) {
						return res.status(403).json({ error: prize_list.error });
					}
					item_name = `${prize_list}`;
					if (!user.user_list.includes(prize_list)) {
						//update data in Users database
						let arr = [];
						arr.push(prize_list);
						user.user_list.map((el) => {
							arr.push(el);
						});
						const update_data_list = await pool.query(
							`UPDATE Users SET (user_list, user_wheel) = ($1, $2) WHERE user_email = $3`,
							[arr, Number(user.user_wheel) - 1, user.user_email],
						);
						if (update_data_list.error) {
							return res.status(403).json({ error: update_data_list.error });
						}
					} else {
						//update data in Users database
						const update_data_list = await pool.query(
							`UPDATE Users SET user_wheel = $1 WHERE user_email = $2`,
							[Number(user.user_wheel) - 1, user.user_email],
						);
						if (update_data_list.error) {
							return res.status(403).json({ error: update_data_list.error });
						}
					}

					break;

				case null:
					item_name = `no`;
					const update_data_null = await pool.query(
						`UPDATE Users SET user_wheel = $1 WHERE user_email = $2`,
						[Number(user.user_wheel) - 1, user.user_email],
					);
					if (update_data_null.error) {
						return res.status(403).json({ error: update_data_null.error });
					}
					break;

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
						return res.status(403).json({ error: update_data_money.error });
					}
					break;
			}

			//return msg
			return res.status(200).json({ item_name: item_name, prize: prize });
		} else {
			return res
				.status(403)
				.json({ error: "You haven't got any wheels for spin" });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
