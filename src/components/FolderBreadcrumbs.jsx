import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { ROOT_FOLDER } from "hooks/useFolder";

function FolderBreadcrumbs({ currentFolder }) {
  let path = [];
  if (currentFolder) path = [...path, ...currentFolder.path];
  console.log("path", path);

  return (
    <div className="flex items-center text-secondary-700 space-x-2">
      <Link to="/">
        <HomeIcon
          height="30px"
          className={`cursor-pointer ${
            currentFolder === ROOT_FOLDER && "text-base-900"
          }`}
        />
      </Link>
      {path.map((folder, index) => (
        <>
          <ChevronRightIcon height="20px" className="text-secondary-500" />
          <Link
            to={{
              pathname: `/folder/${folder.id}`,
              state: { folder: { ...folder, path: path.slice(1, index) } },
            }}
          >
            <h5 className="text-lg">{folder?.name}</h5>
          </Link>
        </>
      ))}

      {currentFolder !== ROOT_FOLDER && (
        <>
          <ChevronRightIcon height="20px" />
          <h5 className="text-lg text-base-900 font-medium">
            {currentFolder?.name}
          </h5>
        </>
      )}
    </div>
  );
}

export default FolderBreadcrumbs;
