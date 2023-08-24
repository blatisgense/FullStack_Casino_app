class Promo {
    constructor({promo, money, wheel, meditation, list}) {
        promo ? this.promo = promo : this.promo = null;
        wheel ? this.wheel = wheel : this.wheel = 0;
        money ? this.money = money : this.money = 0;
        meditation ? this.meditation = meditation : this.meditation = [];
        list ? this.list = list : this.list = [];
    }
}
export default Promo;