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

describe("Middleware | Role", () => {
	describe("Should gets success", () => {
		it("Login to Admin account", (done) => {
			agent
				.post(APIS.auth.login.url)
				.send({
					email: "lavr.marudenko@gmail.com",
					password: "123456",
				})
				.end(async (err, res) => {
					res.should.have.status(200);
					res.should.have.cookie("access_token");
					config.admin = res.headers["set-cookie"][1]
						.match(access)[0]
						.split("=")[1];

					await agent
						.get(
							`${APIS.admin.users.get.one.url}/lavr.marudenko@gmail.com`,
						)
						.set("cookie", `access_token=${config.admin}`)
						.end((err, res) => {
							res.should.have.status(200);
							res.body.user_email.should.be.equal(
								"lavr.marudenko@gmail.com",
							);
						});
					done();
				});
		});
	});

	describe("Should gets errors", () => {
		it("Login to User account", (done) => {
			agent
				.post(APIS.auth.login.url)
				.send({
					email: "test@gmail.com",
					password: "123456",
				})
				.end(async (err, res) => {
					res.should.have.status(200);
					res.should.have.cookie("access_token");
					config.user = res.headers["set-cookie"][1]
						.match(access)[0]
						.split("=")[1];

					await agent
						.get(
							`${APIS.admin.users.get.one.url}/lavr.marudenko@gmail.com`,
						)
						.set("cookie", `access_token=${config.user}`)
						.end((err, res) => {
							res.should.have.status(403);
							res.body.error.should.be.equal(
								"User have not access.",
							);
						});
					done();
				});
		});
	});
});
