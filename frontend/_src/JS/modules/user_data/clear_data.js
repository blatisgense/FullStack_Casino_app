import switch_cabinet_page from "../switch_cabinet_page.js";

let one_icon = document.getElementById('one'),
    ten_icon = document.getElementById('ten'),
    balance = document.getElementById('balance'),
    cabinet_user = document.getElementById('cabinet_user'),
    name = document.getElementById('name'),
    cabinet_login = document.getElementById('cabinet_login'),
    list_of_items = document.getElementById('list_of_items');

const clear_data = () => {
    if (one_icon && ten_icon && list_of_items && balance && name && cabinet_login && cabinet_user){
        //wheels
        one_icon.innerText = '0';
        one_icon.classList.remove('active');
        ten_icon.innerText = '0';
        ten_icon.classList.remove('active');
        //list and med
        list_of_items.innerHTML = '';
        //money
        balance.innerText = '0';
        //page
        switch_cabinet_page(cabinet_login, cabinet_user);
        //name
        name.innerText = '';
        document.querySelector('.authorization__img').classList.remove('active');
    }
}

export default clear_data;