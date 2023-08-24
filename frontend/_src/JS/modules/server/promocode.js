import APIS from "./api.js";
import error from "../error.js";
import fill_data from "../user_data/fill_data.js";

let promocode__form = document.getElementById('content__form');


const promocode = async () => {
    const promo_Data = { promocode: promocode__form.code.value};
    let response = await fetch(APIS.verify_promo, {
        method: 'POST',
        credentials:'include',
        cache:'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(promo_Data)
    });
    response = await response.json();
    if (response.error) {
        error(true, response.error)
        promocode__form.code.classList.remove('success')
        promocode__form.code.classList.add('error')
        return;
    }
    error(true, response.msg)
    promocode__form.code.classList.remove('error')
    promocode__form.code.classList.add('success')
    await fill_data()
}

promocode__form.onsubmit = (e)=>{
    e.preventDefault();
    promocode();
}

export default promocode;