import express from "express";
import pool from "../../database/db.js";

const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        const promocodes = await pool.query(`SELECT * FROM Promocodes;`)
        if (promocodes.error){
            return res.status(403).json({error:promocodes.error})
        }

        return  res.status(200).json({res:promocodes.rows});
    } catch (error){
        return res.status(500).json({error: error.message})
    }
})

export default router;