import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';

const Protected = () => {
    const session = useSession();
    console.log(session, ' ssession');

    useEffect(() => {
        if (session.status === 'unauthenticated') Router.replace('/auth?redirect=protected');
    }, [session.status]);
    return (
        <div className="mt-12 text-center">

            <p>This is a protected route</p>
        </div>
    );
};

export default Protected;
