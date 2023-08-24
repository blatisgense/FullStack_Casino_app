import express from "express";
import pool from "../../database/db.js";

const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        const product = await pool.query(`SELECT * FROM Products;`)
        if (product.error){
            return res.status(403).json({error:product.error})
        }

        return  res.status(200).json({res:product.rows});
    } catch (error){
        return res.status(500).json({error: error.message})
    }
})

export default router;