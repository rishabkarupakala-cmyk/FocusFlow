import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "focusflow_secret";

export function generateToken(id: number) {

    return jwt.sign(

        { id },

        SECRET,

        {
            expiresIn: "7d"
        }

    );

}