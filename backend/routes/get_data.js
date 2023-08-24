import express from "express";
import {authenticationToken} from "../midlewaere/auth_midle.js";
import pool from "../database/db.js";


const router = express.Router();

router.get('/', authenticationToken, async (req, res) =>{
    try {
        // send actual user data
        let newData = await pool.query(`SELECT * FROM Users WHERE user_email = $1`, [req.user.user_email]);
        newData = await newData.rows[0];
        return  res.status(200).json(newData);
    } catch (error){
        return res.status(500).json({error: error.message})
    }
})

export default router;