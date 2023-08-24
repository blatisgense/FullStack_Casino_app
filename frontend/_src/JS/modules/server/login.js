import APIS from "./api.js";
import error from "../error.js";
import admin_ui from "../admin/admin_ui.js";
import fill_data from "../user_data/fill_data.js";

let admin__login_form = document.getElementById('admin__login_form'),
    login_form = document.getElementById('login_form');

const login = async (data, isAdmin) => {
    let response = await fetch(APIS.login, {
        method: 'POST',
        credentials:'include',
        cache:'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    response = await response.json();
    if (response.error) {
        error(true, response.error)
        return;
    }
    if (isAdmin){
        await admin_ui();
    } else {
        await fill_data()
    }
}

if (login_form){
    login_form.onsubmit = async (e) =>{
        e.preventDefault();
        await login({email: login_form.email.value, password: login_form.password.value})
    }
}

if (admin__login_form){
    admin__login_form.onsubmit = async (e) =>{
        e.preventDefault();
        await login({ email: admin__login_form.email.value, password: admin__login_form.password.value }, true)
    }
}



export default login;