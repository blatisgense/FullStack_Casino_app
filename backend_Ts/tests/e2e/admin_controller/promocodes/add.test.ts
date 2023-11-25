import * as chai from "chai";

// @ts-ignore
import * as chaiHttp from "chai-http";

chai.use(chaiHttp);
import { APIS } from "../../../../src/config/API";

import { Port } from "../../../../src/main";
const agent = chai.request.agent(`http://localhost:${Port}`);
const should = chai.should();

import { config } from "../../../test_config";
import { refresh } from "../../../test_config";
import { access } from "../../../test_config";

describe("Admin | Promocodes | Add promocode", () => {
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

	it("Add promocode", (done) => {
		agent
			.put(`${APIS.admin.promocode.add.url}`)
			.set("cookie", `access_token=${config.access_cookie}`)
			.send({
				promo: "TestMocha",
				value: 1000,
				give: "money",
			})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.msg.should.be.equal(
					"Promocode TestMocha created successfully.",
				);
				done();
			});
	});
});
