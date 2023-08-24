import express from "express";
import pool from "../database/db.js";
import bcrypt from "bcrypt";
import {JWT_tokens} from "../tools/jwt.js";

const router = express.Router();

router.post('/', async (req, res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const users = await pool.query(`SELECT * FROM Users WHERE user_email = $1`, [email]);
        if (users.rows.length === 0){
            return  res.status(401).json({error: 'User not found, maybe Email is incorrect, please try again.'})
        }

        const validPass = await bcrypt.compare(password, users.rows[0].user_password);
        if (!validPass){
            return  res.status(401).json({error: 'Password is incorrect, please try again.'})
        }
        let TOKENS = JWT_tokens(users.rows[0]);
        res.cookie('refresh_token', TOKENS.refresh_token, {httpOnly: true, sameSite: 'none',  secure:true});
        res.cookie('access_token', TOKENS.access_token, {httpOnly: true, sameSite: 'none',  secure:true});
        return  res.status(200).json(TOKENS);
    } catch (error){
        return res.status(500).json({error: error.message})
    }
})

export default router;