import React from "react";
import { useAuth } from "contexts/AuthContext";
import Layout from "components/Layout";
import AddFolder from "components/AddFolder";
import AddComponent from "components/AddComponent";
import Folder from "components/Folder";
import Component from "components/Component";
import FolderBreadcrumbs from "components/FolderBreadcrumbs";
import { useFolder, ROOT_FOLDER } from "hooks/useFolder";
import { useParams, useLocation } from "react-router-dom";

export default function Dashboard() {
  const { state = {} } = useLocation();
  const { currentUser } = useAuth();
  const { folderId } = useParams();

  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  const name = currentUser.email.substring(
    0,
    currentUser.email.lastIndexOf("@")
  );

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
              <div className="flex space-x-2">
                {folder !== ROOT_FOLDER && (
                  <AddComponent currentFolder={folder} />
                )}
                <AddFolder currentFolder={folder} />
              </div>
            </div>
          </div>
          <div className="container py-5 flex flex-wrap">
            {childFolders?.map((childFolder) => (
              <div key={childFolder.id}>
                <Folder folder={childFolder} />
              </div>
            ))}
            {childFiles?.map((childFile) => (
              <div key={childFile.id}>
                <Component file={childFile} />
              </div>
            ))}
          </div>
        </>
      </Layout>
    </>
  );
}
