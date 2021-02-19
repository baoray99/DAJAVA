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
          <Redirect exact from="/" to="/product/category=1" />
          {/* <Route exact path="/login" component={Login} /> */}
          <Route path="/product/*" component={Layouts} />
          <Route exact path="/cart" component={Cart}></Route>
        </Switch>
      </Router>
    </div>
  );
}
