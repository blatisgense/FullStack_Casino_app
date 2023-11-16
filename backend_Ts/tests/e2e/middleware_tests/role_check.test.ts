import * as chai from "chai";

// @ts-ignore
import * as chaiHttp from "chai-http";

chai.use(chaiHttp);
import { APIS } from "../../../src/config/API";

import { Port } from "../../../src/main";
const agent = chai.request.agent(`http://localhost:${Port}`);
const should = chai.should();

let config: { admin: string; user: string } = {
	admin: "",
	user: "",
};

import { access } from "../../test_config";

describe("Middleware | Role checking", () => {
	beforeEach(async () => {
		//get auth token
		let admin = await agent.post(APIS.login).send({
			email: "lavr.marudenko@gmail.com",
			password: "123456",
		});
		admin.should.have.status(200);
		admin.should.have.cookie("access_token");
		config.admin = admin.headers["set-cookie"][1]
			.match(access)[0]
			.split("=")[1];

		let user = await agent.post(APIS.login).send({
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
		it("Login to Admin account", (done) => {
			agent
				.post(APIS.get_users)
				.set("cookie", `access_token=${config.admin}`)
				.send({
					all: "true",
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.res.should.be.an("array");
					done();
				});
		});
	});

	describe("Should gets errors", () => {
		it("Login to User account", (done) => {
			agent
				.post(APIS.get_users)
				.set("cookie", `access_token=${config.user}`)
				.send({
					all: "true",
				})
				.end((err, res) => {
					res.should.have.status(403);
					res.body.error.should.be.equal("User have not access.");
					done();
				});
		});
	});
});
