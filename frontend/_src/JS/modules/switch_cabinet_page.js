let goto_register= document.getElementById('goto_register'),
    close_reg = document.getElementById('close_reg'),
    cabinet_login = document.getElementById('cabinet_login'),
    cabinet_register = document.getElementById('cabinet_register');

const switch_cabinet_page = (page , page_close) => {
    page.classList.add('active');
    page_close.classList.remove('active');
}

if (goto_register){
    goto_register.onclick = () => switch_cabinet_page(cabinet_register , cabinet_login);
}

if (close_reg){
    close_reg.onclick = () => switch_cabinet_page(cabinet_login , cabinet_register);
}

export default switch_cabinet_page;