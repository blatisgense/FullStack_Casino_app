import * as chai from "chai";

const should = chai.should();
import { Promo } from "../../src/models/PromoCode";

describe("Promocode model", () => {
	it("Test Promocode class", (done) => {
		let promo = new Promo({
			promo: "test",
		});

		promo.promo.should.be.equal("test");
		promo.money.should.be.equal(0);
		promo.wheel.should.be.equal(0);
		promo.meditation.should.be.an("array");
		promo.meditation.length.should.be.equal(0);
		promo.list.should.be.an("array");
		promo.list.length.should.be.equal(0);
		done();
	});
});
