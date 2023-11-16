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

describe("Auth | Refresh tokens", () => {
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
		it("Refresh tokens", (done) => {
			agent
				.get(APIS.refresh_token)
				.set("cookie", `refresh_token=${config.refresh_cookie}`)
				.end((err, res) => {
					res.should.have.cookie("access_token");
					res.should.have.cookie("refresh_token");
					res.should.have.status(200);
					res.body.msg.should.be.equal("Tokens updated.");
					done();
				});
		});
	});

	describe("Should gets errors", () => {
		it("Should return error 403, (TOKEN not found)", (done) => {
			// We dont set the tokens in cookies
			agent.get(APIS.refresh_token).end((err, res) => {
				res.should.have.status(403);
				res.body.should.have.property("error");
				res.body.error.should.to.equal("jwt must be provided");
				done();
			});
		});

		it("Should return error 403, (TOKEN replaced)", (done) => {
			agent
				.get(APIS.refresh_token)
				// Setting fake token
				.set("cookie", `refresh_token=fake_token`)
				.end((err, res) => {
					res.should.have.status(403);
					res.body.should.have.property("error");
					done();
				});
		});
	});
});
