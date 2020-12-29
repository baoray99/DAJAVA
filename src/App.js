import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../src/pages/login/Login";
import ProtectedRoute from "../src/guard/ProtectedRoute";
import Layouts from "../src/layouts/mainLayout/MainLayout";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/*" component={Layouts} />
          {/* muon lay het path co trong layout thi cho path cho /* la dc */}
        </Switch>
      </Router>
    </div>
  );
}
