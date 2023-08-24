import switch_cabinet_page from "../switch_cabinet_page.js";
import error from "../error.js";
import get_data from "../server/get_data.js";

let cabinet_user = document.getElementById('cabinet_user'),
    profile_name = document.getElementById('profile_name'),
    one_icon = document.getElementById('one'),
    ten_icon = document.getElementById('ten'),
    wheel = document.getElementById('wheel'),
    name = document.getElementById('name'),
    cabinet_login = document.getElementById('cabinet_login'),
    balance = document.getElementById('balance'),
    list_of_items = document.getElementById('list_of_items');

const fill_data = async () => {
    let data = await get_data();
        const counter_fill = () => {
            if (data.user_wheel.split('').length > 1){
                one_icon.innerText = data.user_wheel.split('')[1];
                one_icon.classList.add('active')

                ten_icon.innerText = data.user_wheel.split('')[0];
                ten_icon.classList.add('active')
                one_icon.classList.add('active')
            } else {
                if (Number(data.user_wheel) > 0){
                    ten_icon.innerText = '0';
                    ten_icon.classList.remove('active');

                    one_icon.innerText = data.user_wheel.split('')[0];
                    one_icon.classList.add('active')
                } else {
                    one_icon.innerText = '0';
                    one_icon.classList.remove('active');
                    ten_icon.innerText = '0';
                    ten_icon.classList.remove('active');
                }
            }
            wheel.innerText = data.user_wheel;
        }
        counter_fill();
        // cabinet page
        switch_cabinet_page(cabinet_user, cabinet_login);
        //names
        name.innerText = data.user_name;
        profile_name.innerText = data.user_name;
        document.querySelector('.authorization__img').classList.add('active');
        //money
        balance.innerText = data.user_money;
        //lists
        if (data.user_meditation.length > 0 || data.user_list.length > 0){
            list_of_items.innerHTML = `<li class="list__btn"><button class="get_prize">Получить</button></li>`;

            for (let i = 0; i < data.user_list.length; i++) {
                list_of_items.innerHTML += `
                    <li class="list__item">
                        <img src="MEDIA/SVG/stack/icons.svg#list_icon" alt="icon">
                        <span>Чек-лист "${data.user_list[i]}".</span>
                    </li>`
            }

            for (let i = 0; i < data.user_meditation.length; i++) {
                list_of_items.innerHTML += `
                    <li class="list__item">
                        <img src="MEDIA/med_icon.webp" alt="icon">
                        <span>Медитация "${data.user_meditation[i]}".</span>
                    </li>`
            }

            document.querySelector('.get_prize').onclick = () =>{
                error(true, `Напишите мне в Telegram, чтобы получить приз <br> @blatisgense`)
            }
        } else {
            list_of_items.innerHTML = `<li class="list__error"><span>У вас пока ещё нет медитаций или чек-листов, но вы можете их выиграть и они отобразятся здесь.</span></li>`
        }
}

export default fill_data;