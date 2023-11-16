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

describe("Admin | Edit Promocode", () => {
	beforeEach(async () => {
		//get auth token
		let response = await agent.post(APIS.login).send({
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
		it("Delete promocode", (done) => {
			agent
				.post(APIS.promo_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					method: "delete",
					promo: "TEST_MOCHA",
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.msg.should.to.equal(
						"Promocode TEST_MOCHA deleted successfully.",
					);
					done();
				});
		});

		it("Create promocode", (done) => {
			agent
				.post(APIS.promo_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					give: "wheel",
					method: "add",
					value: 10,
					promo: "TEST_MOCHA",
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.msg.should.to.equal(
						"Promocode TEST_MOCHA created successfully.",
					);
					done();
				});
		});
	});

	describe("Should gets errors", () => {
		it("Should return error 401, (invalid data sent)", (done) => {
			agent
				.post(APIS.promo_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					give: "wheel",
					method: "wrong",
					value: 10,
					promo: "TEST_MOCHA",
				})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"Invalid data sent, check request.body.",
					);
				});
			agent
				.post(APIS.promo_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					give: "wrong",
					method: "add",
					value: 10,
					promo: "TEST_MOCHA",
				})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"Invalid data sent, check request.body.",
					);
					done();
				});
		});

		it("Should return error 401, (value should be a Number)", (done) => {
			agent
				.post(APIS.promo_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					give: "money",
					method: "add",
					value: "NAN",
					promo: "TEST_MOCHA",
				})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"Invalid data sent, value should be a Number.",
					);
				});
			agent
				.post(APIS.promo_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					give: "wheel",
					method: "add",
					value: "NAN",
					promo: "TEST_MOCHA",
				})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"Invalid data sent, value should be a Number.",
					);
					done();
				});
		});

		it("Should return error 401, (Not enough parameters)", (done) => {
			agent
				.post(APIS.promo_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					promo: "TEST_MOCHA",
				})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"Not enough parameters, check request.body.",
					);
				});
			agent
				.post(APIS.promo_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					give: "wheel",
					method: "add",
					promo: "TEST_MOCHA",
				})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"Not enough parameters, check request.body.",
					);
					done();
				});
		});

		it("Should return error 401, (Promo already exist)", (done) => {
			agent
				.post(APIS.promo_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					give: "wheel",
					method: "add",
					value: 10,
					promo: "TEST_MOCHA",
				})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal("This Promo already exist.");
					done();
				});
		});
	});
});
