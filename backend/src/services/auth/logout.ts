import { Request, Response } from "express";
export const logout = (req: Request, res: Response) => {
	try {
		res.clearCookie("refresh_token", {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});
		res.clearCookie("access_token", {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});
		return res.status(200).json({ msg: "You have logout successfully." });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
