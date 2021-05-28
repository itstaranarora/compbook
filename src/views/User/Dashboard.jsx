import React, { useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Layout from "components/Layout";
import AddFolder from "components/AddFolder";
import Folder from "components/Folder";
import FolderBreadcrumbs from "components/FolderBreadcrumbs";
import { useFolder } from "hooks/useFolder";
import { useParams, useLocation } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { state = {} } = useLocation();
  const { currentUser, logout } = useAuth();
  const { folderId } = useParams();
  const history = useHistory();

  const { folder, childFolders } = useFolder(folderId, state.folder);

  const name = currentUser.email.substring(
    0,
    currentUser.email.lastIndexOf("@")
  );

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  console.log(folder);

  return (
    <>
      <Layout>
        <>
          <div className="py-20 text-center relative">
            <h3 className="text-4xl font-medium text-base-800 capitalize">
              Hi, {name} <span>👋</span>
            </h3>
            <div className="hidden lg:block shape1"></div>
            <div className="hidden lg:block shape2"></div>
          </div>
          <div className="py-5 border bg-white">
            <div className="container flex justify-between items-center">
              <FolderBreadcrumbs currentFolder={folder} />
              <AddFolder currentFolder={folder} />
            </div>
          </div>
          {childFolders.length > 0 && (
            <div className="container py-5 flex flex-wrap">
              {childFolders?.map((childFolder) => (
                <div key={childFolder.id}>
                  <Folder folder={childFolder} />
                </div>
              ))}
            </div>
          )}
        </>
      </Layout>
    </>
  );
}
