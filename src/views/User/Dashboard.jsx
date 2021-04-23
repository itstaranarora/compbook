import React, { useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Layout from "components/Layout";
import Button from "elements/Button";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Layout>
        <>
          <div className="bg-white py-20 text-center">
            <h3 className="text-4xl font-medium">Your Components</h3>
          </div>
          <div className="py-5 border bg-white">
            <div className="container flex justify-end">
              <Button className="py-2 px-3">Add Component</Button>
            </div>
          </div>
        </>
      </Layout>
    </>
  );
}
