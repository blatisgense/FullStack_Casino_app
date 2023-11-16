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

describe("Admin | Edit Products", () => {
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
		it("Add product", (done) => {
			agent
				.post(APIS.products_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					method: "add",
					value: "TEST_MOCHA",
					type: "meditation",
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.msg.should.to.equal(
						"Item TEST_MOCHA added successfully.",
					);
				});
			agent
				.post(APIS.products_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					method: "add",
					value: "TEST_MOCHA",
					type: "list",
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.msg.should.to.equal(
						"Item TEST_MOCHA added successfully.",
					);
					done();
				});
		});

		it("Delete product", (done) => {
			agent
				.post(APIS.products_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					method: "delete",
					value: "TEST_MOCHA",
					type: "meditation",
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.msg.should.to.equal(
						"Item TEST_MOCHA deleted successfully.",
					);
				});

			agent
				.post(APIS.products_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					method: "delete",
					value: "TEST_MOCHA",
					type: "list",
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.msg.should.to.equal(
						"Item TEST_MOCHA deleted successfully.",
					);
					done();
				});
		});
	});

	describe("Should gets errors", () => {
		it("Should return error 401, (invalid data sent)", (done) => {
			agent
				.post(APIS.products_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					method: "wrong",
					value: "TEST_MOCHA",
					type: "meditation",
				})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"Invalid data sent, check request.body.",
					);
				});
			agent
				.post(APIS.products_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					method: "add",
					value: "TEST_MOCHA",
					type: "wrong",
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

		it("Should return error 401, (Not enough parameters)", (done) => {
			agent
				.post(APIS.products_edit)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"Not enough parameters, check request.body.",
					);
					done();
				});
		});
	});
});
