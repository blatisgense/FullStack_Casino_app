import * as chai from "chai";

// @ts-ignore
import * as chaiHttp from "chai-http";

chai.use(chaiHttp);
import { APIS } from "../../../../../src/config/API";

import { Port } from "../../../../../src/main";
const agent = chai.request.agent(`http://localhost:${Port}`);
const should = chai.should();

import { config } from "../../../../test_config";
import { refresh } from "../../../../test_config";
import { access } from "../../../../test_config";

describe("Admin | Users | Change role", () => {
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

	it("Change role", (done) => {
		agent
			.patch(
				`${APIS.admin.users.change.role.url}/lavr.marudenko@gmail.com/ADMIN`,
			)
			.set("cookie", `access_token=${config.access_cookie}`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.msg.should.be.equal(
					"Role of lavr.marudenko@gmail.com changed to ADMIN",
				);
				done();
			});
	});
});
