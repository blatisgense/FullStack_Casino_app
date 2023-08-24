import express from "express";
import pool from "../../database/db.js";

const router = express.Router();

router.post('/', async (req, res) =>{
    try {

        if (req.body.method === 'delete'){

            if (req.body.type === 'list'){
                const delete_product = await pool.query(`UPDATE Products SET products_list = ARRAY_REMOVE(products_list, $1)`, [req.body.value])
                if (delete_product.error){
                    res.status(403).json({error: delete_product.error})
                }
                res.status(200).json({msg: `Item ${req.body.value} successfully deleted.`})
            }
            if (req.body.type === 'meditation'){
                const delete_product = await pool.query(`UPDATE Products SET products_meditation = ARRAY_REMOVE(products_meditation, $1)`, [req.body.value])
                if (delete_product.error){
                    res.status(403).json({error: delete_product.error})
                }
                res.status(200).json({msg: `Item ${req.body.value} successfully deleted.`})
            }
        }
        if (req.body.method === 'add'){

            if (req.body.type === 'list'){
                const delete_product = await pool.query(`UPDATE Products SET products_list = ARRAY_APPEND(products_list, $1)`, [req.body.value])
                if (delete_product.error){
                    res.status(403).json({error: delete_product.error})
                }
                res.status(200).json({msg: `Item ${req.body.value} successfully created.`})
            }
            if (req.body.type === 'meditation'){
                const delete_product = await pool.query(`UPDATE Products SET products_meditation = ARRAY_APPEND(products_meditation, $1)`, [req.body.value])
                if (delete_product.error){
                    res.status(403).json({error: delete_product.error})
                }
                res.status(200).json({msg: `Item ${req.body.value} successfully created.`})
            }
        }
    } catch (error){
        return res.status(500).json({error: error.message})
    }
})

export default router;