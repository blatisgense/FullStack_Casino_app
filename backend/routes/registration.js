import express from "express";
import pool from "../database/db.js";
import bcrypt from "bcrypt"
import User from "../classes/User.js";

const router = express.Router();

router.post('/', async (req, res) =>{
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 6);

        let userTemplate = await new User({
            name: req.body.name,
            email: req.body.email,
            password: await hashedPass,
            role: req.body.role,
            wheel: req.body.wheel,
            money: req.body.money,
            meditation: req.body.meditation,
            list: req.body.list
        })

        if (userTemplate.name === null || userTemplate.password === null || userTemplate.email === null){
            return  res.status(500).json({error: "Data is not found, please fill all required inputs"});
        }

        const isAlreadyUse = await pool.query(`SELECT * FROM Users WHERE user_email = $1`, [userTemplate.email]);
        if (isAlreadyUse.rows.length > 0){
            return  res.status(403).json({error: 'This Email already used.'})
        }

        const newUser = await pool.query(
            `INSERT INTO Users (user_name, user_email, user_password, user_role, user_wheel, user_money, user_meditation, user_list) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [userTemplate.name, userTemplate.email, userTemplate.password, userTemplate.role, userTemplate.wheel, userTemplate.money, userTemplate.meditation, userTemplate.list]
        );

        return res.status(200).json({msg: `Success!  <br> You can SignIn with your data.`})

    } catch (error){
        return res.status(500).json({error: error.message})
    }
})

export default router;