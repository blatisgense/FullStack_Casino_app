
let add_promo_form = document.getElementById('add_promo_form'),
    admin__random = document.getElementById('admin__random');


const admin_random_func = () => {
    let result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
    }
    add_promo_form.promo.value = result.join('');
}

if (admin__random){
    admin__random.onclick = () =>{
        admin_random_func();
    }
}

export default admin_random_func;

