export const spin_algorithm = () => {
	let prize: string;
	let random: number = Math.floor(Math.random() * 101);
	switch (true) {
		case random <= 2:
			prize = "money";
			break;

		case 2 < random && random <= 10:
			prize = "wheel";
			break;

		case 10 < random && random <= 40:
			prize = "list";
			break;

		case 40 < random && random <= 70:
			prize = "meditation";
			break;

		case 70 < random && random <= 100:
			prize = null;
			break;
	}
	return prize;
};
