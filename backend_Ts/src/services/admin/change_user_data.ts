import { pool } from "../../database/db";

export const change_user_data = async (req, res) => {
	try {
		if (req.body.method === "id") {
			const users = await pool.query(`SELECT * FROM Users WHERE user_id = $1`, [
				req.body.identificator,
			]);
			if (users.rows.length === 0) {
				return res
					.status(401)
					.json({ error: "User not found, check the data." });
			}

			switch (req.body.type) {
				case "wheel":
					if (isNaN(Number(req.body.value))) {
						return res.status(402).json({ error: `Please type a number` });
					}
					const change_wheel = await pool.query(
						`UPDATE Users SET user_wheel = $1 WHERE user_id = $2`,
						[req.body.value, req.body.identificator],
					);
					if (change_wheel.error) {
						return res.status(500).json({ error: change_wheel.error });
					}
					return res
						.status(200)
						.json({ msg: `Wheels changed to  ${req.body.value}` });

				case "role":
					if (
						!(req.body.value.toUpperCase() === "ADMIN") &&
						!(req.body.value.toUpperCase() === "USER")
					) {
						return res.status(402).json({
							error: `Role should be USER or ADMIN`,
							req: req.body.value.toUpperCase(),
						});
					}
					const change_role = await pool.query(
						`UPDATE Users SET user_role = $1 WHERE user_id = $2`,
						[req.body.value.toUpperCase(), req.body.identificator],
					);
					if (change_role.error) {
						return res.status(500).json({ error: change_role.error });
					}
					return res
						.status(200)
						.json({ msg: `Role changed to ${req.body.value.toUpperCase()}` });

				case "money":
					if (isNaN(Number(req.body.value))) {
						return res.status(402).json({ error: `Please type a number` });
					}

					const change_money = await pool.query(
						`UPDATE Users SET user_money = $1 WHERE user_id = $2`,
						[req.body.value, req.body.identificator],
					);

					if (change_money.error) {
						return res.status(500).json({ error: change_money.error });
					}

					return res
						.status(200)
						.json({ msg: `Money changed to ${req.body.value}` });
			}
		}

		if (req.body.method === "email") {
			const users = await pool.query(
				`SELECT * FROM Users WHERE user_email = $1`,
				[req.body.identificator],
			);
			if (users.rows.length === 0) {
				return res
					.status(401)
					.json({ error: "User not found, check the data." });
			}

			switch (req.body.type) {
				case "wheel":
					if (isNaN(Number(req.body.value))) {
						return res.status(402).json({ error: `Please type a number` });
					}
					const change_wheel = await pool.query(
						`UPDATE Users SET user_wheel = $1 WHERE user_email = $2`,
						[req.body.value, req.body.identificator],
					);
					if (change_wheel.error) {
						return res.status(500).json({ error: change_wheel.error });
					}
					return res
						.status(200)
						.json({ msg: `Wheels changed to  ${req.body.value}` });

				case "role":
					if (
						!(req.body.value.toUpperCase() === "ADMIN") &&
						!(req.body.value.toUpperCase() === "USER")
					) {
						return res.status(402).json({
							error: `Role should be USER or ADMIN`,
							req: req.body.value.toUpperCase(),
						});
					}
					const change_role = await pool.query(
						`UPDATE Users SET user_role = $1 WHERE user_email = $2`,
						[req.body.value.toUpperCase(), req.body.identificator],
					);
					if (change_role.error) {
						return res.status(500).json({ error: change_role.error });
					}
					return res
						.status(200)
						.json({ msg: `Role changed to ${req.body.value.toUpperCase()}` });

				case "money":
					if (isNaN(Number(req.body.value))) {
						return res.status(402).json({ error: `Please type a number` });
					}
					const change_money = await pool.query(
						`UPDATE Users SET user_money = $1 WHERE user_email = $2`,
						[req.body.value, req.body.identificator],
					);
					if (change_money.error) {
						return res.status(500).json({ error: change_money.error });
					}
					return res
						.status(200)
						.json({ msg: `Money changed to ${req.body.value}` });
			}
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
