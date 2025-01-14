import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        Clothes
      </Link>

      {/* Links */}
      <div className="hidden space-x-6 md:flex">
        <Link
          href="/"
          className="decoration-red-600 decoration-4 underline-offset-8 hover:cursor-pointer hover:underline"
        >
          Home
        </Link>
        <Link
          href="/closet"
          className="decoration-red-600 decoration-4 underline-offset-8 hover:cursor-pointer hover:underline"
        >
          Closet
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="text-black md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
