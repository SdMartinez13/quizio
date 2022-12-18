const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const { customAlphabet } = require('nanoid');
// const { nanoid } = require("nanoid");
// var ID = nanoid();

const nanoid = customAlphabet('1234567890abcdef', 7);


const prisma = new PrismaClient();

console.log('Initiating Seeding')

const userData = Array.from({ length: 10 }).map(() => ({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
}))

async function main() {
    // create users
    await prisma.qUsers.createMany({ data: userData });

    // const getSomeUsers = await prisma.qUsers.findMany({
    //     take: 2,
    //     select: {
    //         user_id: true,
    //         email: true, 
    //     },
    // })

    // console.log(getSomeUsers, 'getSomeUsers')

    // console.log(nanoid(), 'nanoid')
    // console.log(nanoid(), 'nanoid')
    // console.log(nanoid(), 'nanoid')
    // console.log(nanoid(), 'nanoid')
    // console.log(nanoid(), 'nanoid')


    // await Promise.all(
    //     getSomeUsers.map(async user => {
    //         console.log(user, 'user')

            const q = await prisma.quizzes.create({ data: {
                quiz_id: nanoid(),
                title: faker.lorem.sentence(5),
                // description
                is_active: true,
                questions: {
                    create: [
                        {
                            question: 'What color is a tree frog?',
                            is_active: true,
                            // score
                            answers: [{ "correct": true, "answer": "green" }, { "correct": false, "answer": "red" }, { "correct": false, "answer": "green" }, { "correct": false, "answer": "purple" }]
                        }
                    ]
                }
            }})
    //     })
    // )

    console.log(q, 'qqqq')

    // const alice = await prisma.user.upsert({
    //     where: { email: 'alice@prisma.io' },
    //     update: {},
    //     create: {
    //         email: 'alice@prisma.io',
    //         name: 'Alice',
    //         posts: {
    //             create: {
    //                 title: 'Check out Prisma with Next.js',
    //                 content: 'https://www.prisma.io/nextjs',
    //                 published: true,
    //             },
    //         },
    //     },
    // })

    // const bob = await prisma.user.upsert({
    //     where: { email: 'bob@prisma.io' },
    //     update: {},
    //     create: {
    //         email: 'bob@prisma.io',
    //         name: 'Bob',
    //         posts: {
    //             create: [
    //                 {
    //                     title: 'Follow Prisma on Twitter',
    //                     content: 'https://twitter.com/prisma',
    //                     published: true,
    //                 },
    //                 {
    //                     title: 'Follow Nexus on Twitter',
    //                     content: 'https://twitter.com/nexusgql',
    //                     published: true,
    //                 },
    //             ],
    //         },
    //     },
    // })
    // console.log({ alice, bob })
}

main()
    .then(async () => {
        console.log('Successfully seeded database. Closing connection.');
    })
    .catch(e => {
        console.error(`There was an error while seeding: ${e}`);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });