let admin__side_item = document.querySelectorAll('.admin__side_item'),
    admin__control = document.querySelectorAll('.admin__control'),
    admin__side_ul = document.querySelectorAll('.admin__side_ul'),
    admin__side_li = document.querySelectorAll('.admin__side_li');

const admin_sidebar = () => {}

admin__side_item.forEach(el =>{
    el.onclick = (e) => {
        let atr = e.target.getAttribute('data-type');
        let item= document.querySelector(`.admin__side_ul[data-type="${atr}"]`);
        admin__side_ul.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
    }
})

admin__side_li.forEach(el =>{
    el.onclick = (e) => {
        let atr = e.target.getAttribute('data-type');
        let item= document.querySelector(`.admin__control[data-type="${atr}"]`);
        admin__control.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
    }
})

export default admin_sidebar;