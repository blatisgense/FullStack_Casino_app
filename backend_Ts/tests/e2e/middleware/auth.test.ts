import * as chai from "chai";

// @ts-ignore
import * as chaiHttp from "chai-http";

chai.use(chaiHttp);
import { APIS } from "../../../src/config/API";

import { Port } from "../../../src/main";
const agent = chai.request.agent(`http://localhost:${Port}`);
const should = chai.should();

import { config } from "../../test_config";
import { refresh } from "../../test_config";
import { access } from "../../test_config";

describe("Middleware | Auth", () => {
	beforeEach(async () => {
		//get auth token
		let response = await agent.post(APIS.auth.login.url).send({
			email: "lavr.marudenko@gmail.com",
			password: "123456",
		});
		response.should.have.status(200);
		response.should.have.cookie("access_token");
		response.should.have.cookie("refresh_token");
		config.refresh_cookie = response.headers["set-cookie"][0]
			.match(refresh)[0]
			.split("=")[1];
		config.access_cookie = response.headers["set-cookie"][1]
			.match(access)[0]
			.split("=")[1];
	});

	describe("Should gets success", () => {
		it("Set only access valid token", (done) => {
			agent
				.get(APIS.client.data.get.url)
				.set("cookie", `access_token=${config.access_cookie}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.user_email.should.be.equal(
						"lavr.marudenko@gmail.com",
					);
					done();
				});
		});

		it("Set only refresh valid token", (done) => {
			agent
				.get(APIS.client.data.get.url)
				.set("cookie", `refresh_token=${config.refresh_cookie}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.user_email.should.be.equal(
						"lavr.marudenko@gmail.com",
					);
					done();
				});
		});

		it("Set valid refresh token, invalid access", (done) => {
			agent
				.get(APIS.client.data.get.url)
				.set("cookie", `access_token=invalid`)
				.set("cookie", `refresh_token=${config.refresh_cookie}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.user_email.should.be.equal(
						"lavr.marudenko@gmail.com",
					);
					done();
				});
		});
	});

	describe("Should gets errors", () => {
		it("Set no tokens", (done) => {
			agent.get(APIS.client.data.get.url).end((err, res) => {
				res.should.have.status(403);
				res.body.error.should.be.equal(
					"You're tokens expired or replaced, please authorize again!",
				);
				done();
			});
		});

		it("Set both invalid tokens", (done) => {
			agent
				.get(APIS.client.data.get.url)
				.set("cookie", `refresh_token=invalid`)
				.set("cookie", `access_token=invalid`)
				.end((err, res) => {
					res.should.have.status(403);
					res.body.error.should.be.equal(
						"You're tokens expired or replaced, please authorize again!",
					);
					done();
				});
		});

		it("Set only invalid refresh token", (done) => {
			agent
				.get(APIS.client.data.get.url)
				.set("cookie", `refresh_token=invalid`)
				.end((err, res) => {
					res.should.have.status(403);
					res.body.error.should.be.equal(
						"You're tokens expired or replaced, please authorize again!",
					);
					done();
				});
		});

		it("Set only invalid access token", (done) => {
			agent
				.get(APIS.client.data.get.url)
				.set("cookie", `access_token=invalid`)
				.end((err, res) => {
					res.should.have.status(403);
					res.body.error.should.be.equal(
						"You're tokens expired or replaced, please authorize again!",
					);
					done();
				});
		});
	});
});
