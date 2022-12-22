/* global prisma */
import Link from 'next/link';
import PropTypes from 'prop-types';

function CategoriesPage({ categories }) {
    return (
        <div className="flex mt-10 p-4 gap-4">
            <div className="flex flex-wrap border underline">

                {categories.map(item => {
                    console.log(item, 'item');
                    return (
                        <Link href={`categories/${item.name.toLowerCase()}`} key={item.category_id} className="bg-red-100 m-4 p-4 w-1/4 border border-black ">
                            {item.name}
                        </Link>
                    );
                })}

            </div>
        </div>
    );
}

export const getServerSideProps = async () => {
    const categories = await prisma.categories.findMany();

    return {
        props: { categories: JSON.parse(JSON.stringify(categories)) },
    };
};

export default CategoriesPage;

CategoriesPage.propTypes = {
    categories: PropTypes.array,
};
