import { pool } from "../database/db";

export const random_product = async (product_type: string) => {
	try {
		let arr = await pool.query(`SELECT * FROM Products;`);
		if (arr.error) {
			return arr.error;
		}
		arr = await arr.rows[0];

		function product(arr) {
			let random = Math.floor(Math.random() * arr.length);
			return arr[random];
		}

		if (product_type === "meditation") {
			return product(arr.products_meditation);
		}

		if (product_type === "list") {
			return product(arr.products_list);
		}
	} catch (error) {
		return error;
	}
};
