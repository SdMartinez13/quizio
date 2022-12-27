import bcrypt from 'bcrypt';
import prisma from '../../../lib/prisma';
// import sha256 from "crypto-js/sha256";
// import { logger } from "@lib/logger";

export default async function handle(req, res) {
    if (req.method === 'POST') {
        await handlePOST(res, req);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}

// const hashPassword = (password) => {
//   return sha256(password).toString();
// };

// POST /api/user
async function handlePOST(res, req) {
    const { first_name, email, password } = req.body;

    // backend validation
    const errors = {};
    if (!first_name) { errors.first_name = 'First Name is required'; }
    if (!email) { errors.email = 'Email is required'; }
    if (!password) { errors.password = 'Password is required'; }

    if (!!Object.keys(errors).length) {
        return res.status(200).send({ errors });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.qUsers.create({
        data: { ...req.body, password: hashed },
    });
    console.log(user, 'NEWLY CREATED USERRR')
    // res.json(user);
    return res.status(200).send('hello world');
}
