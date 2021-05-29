import React, { useRef, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { Link } from "react-router-dom";
import Note from "elements/Note";
import LOGO from "assets/logoFull.png";
import Button from "elements/Button";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <div className="bg-gray-200 flex items-center font-sans text-gray-700 h-screen">
      <div className="container mx-auto p-4 flex">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="p-8">
              <div className="flex justify-center">
                <img src={LOGO} alt="logo compbook" />
              </div>
              <form className="mt-5" onSubmit={handleSubmit}>
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
                {error && <Note variant="danger">{error}</Note>}
                {message && <Note variant="success">{message}</Note>}
                <Button
                  loading={loading}
                  loadingText="authenticating"
                  className="w-full p-3 mt-4"
                >
                  Reset Password
                </Button>
              </form>
            </div>

            <div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
              <Link to="/signup" className="font-medium text-indigo-500">
                Need an account? Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
