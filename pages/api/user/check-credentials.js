import bcrypt from 'bcrypt';
import prisma from '../../../lib/prisma';

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

// POST /api/user
async function handlePOST(res, req) {
    const user = await prisma.qUsers.findUnique({
        where: { email: req.body.email },
    });

    if (!user) {
        return res.status(200).send(null);
    }

    const comparePassword = await bcrypt.compare(req.body.password, user.password);

    if (!comparePassword) {
        return res.status(200).send(null);
    }

    const { password, ...rest } = user;

    return res.status(200).send(rest);
}
