import APIS from "./api.js";
import clear_data from "../user_data/clear_data.js";
import error from "../error.js";
import cabinet_toggle from "../cabinet_toggle.js";


let
    logout_btn = document.getElementById('logout'),
    admin__logout = document.getElementById('admin__logout'),
    cabinet = document.getElementById('cabinet');

const logout = async () => {
    let response = await fetch(APIS.delete_token, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'include'
    });
    response = await response.json();
    if (response.error) {
        cabinet_toggle(cabinet, false);
        error(true, response.error)
        return;
    }
    clear_data();
    error(true, response.msg);
}

if (logout_btn){
    logout_btn.onclick = () => logout();
}

if (admin__logout){
    admin__logout.onclick = () => logout();
}





export default logout;