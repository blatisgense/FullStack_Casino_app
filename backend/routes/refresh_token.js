import express from "express";
import {JWT_tokens} from "../tools/jwt.js";
import jwt from "jsonwebtoken";
import pool from "../database/db.js";

const router = express.Router();

router.get('/',  (req, res) => {
    try{
        const refresh_token = req.cookies.refresh_token;

        if (refresh_token === null){
            return  res.status(401).json('Refresh TOKEN not found');
        }

        jwt.verify(refresh_token, process.env.UPDATE_TOKEN_SECRET, async (error, user) => {
            if (error) {
                return res.status(403).json({error: error.message});
            }

            const email = user.user_email;
            let newData = await pool.query(`SELECT * FROM Users WHERE user_email = $1`, [email]);
            newData = await newData.rows[0];
            let TOKENS = JWT_tokens(newData);
            res.cookie('refresh_token', TOKENS.refresh_token, {httpOnly: true, sameSite: 'none', secure:true});
            res.cookie('access_token', TOKENS.access_token, {httpOnly: true, sameSite: 'none',  secure:true});
            return  res.json({accessTOKEN: TOKENS.access_token, updateTOKEN: TOKENS.refresh_token});
        });
    } catch (error){
        return  res.status(401).json({error: error.message});
    }
})
export default router;