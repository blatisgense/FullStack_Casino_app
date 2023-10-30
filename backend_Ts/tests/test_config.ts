//cookies for auth in tests
export let config: {
	access_cookie: string;
	refresh_cookie: string;
} = {
	access_cookie: "",
	refresh_cookie: "",
};


//RegExps for extract cookie value from Headers
export const refresh: RegExp = new RegExp(
	"(refresh_token=)([.|\\w-]+)(?=;)",
	"g",
);
export const access: RegExp = new RegExp(
	"(access_token=)([.|\\w-]+)(?=;)",
	"g",
);
