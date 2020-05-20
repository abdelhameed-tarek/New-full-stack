import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Home from "./core/Home";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import PrivateRoute from "./routing/PrivateRoute";
import AdminRoute from "./routing/AdminRoute";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";

import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
// to connect store
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/user/dashboard"
            component={UserDashboard}
          />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <AdminRoute exact path="/create/category" component={AddCategory} />
          <AdminRoute exact path="/create/product" component={AddProduct} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
