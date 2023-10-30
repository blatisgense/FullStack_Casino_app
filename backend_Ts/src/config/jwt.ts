import * as jwt from "jsonwebtoken";

interface User {
	user_name: string;
	user_email: string;
	user_role: string;
	user_wheel: number;
	user_money: number;
	user_meditation: string[];
	user_list: string[];
}

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
