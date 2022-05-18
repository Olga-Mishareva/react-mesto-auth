import React from "react";
import { Route, Redirect } from "react-router-dom";

// function ProtectedRoute({ components: Components, ...props }) {
//   console.log(Components)
//   return (
//     <Route>
//       {
//         () => !props.loggedIn ? <Redirect to="/login" /> : Components.forEach(Component => <Component {...props} />)  
//       }
//     </Route>
//   )
// }

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