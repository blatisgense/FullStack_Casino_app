# API backend
### Get more info at `${server_address}/api/swagger`
```js
export const APIS = {
    // Address REST API
    server_address:'http://localhost:5000',
    //auth
    login: `${this.server_address}/api/auth/login`, //auth, post
    register: `${this.server_address}/api/auth/register`, //auth, post
    get_data:`${this.server_address}/api/auth/get_data`, //auth, get
    delete_token: `${this.server_address}/api/auth/delete_session`, //auth, delete
    refresh_token: `${this.server_address}/api/auth/refresh_tokens`, //auth, get
    //client
    spin: `${this.server_address}/api/client/spin`, //client ,get
    verify_promo: `${this.server_address}/api/client/promocode_check`, //client ,post
    //admin
    change_user_data: `${this.server_address}/api/admin/change_data`, //admin ,post
    change_user_products: `${this.server_address}/api/admin/change_product`, //admin ,post
    promo_edit: `${this.server_address}/api/admin/create`, //admin ,post
    products_edit: `${this.server_address}/api/admin/edit`, //admin ,post
    get_users: `${this.server_address}/api/admin/get`, //admin ,post
};
```