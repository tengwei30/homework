import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Login from './components/login'
import Register from './components/register'
function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">登录</Link>
        </li>
        <li>
          <Link to="/register">注册</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
