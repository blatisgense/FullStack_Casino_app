import pool from "../database/db.js";

const random_product = async (product_type) => {
    try {
        let arr = await pool.query(`SELECT * FROM Products;`);
        arr = await arr.rows[0];

        if (product_type === 'meditation'){
            let length = arr.products_meditation.length;
            let random = parseInt(Math.random() * length);
            if (random === length){
                random--
            }
            return arr.products_meditation[random];
        }
        if (product_type === 'list'){
            let length = arr.products_list.length;
            let random = parseInt(Math.random() * length);
            if (random === length){
                random--
            }
            return arr.products_list[random];
        }
    }
    catch (e) {
    return e;
    }
}

export {random_product};