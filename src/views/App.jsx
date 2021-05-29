import React from "react";
import Signup from "./Public/Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./User/Dashboard";
import Login from "./Public/Login";
import PrivateRoute from "components/PrivateRoute";
import ForgotPassword from "./Public/ForgotPassword";
import CodePreview from "./User/CodePreview";
import UpdateProfile from "./User/UpdateProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/folder/:folderId" component={Dashboard} />
          <PrivateRoute
            path="/component/:componentId"
            component={CodePreview}
          />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
