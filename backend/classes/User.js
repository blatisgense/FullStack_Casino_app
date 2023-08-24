
class User {
    constructor({name, email, password, role, wheel, money, meditation, list}) {
        name ? this.name = name : this.name = null;
        email ? this.email = email : this.email = null;
        password ? this.password = password : this.password = null;
        role ? this.role = role : this.role = "USER";
        wheel ? this.wheel = wheel : this.wheel = 0;
        money ? this.money = money : this.money = 0;
        meditation ? this.meditation = meditation : this.meditation = [];
        list ? this.list = list : this.list = [];
    }
}
export default User;