import express from "express";
import pool from "../../database/db.js";

const router = express.Router();

router.post('/', async (req, res) =>{
    try {
        if (req.body.all === "true") {
            const users = await pool.query(`SELECT * FROM Users;`);
            if (users.error){
                return  res.status(401).json({error: users.error})
            }
            return res.status(200).json({res: users.rows})
        } else {
            if (req.body.method === "id"){
                const users = await pool.query(`SELECT * FROM Users WHERE user_id = $1`, [req.body.identificator]);
                if (users.rows.length === 0){
                    return  res.status(401).json({error: 'User not found, check entered ID.'})
                }
                return  res.status(200).json(users.rows[0]);
            }

            if (req.body.method === "email"){
                const users = await pool.query(`SELECT * FROM Users WHERE user_email = $1`, [req.body.identificator]);
                if (users.rows.length === 0){
                    return  res.status(401).json({error: 'User not found, check entered ID.'})
                }
                return  res.status(200).json(users.rows[0]);
            }
        }
    } catch (error){
        return res.status(500).json({error: error.message})
    }
})

export default router;