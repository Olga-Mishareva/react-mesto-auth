import React from "react";
import { Route, Redirect } from "react-router-dom";


// function ProtectedRoute({ loggedIn, children, ...props }) {
//   return (
//     <Route {...props}>
//       {loggedIn ? children : <Redirect to="/sing-in" />}
//     </Route>
//   )
// }

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />}
    </Route>
  )
}

export default ProtectedRoute;