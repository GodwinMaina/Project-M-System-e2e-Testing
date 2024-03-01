

import mssql from 'mssql';
// import { User } from "../interface/userInterface";
import { sqlConfig } from '../config/sqlconfig';
import { Request, Response } from "express";
import { v4 } from 'uuid';
import bcrypt from 'bcrypt'



export const userSignup= async (req:Request, res:Response)=> {

    try {
    
        const { userName, email, password } = req.body;
        const id = v4();

        const hashPwd = await bcrypt.hash(password,6)

        // let {error} = registerUserValidator.validate(req.body) 
        // if(error){
        //     return res.status(404).json({
        //         error: error.details[0].message
        //     })
        // }

        if (!password) {
            return res.status(400).json({
                error: "Password is required"
            });
        }
        const emailExists = await checkIfEmailExists(email);
        if (emailExists) {
            return res.status(400).json({
                error: 'Email is already registered',
            });
        }

        const pool = await mssql.connect(sqlConfig);

        const userSign = (await pool.request()
        .input("user_id", mssql.VarChar, id)
        .input("userName", mssql.VarChar, userName)
        .input("email", mssql.VarChar, email)
        .input("password", mssql.VarChar, hashPwd)
        .execute('registerUser')
    ).rowsAffected;

        console.log(userSign);

        if (userSign) {
            return res.json({
                message: "Account created successfully",
              
            });
        } else {
            return res.json({ error: "An error occurred while." });
        }
    } catch (error) {
        console.error("Error creating user:", error);
        return res.json({ error: " The user account was not created." });
    }


    async function checkIfEmailExists(email: string): Promise<boolean> {
        const pool = await mssql.connect(sqlConfig);

        const result = await pool
            .request()
            .input('email', mssql.VarChar, email)
            .query('SELECT COUNT(*) AS count FROM Users WHERE email = @email');

        return result.recordset[0].count > 0;
    }

}






