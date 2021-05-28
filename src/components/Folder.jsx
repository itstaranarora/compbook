import React from "react";
import { Link } from "react-router-dom";

function Folder({ folder }) {
  return (
    <Link
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
    >
      <div className="p-5 border hover:bg-gray-100 cursor-pointer items-center flex bg-white mr-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-primary-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        <h4 className="ml-3">{folder.name}</h4>
      </div>
    </Link>
  );
}

export default Folder;
