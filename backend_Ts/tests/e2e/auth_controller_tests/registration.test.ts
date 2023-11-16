import * as chai from "chai";
import { pool } from "../../../src/database/db";

// @ts-ignore
import * as chaiHttp from "chai-http";

chai.use(chaiHttp);
import { APIS } from "../../../src/config/API";

import { Port } from "../../../src/main";
const agent = chai.request.agent(`http://localhost:${Port}`);
const should = chai.should();
const assert = chai.assert;

describe("Auth | Register New User", () => {
	let email: string = "test_mocha@gmail.com";
	let name: string = "test_mocha";
	let password: string = "test_mocha";

	describe("Should gets success", () => {
		//Callback and Promise Mocha Test example
		it("Register new User", (done) => {
			//check that user doesn't exist
			const check_user1 = async () => {
				let User = await pool.query(
					`SELECT * FROM Users WHERE user_email = $1`,
					[email],
				);

				if (User.error) {
					done(Error(User.error));
				}

				if (User.rows.length > 0) {
					done(Error("This Email already used."));
				}

				//register User
				await agent
					.post(APIS.register)
					.send({
						name: name,
						email: email,
						password: password,
					})
					.end((err, res) => {
						res.should.have.status(200);
						res.body.msg.should.to.equal(
							`Success!<br> You can Sign In with your data.`,
						);

						//check that User registered
						const check_user = async () => {
							let NewUser = await pool.query(
								`SELECT * FROM Users WHERE user_email = $1`,
								[email],
							);

							if (NewUser.error) {
								done(Error(NewUser.error));
							}

							if (NewUser.rows.length !== 1) {
								done(Error("Unexpected Error"));
							}
							done();
						};
						check_user();
					});
			};
			check_user1();
		});
	});

	describe("Should gets errors", () => {
		it("Should return error 401, (Email already used)", (done) => {
			// Testing after User register in success test'
			agent
				.post(APIS.register)
				.send({
					name: name,
					email: email,
					password: password,
				})
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.have.property("error");
					res.body.error.should.to.equal("This Email already used.");
					delete_user();
				});

			// Delete User after Test
			const delete_user = async () => {
				let Delete = await pool.query(
					`DELETE FROM Users WHERE user_email = $1`,
					[email],
				);

				if (Delete.error) {
					done(Error(Delete.error));
				}
				done();
			};
		});

		it("Should return error 401, (invalid data sent)", (done) => {
			agent
				.post(APIS.register)
				.send({
					name: name,
					email: "Password is not a number",
					password: 10000,
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
				.post(APIS.register)
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
