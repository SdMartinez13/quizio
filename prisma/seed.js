const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const { customAlphabet } = require('nanoid');
const seedData = require('./quizSeedData');

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
}));

const categoryData = Object.keys(seedData.categories).map(item => ({ name: seedData.categories[item] }));

// steps
// create users
// create categories
//  - normalize categories for quizzes
// create quizzes (related to users and categories)

async function main() {
    console.log('Initiating Seeding');

    // create users
    await prisma.qUsers.createMany({ data: [{ first_name: 'John', last_name: 'Doe', email: 'JD@gmail.com' }, ...userData] });
    // end create users


    // create categories

    await prisma.categories.createMany({ data: categoryData });

    const getCategories = await prisma.categories.findMany();
    const normalizedCategories = getCategories.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.category_id }), {});
    // end create categories


    // add quizzes to users
    const getSomeUsers = await prisma.qUsers.findMany({
        take: usersWithSeedDataCOUNT, select: { user_id: true, first_name: true },
    });

    const splitQuizzes = splitToChunks([...seedData.quizzes], getSomeUsers.length);

    await Promise.all(
        getSomeUsers.map(async (user, ind) => {
            // console.log(user, 'user ===========')

            await Promise.all(
                splitQuizzes[ind].map(async item => {
                    const { questions, categories = [], ...rest } = item;

                    const categoriesSet = [...new Set(categories)];

                    const createdQuiz = await prisma.quizzes.create({
                        data: {
                            ...rest,
                            quiz_id: nanoid(),
                            user_id: user.user_id,
                            questions: {
                                create: questions,
                            },
                        },
                    });

                    // add category_quiz
                    await Promise.all(
                        categoriesSet.map(async cat => {
                            await prisma.categoryQuiz.create({
                                data: {
                                    quiz_id: createdQuiz.quiz_id,
                                    category_id: normalizedCategories[cat],
                                },
                            });
                        }),
                    );
                    // end add category_quiz
                }),
            );
        }),
    );
    // end add quizzes to users


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


// const demoSeed = async () => {
//     // this seeds the two default tables User and Post from the schema.prisma
//     const alice = await prisma.user.upsert({
//         where: { email: 'alice@prisma.io' },
//         update: {},
//         create: {
//             email: 'alice@prisma.io',
//             name: 'Alice',
//             posts: {
//                 create: {
//                     title: 'Check out Prisma with Next.js',
//                     content: 'https://www.prisma.io/nextjs',
//                     published: true,
//                 },
//             },
//         },
//     })

//     const bob = await prisma.user.upsert({
//         where: { email: 'bob@prisma.io' },
//         update: {},
//         create: {
//             email: 'bob@prisma.io',
//             name: 'Bob',
//             posts: {
//                 create: [
//                     {
//                         title: 'Follow Prisma on Twitter',
//                         content: 'https://twitter.com/prisma',
//                         published: true,
//                     },
//                     {
//                         title: 'Follow Nexus on Twitter',
//                         content: 'https://twitter.com/nexusgql',
//                         published: true,
//                     },
//                 ],
//             },
//         },
//     })
//     console.log({ alice, bob })
//     return true;
// }


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
//                     choices: [{ "correct": true, "choice": "green" }, { "correct": false, "choice": "red" }, { "correct": false, "choice": "green" }, { "correct": false, "choice": "purple" }]
//                 }
//             ]
//         }
//     }
// })


// helpers
function splitToChunks(array, parts) {
    const result = [];
    for (let i = parts; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
}
