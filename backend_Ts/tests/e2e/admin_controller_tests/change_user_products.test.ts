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

describe("Admin | Change User products", () => {
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
		it("Add products (via ID)", (done) => {
			agent
				.post(APIS.change_user_products)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					identificator: "9e30b7de-906c-46ed-8973-a8d094b94d11",
					method: "id",
					value: "test",
					type: "meditation",
					move: "add",
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.msg.should.to.equal(
						"Item test added successfully.",
					);
				});
			agent
				.post(APIS.change_user_products)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					identificator: "9e30b7de-906c-46ed-8973-a8d094b94d11",
					method: "id",
					value: "test",
					type: "list",
					move: "add",
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.msg.should.to.equal(
						"Item test added successfully.",
					);
					done();
				});
		});

		it("Delete products (via Email)", (done) => {
			agent
				.post(APIS.change_user_products)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					identificator: "lavr.marudenko@gmail.com",
					method: "email",
					value: "test",
					type: "meditation",
					move: "delete",
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.msg.should.to.equal(
						"Item test deleted successfully.",
					);
				});
			agent
				.post(APIS.change_user_products)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					identificator: "lavr.marudenko@gmail.com",
					method: "email",
					value: "test",
					type: "list",
					move: "delete",
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.msg.should.to.equal(
						"Item test deleted successfully.",
					);
					done();
				});
		});
	});

	describe("Should gets errors", () => {
		it("Should return error 401, (invalid data sent)", (done) => {
			agent
				.post(APIS.change_user_products)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					identificator: "9e30b7de-906c-46ed-8973-a8d094b94d11",
					method: "wrong",
					value: "test",
					type: "meditation",
					move: "add",
				})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"Invalid data sent, check request.body.",
					);
				});
			agent
				.post(APIS.change_user_products)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					identificator: "9e30b7de-906c-46ed-8973-a8d094b94d11",
					method: "id",
					value: "test",
					type: "wrong",
					move: "add",
				})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"Invalid data sent, check request.body.",
					);
				});
			agent
				.post(APIS.change_user_products)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					identificator: "9e30b7de-906c-46ed-8973-a8d094b94d11",
					method: "id",
					value: "test",
					type: "meditation",
					move: "wrong",
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
				.post(APIS.change_user_products)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({ data: "a" })
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"Not enough parameters, check request.body.",
					);
					done();
				});
		});

		it("Should return error 401, User ID wrong", (done) => {
			agent
				.post(APIS.change_user_products)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					identificator: "9e30b7de-906c-46ed-8973-a8d423b94d11",
					method: "id",
					value: "test",
					type: "meditation",
					move: "add",
				})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"User not found, check the data.",
					);
					done();
				});
		});

		it("Should return error 401, User Email wrong", (done) => {
			agent
				.post(APIS.change_user_products)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					identificator: "wrong@email.com",
					method: "email",
					value: "test",
					type: "meditation",
					move: "delete",
				})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"User not found, check the data.",
					);
					done();
				});
		});
	});
});
