import APIS from "./api.js";
import error from "../error.js";
import promo_reset from "../promo_reset.js";
import cabinet_toggle from "../cabinet_toggle.js";
import prize_modal from "../prize_modal.js";
import fill_data from "../user_data/fill_data.js";

let wheel_spin = document.getElementById('wheel_spin'),
    cabinet = document.getElementById('cabinet'),
    wheel__outer = document.querySelector('.wheel__outer');

const spin = async () => {
    wheel_spin.setAttribute('disabled', 'disabled');
    let response = await fetch(APIS.spin, {
        method: 'GET',
        credentials:'include',
        cache:'no-cache',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    response = await response.json().then(response =>{
        if (response.error) {
            error(true, response.error);
            wheel_spin.removeAttribute('disabled');
            return;
        }
        promo_reset();
        wheel__outer.classList.add('active');
        setTimeout(async () =>{
            cabinet_toggle(cabinet, false);
            wheel__outer.classList.remove('active');
            prize_modal(response.prize, response.item_name);
            wheel_spin.removeAttribute('disabled');
            await fill_data();
        }, 7200)
    });
}

wheel_spin.onclick = ()=> spin();

export default spin;