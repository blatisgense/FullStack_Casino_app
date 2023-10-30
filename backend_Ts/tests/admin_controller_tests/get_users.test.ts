import * as chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
import { APIS } from "../../src/config/API";

const agent = chai.request.agent(`http://localhost:${Port}`);
const should = chai.should();

import { config } from "../test_config";
import { refresh } from "../test_config";
import { access } from "../test_config";
import { Port } from "../../src/main";

describe("Admin | Get users tests", () => {
	beforeEach(async () => {
		//get auth token
		let response = await agent
			.post(APIS.login)
			.send({ email: "lavr.marudenko@gmail.com", password: "123456" });
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
		it("It should return all users", (done) => {
			agent
				.post(APIS.get_users)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({ all: "true" })
				.end((err, res) => {
					console.log(res.body);
					res.should.have.status(200);
					res.body.res.should.be.an("array");
					done();
				});
		}).timeout(10000);

		it("It should return one user, by email", (done) => {
			agent
				.post(APIS.get_users)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({ identificator: "lavr.marudenko@gmail.com", method: "email" })
				.end((err, res) => {
					console.log(res.body);
					res.should.have.status(200);
					res.body.should.be.an("object");
					res.body.should.have.property("user_id");
					res.body.should.have.property("user_email");
					res.body.should.have.property("user_name");
					done();
				});
		}).timeout(10000);

		it("It should return one user, by ID", (done) => {
			agent
				.post(APIS.get_users)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					identificator: "9e30b7de-906c-46ed-8973-a8d094b94d11",
					method: "id",
				})
				.end((err, res) => {
					console.log(res.body);
					res.should.have.status(200);
					res.body.should.be.an("object");
					res.body.should.have.property("user_id");
					res.body.should.have.property("user_email");
					res.body.should.have.property("user_name");
					done();
				});
		}).timeout(10000);
	});

	describe("Should gets errors", () => {
		it("Should return error 406, (no data sent)", (done) => {
			agent
				.post(APIS.get_users)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({})
				.end((err, res) => {
					console.log(res.body);
					res.should.have.status(406);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"Not enough data sent, check request.body.",
					);
					done();
				});
		}).timeout(10000);

		it("Should return error 405, (invalid data sent)", (done) => {
			agent
				.post(APIS.get_users)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({ identificator: "a", method: "a" })
				.end((err, res) => {
					console.log(res.body);
					res.should.have.status(405);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"Invalid data sent, check request.body.",
					);
					done();
				});
		}).timeout(10000);

		it("Should return error 401, wrong ID", (done) => {
			agent
				.post(APIS.get_users)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({
					identificator: "9e30b7de-906c-46ed-8973-a8d094b94df1",
					method: "id",
				})
				.end((err, res) => {
					console.log(res.body);
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal("User not found, check entered ID.");
					done();
				});
		}).timeout(10000);

		it("Should return error 401, wrong Email", (done) => {
			agent
				.post(APIS.get_users)
				.set("cookie", `access_token=${config.access_cookie}`)
				.send({ identificator: "lavr.mmmm@gmail.com", method: "email" })
				.end((err, res) => {
					console.log(res.body);
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal(
						"User not found, check entered Email.",
					);
					done();
				});
		}).timeout(10000);
	});
});
