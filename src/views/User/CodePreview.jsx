import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { database } from "../../firebase";
import Editor from "@monaco-editor/react";
import { useParams, useHistory } from "react-router-dom";

function CodePreview() {
  const { componentId } = useParams();
  const [srcDoc, setSrcDoc] = useState("");
  const history = useHistory();
  const [currentCompoent, setCurrentCompoent] = useState({});

  useEffect(() => {
    database.files
      .doc(componentId)
      .get()
      .then((doc) => {
        setCurrentCompoent(database.formatDoc(doc));
      })
      .catch(() => {
        history?.push("/");
      });
    // eslint-disable-next-line
  }, [componentId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
          <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"><link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body>${currentCompoent?.content}</body>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [currentCompoent?.content]);

  const handleSave = () => {
    if (currentCompoent?.name === "") {
      alert("Component name is required!");
      return;
    }

    database.files
      .doc(componentId)
      .update(currentCompoent)
      .then(() => alert("Component Saved!"));
  };

  const handleDelete = () => {
    database.files
      .doc(componentId)
      .delete()
      .then(() => {
        alert("Component Deleted!");
        history.push("/");
      });
  };

  return (
    <Layout>
      <div
        style={{ height: "calc(100vh - 72px)" }}
        className="relative flex flex-col"
      >
        <div className="hidden lg:block shape1"></div>
        <div className="hidden lg:block shape2"></div>
        <div className="max-w-3xl flex-grow flex flex-col mx-auto w-full">
          <input
            type="text"
            className="mt-12 bg-transparent text-3xl text-center"
            maxLength="30"
            value={currentCompoent?.name}
            onChange={(e) => {
              setCurrentCompoent((pre) => ({ ...pre, name: e.target.value }));
            }}
          />
          <div className="rounded mt-5 bg-white shadow p-5">
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </div>
          <div className="mt-5 h-1/2">
            <Editor
              theme="vs-dark"
              language="html"
              value={currentCompoent?.content}
              onChange={(value) =>
                setCurrentCompoent((pre) => ({ ...pre, content: value }))
              }
              loading={"Loading..."}
            />
          </div>
          <div className="flex justify-center space-x-5 mt-5">
            <button
              onClick={handleSave}
              className="bg-primary-600 hover:bg-primary-500 py-3 text-white rounded-full w-28"
            >
              Save
            </button>
            <button
              onClick={handleDelete}
              className="bg-secondary-500 hover:bg-primary-500 py-3 text-white rounded-full w-28"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CodePreview;
