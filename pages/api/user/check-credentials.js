// import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prisma';
// import sha256 from "crypto-js/sha256";
// import { logger } from "lib/logger";
// import { omit } from "lodash";


export default async function handle(req, res) {
    if (req.method === 'POST') {
        return handlePOST(res, req);
    }
    //  else {
    throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`,
    );
    // }
}

// const hashPassword = (password) => sha256(password).toString();

// POST /api/user
async function handlePOST(res, req) {
    console.log(req.body, 'getting hereeeee!!!')
    const user = await prisma.qUsers.findUnique({
        where: { email: req.body.email },
        // select: {
        // id: true,
        // name: true,
        // email: true,
        // image: true,
        // password: true,
        // },
    });
    console.log(user, 'USER')

    if (!user) {
        // return res.status(200).send('Invalid stuffffzzz')
        // throw new Error('invalid credentials in handlepost');
        return res.status(200).send(null)
    }

    // check if password matches here 

    const { password, ...rest } = user;

    return res.status(200).send(rest)


    // if (user && user.password == hashPassword(req.body.password)) {
    //     logger.debug('password correct');
    //     res.json(omit(user, 'password'));
    // } else {
    //     logger.debug('incorrect credentials');
    //     res.status(400).end('Invalid credentials');
    // }
}
