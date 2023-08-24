import blur from "./blur.js";
import cabinet_toggle from "./cabinet_toggle.js";

let error_text = document.getElementById('error_text'),
    cabinet = document.getElementById('cabinet'),
    get_money = document.getElementById('data_balance_btn'),
    error_close = document.getElementById('error_close'),
    error_container = document.getElementById('error_container');


const error = (method, msg) => {
    if (method === true){
        error_text.innerHTML = msg;
        error_container.classList.add('active')
        if (cabinet){
            cabinet_toggle(cabinet, false);
        }
        blur(true);
    } else{
        error_text.innerHTML = '';
        error_container.classList.remove('active')
        blur(false);
    }
}

if (get_money){
    get_money.onclick = () => error(true, `Letter me in Telegram @blatisgense, to get prize, or to become my coworker.`);
}

if (error_close){
    error_close.onclick = () => error(false);
}

export default error;