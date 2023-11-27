import * as chai from "chai";

// @ts-ignore
import * as chaiHttp from "chai-http";

chai.use(chaiHttp);
import { APIS } from "../../../../src/config/API";

import { Port } from "../../../../src/main";
const agent = chai.request.agent(`http://localhost:${Port}`);
const should = chai.should();

let config: { admin: string; user: string } = {
	//account with wheels
	admin: "",
	//account without wheels
	user: "",
};

import { access } from "../../../test_config";

describe("Client | Spin wheel", () => {
	beforeEach(async () => {
		//get auth token
		let admin = await agent.post(APIS.auth.login.url).send({
			email: "lavr.marudenko@gmail.com",
			password: "123456",
		});
		admin.should.have.status(200);
		admin.should.have.cookie("access_token");
		config.admin = admin.headers["set-cookie"][1]
			.match(access)[0]
			.split("=")[1];

		let user = await agent.post(APIS.auth.login.url).send({
			email: "test@gmail.com",
			password: "123456",
		});
		user.should.have.status(200);
		user.should.have.cookie("access_token");
		config.user = user.headers["set-cookie"][1]
			.match(access)[0]
			.split("=")[1];
	});

	describe("Should gets success", () => {
		it("Successfully spin wheel", (done) => {
			agent
				.get(APIS.client.wheel.spin.url)
				.set("cookie", `access_token=${config.admin}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.an("object");
					res.body.should.have.property("prize");
					done();
				});
		});
	});

	describe("Should gets error", () => {
		it("Not enough wheels", (done) => {
			agent
				.get(APIS.client.wheel.spin.url)
				.set("cookie", `access_token=${config.user}`)
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.be.equal(
						"You have not enough wheels for spin.",
					);
					done();
				});
		});
	});
});
