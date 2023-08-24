import express from "express";
import pool from "../../database/db.js";
import Promo from "../../classes/PromoCode.js";

const router = express.Router();

router.post('/', async (req, res) =>{
    try {
        let promoTemplate = await new Promo({
            promo: req.body.promo,
            wheel: 0,
            money: 0,
            meditation:[],
            list:[]
        });

        if (req.body.method === 'delete'){
            const delete_promo = await pool.query(`DELETE FROM PromoCodes WHERE promo = $1`, [promoTemplate.promo]);
            if (delete_promo.error){
                return  res.status(500).json({error: delete_promo.error});
            }
            return res.status(200).json({msg: `Promocode ${promoTemplate.promo} deleted successfully.`})
        }

        if (req.body.method === 'add'){
            switch (req.body.give) {
                case 'wheel':
                    if (isNaN(Number(req.body.value))) {
                        return res.status(402).json({error: `Please type a number`})
                    }
                    promoTemplate.wheel = req.body.value;
                    break;
                case 'money' :
                    if (isNaN(Number(req.body.value))) {
                        return res.status(402).json({error: `Please type a number`})

                    }
                    promoTemplate.money = req.body.value;
                    break;
                case 'meditation':
                    promoTemplate.meditation.push(req.body.value);
                    break;
                case 'list':
                    promoTemplate.list.push(req.body.value);
                    break;
            }
        }

        const isAlreadyUse = await pool.query(`SELECT * FROM PromoCodes WHERE promo = $1`, [promoTemplate.promo]);
        if (isAlreadyUse.rows.length > 0){
            return  res.status(403).json({error: 'This Promo already exist.'})
        }

        const newPromo = await pool.query(
            `INSERT INTO PromoCodes (promo, promo_wheel, promo_money, promo_meditation, promo_list) VALUES ($1, $2, $3, $4, $5)`,
            [promoTemplate.promo, promoTemplate.wheel, promoTemplate.money, promoTemplate.meditation, promoTemplate.list]
        );

        res.json({msg: `Promocode created successfully.`});
    } catch (error){
        return res.status(500).json({error: error.message})
    }
})

export default router;