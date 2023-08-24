
let body = document.querySelector('body'),
    page = document.querySelector('.page');

const blur = (method) => {
    method === true ? body.classList.add('noScroll') : body.classList.remove('noScroll');
    method === true ? page.classList.add('blur') : page.classList.remove('blur');
}

export default blur;