import { pool } from "../../../database/db";
import * as bcrypt from "bcrypt";
import { User } from "../../../models/User";
import { Request, Response } from "express";

export const users_add = async (req: Request, res: Response) => {
	try {
		if (!req.body.name || !req.body.email || !req.body.password) {
			return res.status(401).json({
				error: `Not enough parameters, check request.body.`,
			});
		}

		if (
			!(typeof req.body.name === "string") ||
			!(typeof req.body.email === "string") ||
			!(typeof req.body.password === "string")
		) {
			return res.status(401).json({
				error: `Invalid data sent, check request.body.`,
			});
		}

		const hashedPass: string = await bcrypt.hash(req.body.password, 6);

		let userTemplate: User = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPass,
		});

		const isAlreadyUse = await pool.query(
			`SELECT * FROM Users WHERE user_email = $1`,
			[userTemplate.email],
		);
		if (isAlreadyUse.rows.length > 0) {
			return res.status(401).json({
				error: "This Email already used.",
			});
		}

		const newUser = await pool.query(
			`INSERT INTO Users (user_name, user_email, user_password, user_role, user_wheel, user_money, user_meditation, user_list) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
			[
				userTemplate.name,
				userTemplate.email,
				userTemplate.password,
				userTemplate.role,
				userTemplate.wheel,
				userTemplate.money,
				userTemplate.meditation,
				userTemplate.list,
			],
		);
		if (newUser.error) {
			return res.status(500).json({ error: newUser.error });
		}

		return res.status(200).json({
			msg: `User ${req.body.name} created.`,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
