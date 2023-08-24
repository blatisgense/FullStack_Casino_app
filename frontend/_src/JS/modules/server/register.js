import APIS from "./api.js";

let register_form = document.getElementById('register_form'),
    register_notify = document.getElementById('register_notify');

const register = async (data) => {
    let response = await fetch(APIS.register, {
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
        register_notify.innerHTML = response.error
        register_notify.classList.add('active')
        return;
    }
    register_form.reset();
    register_notify.innerHTML = response.msg
    register_notify.classList.add('active')
}

register_form.onsubmit = async (e) =>{
    e.preventDefault();
    await register({email: register_form.email.value, password: register_form.password.value, name: register_form.name.value});
}

export default register;