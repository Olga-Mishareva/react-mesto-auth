import React from "react";
import { Route, Redirect } from "react-router-dom";


function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {
        () => !props.loggedIn ? <Redirect to="/sing-in" /> : <Component {...props} />  
      }
    </Route>
  )
}

export default ProtectedRoute;