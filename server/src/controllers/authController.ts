import { Request, Response } from "express";

import {
    registerUser,
    loginUser
} from "../services/authService.js";

export async function register(

    req: Request,

    res: Response

) {

    try {

        const result = await registerUser(req.body);

        res.status(201).json({

            message: "User registered successfully",

            result

        });

    }
catch (error: any) {

    console.error("REGISTER ERROR:");
    console.error(error);

    res.status(500).json({
        message: error.message
    });

}

}

export async function login(

    req: Request,

    res: Response

) {

    try {

        const {

            email,

            password

        } = req.body;

        const result = await loginUser(

            email,

            password

        );

        res.status(200).json(result);

    }

    catch (error) {

        console.error(error);

        res.status(401).json({

            message: "Invalid email or password"

        });

    }

}