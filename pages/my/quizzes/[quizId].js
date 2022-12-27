import { useRouter } from 'next/router';

const MyQuizId = () => {
    const router = useRouter();

    return (
        <div className="text-center mt-10">
            <h2>My Quiz ID: {router.query?.quizId}</h2>

            <p className="mt-10">
                This page will server for showing all information regaridng the quiz owner's stats on this quiz 
            </p>
        </div>
    );
};

export default MyQuizId;
