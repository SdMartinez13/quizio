import { useRouter } from "next/router";

const catName = () => {
    const router = useRouter();
    // console.log(router, 'ROUTER');
    return <div>I am HERE!!!</div>
}

export default catName;