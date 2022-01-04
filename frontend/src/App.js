import Home from "./page/home/Home";

import Profile from "./page/home/profile/Profile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./page/home/login/Login";
import Register from "./page/home/register/Register";
import { useContext } from "react";
import { Authcontext } from "./context/AuthContext";

function App() {
  const { user } = useContext(Authcontext);

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          {user ? <Home /> : <Login />}
        </Route>
        <Route exact path='/login'>
          {user ? <Redirect to='/' /> : <Login />}
          {/* <Login /> */}
        </Route>
        <Route exact path='/register'>
          {user ? <Redirect to='/' /> : <Register />}
        </Route>
        {/* <Register /> */}
        <Route exact path='/profile/:username'>
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
