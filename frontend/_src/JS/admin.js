// Backend APIs
import APIS from "./modules/server/api.js";
// Login module
import login from "./modules/server/login.js";
// Interact with admin UI.
import admin_ui from "./modules/admin/admin_ui.js";
// Search users
import user_get from "./modules/admin/get_users.js";
// Default request
import admin_request from "./modules/admin/admin_request.js";
// Error
import error from "./modules/error.js";
// Logout
import logout from "./modules/server/logout.js";
// Random code create
import admin_random from "./modules/admin/admin_random.js"
// Sidebar tabs
import admin_sidebar from "./modules/admin/admin_sidebar.js";



//=================
// Variables
//=================
let user_edit_form = document.getElementById('user_edit_form'),
    user_edit_products_form = document.getElementById('user_edit_products_form'),
    add_promo_form = document.getElementById('add_promo_form'),
    edit_products_form = document.getElementById('edit_products_form');

//=================
// Server requests
//=================
user_edit_form.onsubmit = async (e) => {
    e.preventDefault();
    await admin_request({
        method: user_edit_form.method.value,
        identificator:user_edit_form.user.value,
        type:user_edit_form.type.value,
        value:user_edit_form.value.value
    }, APIS.change_user_data);
}

user_edit_products_form.onsubmit = async (e) =>{
    e.preventDefault();
    await admin_request({
        method: user_edit_products_form.method.value,
        identificator:user_edit_products_form.user.value,
        type:user_edit_products_form.type.value,
        move:user_edit_products_form.move.value,
        value:user_edit_products_form.value.value
    }, APIS.change_user_products);
}

add_promo_form.onsubmit = async (e) =>{
    e.preventDefault();
    await admin_request({
        method: add_promo_form.method.value,
        promo:add_promo_form.promo.value,
        give:add_promo_form.give.value,
        value:add_promo_form.value.value
    }, APIS.promo_edit);
}

edit_products_form.onsubmit = async (e) =>{
    e.preventDefault();
    await admin_request({
        method: edit_products_form.method.value,
        type:edit_products_form.type.value,
        value:edit_products_form.value.value
    }, APIS.products_edit);
}








