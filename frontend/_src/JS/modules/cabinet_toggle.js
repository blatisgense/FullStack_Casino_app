import blur from "./blur.js";

let cabinet_btn = document.getElementById('cabinet_btn'),
    close_cabinet = document.querySelectorAll('.close_cabinet'),
    cabinet = document.getElementById('cabinet');

const cabinet_toggle = (item, method) => {
    if (method === true){
        blur(true);
        item.classList.add('active')

    }
    if (method === false){
        blur(false);
        item.classList.remove('active')
    }
}

if (cabinet_btn){
    cabinet_btn.onclick = () => cabinet_toggle(cabinet,true);
}

close_cabinet.forEach(el =>{
    el.onclick = () =>{
        cabinet_toggle(cabinet,false);
    }
});

export default cabinet_toggle;