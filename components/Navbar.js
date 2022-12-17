import Link from "next/link"
import ActiveLink from "./ActiveLink";

const Navbar = () => {

  return (
    <div className="flex flex-wrap space-x-10 items-center my-4 mx-auto max-w-screen-xl px-4 md:px-6 py-2.5 bg-white border-gray-200 dark:bg-gray-200 shadow-lg">
      <ActiveLink href="/">Home</ActiveLink>
      <ActiveLink href="/tests">My Tests</ActiveLink>
      <ActiveLink href="/about">About</ActiveLink>


    </div>
  );

};

export default Navbar;