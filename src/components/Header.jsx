import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div className="shadow sticky top-0 z-10 bg-white">
      <header className="container flex flex-wrap justify-between items-center py-5">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link to="/">
            <h3 className="text-2xl font-semibold">Compbook</h3>
          </Link>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" + (navbarOpen ? "flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col space-y-8 border-t-2 pt-5 mt-5 lg:pt-0 lg:mt-0 lg:border-t-0 lg:items-center lg:space-y-0 lg:flex-row list-none lg:ml-auto lg:space-x-10">
            <li className="lg:hidden">
              <NavLink
                to={"/update-profile"}
                activeStyle={{
                  color: "#000",
                }}
                className="text-secondary-800 hover:text-base-800"
              >
                My Account
              </NavLink>
            </li>
          </ul>
          <div className="hidden lg:flex items-center ml-4 pl-4 cursor-pointer border-l-2 text-base-600 hover:text-black">
            <Link to="/update-profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
