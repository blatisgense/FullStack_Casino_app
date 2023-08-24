import blur from "./blur.js";

let prize_container = document.getElementById('prize_container'),
    prize_icon = document.getElementById('prize_icon'),
    prize_type = document.getElementById('prize_type'),
    prize_close = document.getElementById('prize_close'),
    prize_name = document.getElementById('prize_name'),
    prize_title = document.getElementById('prize_title');

const prize_modal = (type, name) => {
    // todo prizes in wheel
    switch (type) {
        case null:
            prize_title.innerText = 'You get luck at next try)';
            prize_icon.setAttribute('src', 'MEDIA/face.webp');
            prize_type.innerText = 'Вращайте ещё';
            break;
        case 'list':
            prize_title.innerText = 'Yeah! You got the prize:';
            prize_icon.setAttribute('src', 'MEDIA/SVG/stack/icons.svg#list_icon');
            prize_type.innerText = 'Чек-лист';
            prize_name.innerText = `"${name}"`;
            break;
        case 'meditation':
            prize_title.innerText = 'Yeah! You got the prize:';
            prize_icon.setAttribute('src', 'MEDIA/med_icon.webp');
            prize_type.innerText = 'Медитацию';
            prize_name.innerText = `"${name}"`;
            break;
        case 'wheel':
            prize_title.innerText = 'Yeah! You got the prize:';
            prize_icon.setAttribute('src', 'MEDIA/trie.webp');
            prize_type.innerText = '+ 1 шанс';
            break;
        case 'money':
            prize_title.innerText = 'Yeah! You got the prize:';
            prize_icon.setAttribute('src', 'MEDIA/500.webp');
            prize_type.innerText = '500 рублей';
            break;
    }
    prize_container.classList.add('active');
    blur(true);
}

if (prize_close){
    prize_close.onclick = () =>{
        prize_container.classList.remove('active');
        blur(false);
        prize_name.innerText = '';
        prize_type.innerText = '';
        prize_icon.setAttribute('src', '');
        prize_title.innerText = '';
    }
}

export default prize_modal;