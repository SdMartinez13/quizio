function CategoriesPage ({ categories }) {
    return (
        <div className="flex mt-10 p-4 gap-4">
            <div className="flex flex-wrap border underline">

                {categories.map(item => {
                    return (
                        <div key={item.category_id} className="bg-red-100 p-4 w-1/4 border border-black ">
                            {item.name}
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export const getServerSideProps = async () => {
    const feed = await prisma.post.findMany({
        where: { published: true },
        include: {
            author: {
                select: { name: true, email: true },
            },
        },
    });

    // include: { tags: { include: { tag: true } } },

    const quizzes = await prisma.quizzes.findMany({
        include: {
            questions: {},
            categories: { include: { category: true } }
        }
    })

    const categories = await prisma.categories.findMany()


    return {
        props: { feed, categories: JSON.parse(JSON.stringify(categories)), quizzes: JSON.parse(JSON.stringify(quizzes)) },
        // revalidate: 10,
    };
};

export default CategoriesPage;