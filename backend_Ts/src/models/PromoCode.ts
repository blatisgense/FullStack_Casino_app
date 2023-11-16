export class Promo {
	promo: string;
	wheel: number;
	money: number;
	meditation: string[];
	list: string[];
	constructor({ promo }: { promo: string }) {
		this.promo = promo;
		this.wheel = 0;
		this.money = 0;
		this.meditation = [];
		this.list = [];
	}
}
