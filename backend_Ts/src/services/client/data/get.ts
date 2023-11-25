import { Response } from "express";
import { Request_user } from "../../../config/types";
export const get = async (req: Request_user, res: Response) => {
	try {
		return res.status(200).json(req.user);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
