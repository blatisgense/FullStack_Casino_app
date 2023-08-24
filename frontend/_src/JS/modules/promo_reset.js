let content__form = document.getElementById('content__form');

const promo_reset = () => {
    content__form.code.classList.remove('success')
    content__form.code.classList.remove('error')
    content__form.reset();
}
export default promo_reset;