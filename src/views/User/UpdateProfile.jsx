import React, { useRef, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Layout from "components/Layout";
import Button from "elements/Button";
import Note from "elements/Note";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Layout>
      <div className="container mx-auto p-4 flex mt-20">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="p-8">
              <h1 className="text-4xl text-center mb-12 font-medium">
                Your Account
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    ref={emailRef}
                    placeholder={currentUser.email}
                    required
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>

                <div className="mb-5">
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    ref={passwordRef}
                    required
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="passwordConfirmRef"
                    ref={passwordConfirmRef}
                    required
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>
                {error && <Note variant="danger">{error}</Note>}
                <Button
                  loading={loading}
                  loadingText="Updating your account"
                  className="w-full p-3 mt-4"
                >
                  Update account
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
