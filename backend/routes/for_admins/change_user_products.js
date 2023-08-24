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
                return  res.status(401).json({error: 'User noy found, check the data.'})
            }

            if (req.body.type === 'list'){
                if (req.body.move === 'delete'){
                    const products = await pool.query(`UPDATE Users SET user_list = ARRAY_REMOVE(user_list, $1) WHERE user_id = $2`, [req.body.value, req.body.identificator])
                    if (products.error){
                        return  res.status(401).json({error: products.error})
                    }
                    return res.status(200).json({msg: `Item ${req.body.value} deleted successfully.`})
                }
                if (req.body.move === 'add'){
                    const products = await pool.query(`UPDATE Users SET user_list = ARRAY_APPEND(user_list, $1) WHERE user_id = $2`, [req.body.value, req.body.identificator])
                    if (products.error){
                        return  res.status(401).json({error: products.error})
                    }
                    return res.status(200).json({msg: `Item ${req.body.value} added successfully.`})
                }
            }
            if (req.body.type === 'meditation'){
                if (req.body.move === 'delete'){
                    const products = await pool.query(`UPDATE Users SET user_meditation = ARRAY_REMOVE(user_meditation, $1) WHERE user_id = $2`, [req.body.value, req.body.identificator])
                    if (products.error){
                        return  res.status(401).json({error: products.error})
                    }
                    return res.status(200).json({msg: `Item ${req.body.value} deleted successfully.`})
                }
                if (req.body.move === 'add'){
                    const products = await pool.query(`UPDATE Users SET user_meditation = ARRAY_APPEND(user_meditation, $1) WHERE user_id = $2`, [req.body.value, req.body.identificator])
                    if (products.error){
                        return  res.status(401).json({error: products.error})
                    }
                    return res.status(200).json({msg: `Item ${req.body.value} added successfully.`})
                }
            }
        }

        if (req.body.method === "email"){
            const users = await pool.query(`SELECT * FROM Users WHERE user_email = $1`, [req.body.identificator]);
            if (users.rows.length === 0){
                return  res.status(401).json({error: 'User noy found, check the data.'})
            }

            if (req.body.type === 'list'){
                if (req.body.move === 'delete'){
                    const products = await pool.query(`UPDATE Users SET user_list = ARRAY_REMOVE(user_list, $1) WHERE user_email = $2`, [req.body.value, req.body.identificator])
                    if (products.error){
                        return  res.status(401).json({error: products.error})
                    }
                    return res.status(200).json({msg: `Item ${req.body.value} deleted successfully.`})
                }
                if (req.body.move === 'add'){
                    const products = await pool.query(`UPDATE Users SET user_list = ARRAY_APPEND(user_list, $1) WHERE user_email = $2`, [req.body.value, req.body.identificator])
                    if (products.error){
                        return  res.status(401).json({error: products.error})
                    }
                    return res.status(200).json({msg: `Item ${req.body.value} added successfully.`})
                }
            }
            if (req.body.type === 'meditation'){
                if (req.body.move === 'delete'){
                    const products = await pool.query(`UPDATE Users SET user_meditation = ARRAY_REMOVE(user_meditation, $1) WHERE user_email = $2`, [req.body.value, req.body.identificator])
                    if (products.error){
                        return  res.status(401).json({error: products.error})
                    }
                    return res.status(200).json({msg: `Item ${req.body.value} deleted successfully.`})
                }
                if (req.body.move === 'add'){
                    const products = await pool.query(`UPDATE Users SET user_meditation = ARRAY_APPEND(user_meditation, $1) WHERE user_email = $2`, [req.body.value, req.body.identificator])
                    if (products.error){
                        return  res.status(401).json({error: products.error})
                    }
                    return res.status(200).json({msg: `Item ${req.body.value} added successfully.`})
                }
            }
        }
    } catch (error){
        return  res.status(500).json({error: error.message})
    }
})

export default router;