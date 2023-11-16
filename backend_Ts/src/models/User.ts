export class User {
	name: string;
	email: string;
	password: string;
	role: string;
	wheel: number;
	money: number;
	meditation: string[];
	list: string[];
	constructor({
		name,
		email,
		password,
	}: {
		name: string;
		email: string;
		password: string;
	}) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.role = "USER";
		this.wheel = 0;
		this.money = 0;
		this.meditation = [];
		this.list = [];
	}
}
