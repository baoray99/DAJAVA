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
import Cart from "../src/pages/cart/Cart";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute path="/drink/*" component={Layouts} />
          <ProtectedRoute exact path="/cart" component={Cart}></ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}
