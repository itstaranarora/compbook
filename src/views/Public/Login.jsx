import React, { useRef, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Note from "elements/Note";
import Button from "elements/Button";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div className="bg-gray-200 flex items-center font-sans text-gray-700 h-screen">
      <div className="container mx-auto p-4 flex">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="p-8">
              <h1 className="text-4xl text-center mb-12 font-thin">Compbook</h1>

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
                    type="text"
                    name="password"
                    ref={passwordRef}
                    required
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>
                {error && <Note variant="danger">{error}</Note>}
                <Button
                  loading={loading}
                  loadingText="authenticating"
                  className="w-full p-3 mt-4"
                >
                  Login
                </Button>
              </form>
            </div>

            <div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
              <Link to="/signup" className="font-medium text-indigo-500">
                Create account
              </Link>

              <Link to="/forgot-password" className="text-gray-600">
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
