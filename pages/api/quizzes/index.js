import { getSession } from 'next-auth/react';
import { customAlphabet } from 'nanoid';
import prisma from '../../../lib/prisma';

const nanoid = customAlphabet('1234567890ABCDEF', 7);


export default async function handle(req, res) {
    if (req.method === 'POST') {
        await handlePOST(res, req);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}

async function handlePOST(res, req) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).send('Unauthorized to create a quiz');
    }

    const { title } = req.body;



    const quiz = await prisma.quizzes.create({
        data: {
            title,
            quiz_id: nanoid(),
            user_id: session.token.user_id,
        },
    });


    return res.status(200).send(quiz);


    // const { first_name, email, password } = req.body;

    // // backend validation
    // const errors = {};
    // if (!first_name) { errors.first_name = 'First Name is required'; }
    // if (!email) { errors.email = 'Email is required'; }
    // if (!password) { errors.password = 'Password is required'; }

    // if (!!Object.keys(errors).length) {
    //     return res.status(200).send({ errors });
    // }

    // const hashed = await bcrypt.hash(password, 10);

    // const user = await prisma.qUsers.create({
    //     data: { ...req.body, password: hashed },
    // });
    // console.log(user, 'NEWLY CREATED USERRR')
    // // res.json(user);
    // return res.status(200).send('hello world');
}
