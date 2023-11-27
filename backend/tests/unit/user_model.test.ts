import * as chai from "chai";

const should = chai.should();
import { User } from "../../src/models/User";

describe("User model", () => {
	it("Test User class", (done) => {
		let user = new User({
			name: "name",
			email: "email@gmail.com",
			password: "pass",
		});

		user.name.should.be.equal("name");
		user.email.should.be.equal("email@gmail.com");
		user.password.should.be.equal("pass");
		user.meditation.should.be.an("array");
		user.meditation.length.should.be.equal(0);
		user.list.should.be.an("array");
		user.list.length.should.be.equal(0);
		user.money.should.be.equal(0);
		user.wheel.should.be.equal(0);
		user.role.should.be.equal("USER");
		done();
	});
});
