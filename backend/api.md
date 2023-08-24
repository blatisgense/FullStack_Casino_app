# API backend

```js
let APIS = {
    login: `${server_address}/api/login`, //post
    delete_token: `${server_address}/api/delete_refresh_token`, //delete
    refresh_token: `${server_address}/api/refresh_token`, //get
    change_user_data: `${server_address}/api/user/change_data`, //post
    change_user_products: `${server_address}/api/user/change_product`, //post
    promo_edit: `${server_address}/api/promo/create`, //post
    products_edit: `${server_address}/api/products/edit`, //post
    get_users: `${server_address}/api/users/get`, //post
    register: `${server_address}/api/register`, //post
    spin: `${server_address}/api/spin`, //get
    verify_promo: `${server_address}/api/promo/verify`, //post
    get_data:`${server_address}/api/get_data` //get
};
```