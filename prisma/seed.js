const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const { customAlphabet } = require('nanoid');
const quizData = require('./questionData')

const nanoid = customAlphabet('1234567890abcdef', 7);
const prisma = new PrismaClient();


// TODO: should use .env file to create custom variables to not interfere with version control

// Customizable Variables
const createNewUsersCOUNT = 1;
const usersWithSeedDataCOUNT = 1;


const userData = Array.from({ length: createNewUsersCOUNT }).map(() => ({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
}))

async function main() {
    console.log('Initiating Seeding')

    // create users
    await prisma.qUsers.createMany({ data: userData });

    // console.log(quizData, 'quizData')

    const getSomeUsers = await prisma.qUsers.findMany({
        take: usersWithSeedDataCOUNT, select: { user_id: true, email: true },
    })


    const splitQuizzes = splitToChunks([...quizData], getSomeUsers.length);

    await Promise.all(
        getSomeUsers.map(async (user, ind) => {
            console.log(user, 'user ===========')

            await Promise.all(
                splitQuizzes[ind].map(async item => {
                    const { questions, ...rest } = item;
                    // console.log(item, user.user_id, 'item')

                    await prisma.quizzes.create({
                        data: {
                            ...rest,
                            quiz_id: nanoid(),
                            user_id: user.user_id,
                            questions: {
                                create: questions,
                            }
                        }
                    })
                })
            )
        })
    )

    // await Promise.all(
    //     getSomeUsers.map(async user => {
    //         console.log(user, 'user')

    //         await Promise.all(
    //             quizData.map(async item => {
    //                 const { questions, ...rest } = item;

    //                 await prisma.quizzes.create({
    //                     data: {
    //                         ...rest,
    //                         quiz_id: nanoid(),
    //                         user_id: user.user_id,
    //                         questions: {
    //                             create: questions,
    //                         }
    //                     }
    //                 })
    //             })
    //         )
    //     })
    // )
    // await demoSeed();

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





const demoSeed = async () => {
    // this seeds the two default tables User and Post from the schema.prisma
    const alice = await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'alice@prisma.io',
            name: 'Alice',
            posts: {
                create: {
                    title: 'Check out Prisma with Next.js',
                    content: 'https://www.prisma.io/nextjs',
                    published: true,
                },
            },
        },
    })

    const bob = await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
            email: 'bob@prisma.io',
            name: 'Bob',
            posts: {
                create: [
                    {
                        title: 'Follow Prisma on Twitter',
                        content: 'https://twitter.com/prisma',
                        published: true,
                    },
                    {
                        title: 'Follow Nexus on Twitter',
                        content: 'https://twitter.com/nexusgql',
                        published: true,
                    },
                ],
            },
        },
    })
    console.log({ alice, bob })

    return true;
}


// const q = await prisma.quizzes.create({
//     data: {
//         quiz_id: nanoid(),
//         title: faker.lorem.sentence(5),
//         // description
//         is_active: true,
//         user_id: user.user_id,
//         questions: {
//             create: [
//                 {
//                     question: 'What color is a tree frog?',
//                     is_active: true,
//                     // score
//                     answers: [{ "correct": true, "answer": "green" }, { "correct": false, "answer": "red" }, { "correct": false, "answer": "green" }, { "correct": false, "answer": "purple" }]
//                 }
//             ]
//         }
//     }
// })



// helpers
function splitToChunks(array, parts) {
    let result = [];
    for (let i = parts; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
}
