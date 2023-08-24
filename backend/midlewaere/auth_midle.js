import jwt from "jsonwebtoken";
import pool from "../database/db.js";
import {JWT_tokens} from "../tools/jwt.js";

// check if user authorized
const authenticationToken = async (req, res, next) => {
    // by default token is access_token
    let trusted = process.env.ACCESS_TOKEN_SECRET;

    // get it from cookies
    let token = req.cookies.access_token;

    // if access_token not found, look to refresh_token
    if (token == null){

        // get refresh_token from cookies
        token = req.cookies.refresh_token;

        // check for it exist
        if (token == null){
            return  res.status(401).json({error: 'You should authorized before.'})
        }

        // switch token type to refresh
        trusted = process.env.UPDATE_TOKEN_SECRET;
    }

    // verify token with "secret"
    jwt.verify(token, trusted, async (error, user) =>  {
        if (error){
            return res.status(403).json({error: "You're token expired or replaced, please authorize again!"})
        }

        // if access_token expired, sets new pair
        if (trusted === process.env.UPDATE_TOKEN_SECRET){
            let newData = await pool.query(`SELECT * FROM Users WHERE user_email = $1`, [user.user_email]);
            newData = await newData.rows[0];
            let TOKENS = JWT_tokens(newData);
            res.cookie('refresh_token', TOKENS.refresh_token, {httpOnly: true, sameSite: 'none', secure:true});
            res.cookie('access_token', TOKENS.access_token, {httpOnly: true, sameSite: 'none',  secure:true});
        }

        // set users data to request
        req.user = user;
        next();
        })
}

export {authenticationToken};