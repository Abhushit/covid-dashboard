import React, { useEffect } from "react";
import { auth } from "./../../firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../auth/Login";
import Dashboard from "../Dashboard/Dashboard";
import DrawerMUI from "./../materialUI/DrawerMUI";
import Blog from "../Dashboard/Blogs";
import Hospital from "../Dashboard/Hospitals";

const Routing = (props) => {
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //the user logged in
      } else {
        // the user logged out
        console.log("err");
      }
    });
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            {!auth.currentUser ? (
              <Login />
            ) : (
              <>
                <DrawerMUI /> <Dashboard />
              </>
            )}
          </Route>
          {auth.currentUser && 
            <>
              <Route path="/dashboard">
                <DrawerMUI />
                <Dashboard />
              </Route>
              <Route path="/blogs">
                <DrawerMUI />
                <Blog />
              </Route>
              <Route path="/hospitals">
                <DrawerMUI />
                <Hospital />
              </Route>
            </>
          }
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Routing;
