import error from "../error.js";
import get_data from "../server/get_data.js";

let admin__login = document.getElementById('admin__login'),
    admin__login_form = document.getElementById('admin__login_form'),
    admin__name = document.getElementById('admin__name');

const admin_ui = async () => {
    let data = await get_data();
    if (admin__login && admin__login_form && admin__name){
        if (data.user_role === 'ADMIN'){
            admin__login.classList.remove('active');
            admin__name.innerText = data.user_name;
        } else {
            admin__login_form.reset();
            error(true, "You should Log In into account with permissions to control app.");
            admin__login.classList.add('active');
            admin__name.innerText = '';
        }
    }
}

export default admin_ui;