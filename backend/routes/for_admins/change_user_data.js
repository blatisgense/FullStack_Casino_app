import express from "express";
import pool from "../../database/db.js";
import {authenticationToken} from "../../midlewaere/auth_midle.js";
import {role_check} from "../../midlewaere/role_check.js";

const router = express.Router();

router.post('/', authenticationToken, role_check(["ADMIN"]),  async (req, res) =>{
    try {
        if (req.body.method === "id"){
            const users = await pool.query(`SELECT * FROM Users WHERE user_id = $1`, [req.body.identificator]);
            if (users.rows.length === 0){
                return  res.status(401).json({error: 'User not found, check the data.'})
            }

            switch (req.body.type) {
                case 'wheel':
                    if (isNaN(Number(req.body.value))) {
                        return res.status(402).json({error: `Вы должны ввести число`})
                    }
                    const change_wheel = await pool.query(`UPDATE Users SET user_wheel = $1 WHERE user_id = $2`, [req.body.value, req.body.identificator])
                    return res.status(200).json({msg: `Шансы пользователя изменены на ${req.body.value}`})
                case 'role':
                    if (!(req.body.value.toUpperCase() === 'ADMIN') && !(req.body.value.toUpperCase() === 'USER')) {
                        return res.status(402).json({error: `Роль должна быть USER или ADMIN`, req: req.body.value.toUpperCase()})
                    }
                    const change_role = await pool.query(`UPDATE Users SET user_role = $1 WHERE user_id = $2`, [req.body.value.toUpperCase(), req.body.identificator])
                    return res.status(200).json({msg: `Роль пользователя изменена на ${req.body.value.toUpperCase()}`})
                case 'money':
                    if (isNaN(Number(req.body.value))) {
                        return res.status(402).json({error: `Вы должны ввести число`})
                    }
                    const change_money = await pool.query(`UPDATE Users SET user_money = $1 WHERE user_id = $2`, [req.body.value, req.body.identificator])
                    return res.status(200).json({msg: `Деньги пользователя изменены на ${req.body.value}`})
            }
        }

        if (req.body.method === "email"){
            const users = await pool.query(`SELECT * FROM Users WHERE user_email = $1`, [req.body.identificator]);
            if (users.rows.length === 0){
                return  res.status(401).json({error: 'Пользователь не найден, может быть Email неверный.'})
            }

            switch (req.body.type) {
                case 'wheel':
                    if (isNaN(Number(req.body.value))) {
                        return res.status(402).json({error: `Вы должны ввести число`})
                    }
                    const change_wheel = await pool.query(`UPDATE Users SET user_wheel = $1 WHERE user_email = $2`, [req.body.value, req.body.identificator])
                    return res.status(200).json({msg: `Шансы пользователя изменены на ${req.body.value}`})
                case 'role':
                    if (!(req.body.value.toUpperCase() === 'ADMIN') && !(req.body.value.toUpperCase() === 'USER')) {
                        return res.status(402).json({error: `Роль должна быть USER или ADMIN`, req: req.body.value.toUpperCase()})
                    }
                    const change_role = await pool.query(`UPDATE Users SET user_role = $1 WHERE user_email = $2`, [req.body.value.toUpperCase(), req.body.identificator])
                    return res.status(200).json({msg: `Роль пользователя изменена на ${req.body.value.toUpperCase()}`})
                case 'money':
                    if (isNaN(Number(req.body.value))) {
                        return res.status(402).json({error: `Вы должны ввести число`})
                    }
                    const change_money = await pool.query(`UPDATE Users SET user_money = $1 WHERE user_email = $2`, [req.body.value, req.body.identificator])
                    return res.status(200).json({msg: `Деньги пользователя изменены на ${req.body.value}`})
            }
        }
    } catch (error){
        return  res.status(500).json({error: error.message})
    }
})

export default router;