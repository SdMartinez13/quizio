import Link from 'next/link';
import { useRouter } from 'next/router';
import prisma from '../../lib/prisma';

const CatName = ({ q }) => {
    const router = useRouter();
    console.log(router, 'ROUTER');
    console.log(router.query.catName)

    console.log(q, 'qqqqqqqq');
    return (
        <div className="bg-red-100 p-5">

            {q.map(item => {
                const b = '';
                return (
                    <Link href={`/q/${item.quiz_id}`} key={item.quiz_id} className="bg-blue-100 p-4 m-4 text-center inline-block">
                        <p>{item.title}</p>
                        <p>({item.questions?.length} questions)</p>
                    </Link>
                );
            })}
        </div>
    );
};

export default CatName;

export const getServerSideProps = async (context) => {
    // const categories = await prisma.categories.findMany();
    const name = context.params.catName;
    // get the router params
    // lowercase the url
    // find the categbory name in lowercase (prisma)

    const getQuizzes = await prisma.quizzes.findMany({
        where: {
            categories: {
                some: {
                    category: {
                        name: {
                            equals: name,
                            mode: 'insensitive',
                        },
                    },
                },
            },
        },
        include: {
            questions: {},
        },
    });

    return {
        props: { q: JSON.parse(JSON.stringify(getQuizzes)) },
    };
};

// CatName.propTypes = {
//     categories: PropTypes.array,
// };
