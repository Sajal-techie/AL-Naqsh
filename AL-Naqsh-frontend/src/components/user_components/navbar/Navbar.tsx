import  { useState } from "react";
import { Link } from "react-router-dom";
import SocialMedia from "../common/SocialMedia";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="z-50 bg-white sticky top-0 left-0 right-0 shadow-md">
      <header className="flex cursor-pointer text-black items-center mx-auto max-w-screen-xl container justify-between h-[5rem] px-4">
        <div className="w-[56px] h-[63px]">
          <img
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=112,fit=crop,q=95/m7V8PnDoX2ur9GvK/whatsapp-image-2023-10-15-at-22.21.49_prev_ui-dOqlV8w8rnUPzopk.png"
            alt=""
          />
        </div>

        <button
          className="md:hidden text-black font-bold"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>

        <ul
          className={`md:flex gap-7 ${
            isMenuOpen ? "block" : "hidden"
          } absolute md:static left-0 top-[5rem] w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0`}
        >
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={() => setIsMenuOpen(false)}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
        </ul>

        <SocialMedia className={`md:flex  hidden`} />
      </header>
    </div>
  );
};

export default Navbar;
