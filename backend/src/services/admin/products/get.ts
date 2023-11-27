import { pool } from "../../../database/db";
import { Request, Response } from "express";

export const products_get_all = async (req: Request, res: Response) => {
	try {
		const products = await pool.query(`SELECT * FROM Products;`);
		if (products.error) {
			return res.status(500).json({ error: products.error });
		}
		return res.status(200).json({ res: products.rows[0] });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
