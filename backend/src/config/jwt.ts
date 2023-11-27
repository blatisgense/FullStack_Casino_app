import * as jwt from "jsonwebtoken";
import { User } from "./types";

const JWT_tokens = ({
	user_name,
	user_email,
	user_role,
	user_wheel,
	user_money,
	user_meditation,
	user_list,
}): {
	access_token: string;
	refresh_token: string;
} => {
	const user: User = {
		user_name,
		user_email,
		user_role,
		user_wheel,
		user_money,
		user_meditation,
		user_list,
	};
	const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "30m",
	});
	const refresh_token = jwt.sign(user, process.env.UPDATE_TOKEN_SECRET, {
		expiresIn: "36h",
	});
	return { access_token, refresh_token };
};
export { JWT_tokens };
