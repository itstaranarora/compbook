import Editor from '@monaco-editor/react';
import Layout from 'components/Layout';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { database } from '../../firebase';

function CodePreview() {
  const { componentId } = useParams();
  const history = useHistory();
  const [currentComponent, setCurrentComponent] = useState({ name: '', content: '' });
  const iframeRef = useRef(null);
  const iframeSrcDoc = `
    <html>
      <head>
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
        <script>
          window.onmessage = function(e) {
            if (e.data) {
              document.body.innerHTML = e.data;
            }
          };
        </script>
      </head>
      <body></body>
    </html>
  `;

  useEffect(() => {
    database.files
      .doc(componentId)
      .get()
      .then((doc) => {
        setCurrentComponent(database.formatDoc(doc));
      })
      .catch(() => {
        history?.push('/');
      });
    // eslint-disable-next-line
  }, [componentId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentComponent.content) {
        if (iframeRef && iframeRef.current) {
          iframeRef.current.contentWindow.postMessage(currentComponent.content, '*');
        }
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [currentComponent?.content]);

  const handleSave = () => {
    if (currentComponent?.name === '') {
      alert('Component name is required!');
      return;
    }
    database.files
      .doc(componentId)
      .update(currentComponent)
      .then(() => alert('Component Saved!'));
  };

  const handleDelete = () => {
    database.files
      .doc(componentId)
      .delete()
      .then(() => {
        alert('Component Deleted!');
        history.push('/');
      });
  };

  return (
    <Layout>
      <div style={{ height: 'calc(100vh - 72px)' }} className="relative flex flex-col">
        <div className="hidden lg:block shape1"></div>
        <div className="hidden lg:block shape2"></div>
        <div className="flex flex-col flex-grow w-full max-w-3xl mx-auto">
          <input
            type="text"
            className="mt-12 text-3xl text-center bg-transparent"
            maxLength="30"
            value={currentComponent?.name}
            onChange={(e) => {
              setCurrentComponent((pre) => ({ ...pre, name: e.target.value }));
            }}
          />
          <div className="p-5 mt-5 bg-white rounded shadow">
            <iframe
              ref={iframeRef}
              srcDoc={iframeSrcDoc}
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
              value={currentComponent?.content}
              onChange={(value) => setCurrentComponent((pre) => ({ ...pre, content: value }))}
              loading={'Loading...'}
            />
          </div>
          <div className="flex justify-center my-5 space-x-5">
            <button
              onClick={handleSave}
              className="py-3 text-white rounded-full bg-primary-600 hover:bg-primary-500 w-28">
              Save
            </button>
            <button
              onClick={handleDelete}
              className="py-3 text-white rounded-full bg-secondary-500 hover:bg-primary-500 w-28">
              Delete
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CodePreview;
