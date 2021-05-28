import React from "react";
import Layout from "components/Layout";
import Button from "elements/Button";

function CodePreview() {
  return (
    <Layout>
      <div
        style={{ height: "calc(100vh - 72px)" }}
        className="relative flex flex-col"
      >
        <div className="hidden lg:block shape1"></div>
        <div className="hidden lg:block shape2"></div>
        <div className="max-w-3xl flex-grow flex flex-col mx-auto w-full">
          <h2 className="pt-12 text-3xl text-center">Component Name</h2>
          <div className="rounded mt-5 bg-white shadow p-5">
            <button className="py-2 px-5 bg-primary-700 rounded-full text-white">
              This is demo
            </button>
          </div>
          <div className="mt-10 bg-black h-1/2"></div>
        </div>
      </div>
    </Layout>
  );
}

export default CodePreview;
