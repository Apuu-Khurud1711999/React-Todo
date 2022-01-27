import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink,Redirect } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Todo from './components/Todo';
import ChangePassword from './components/ChangePassword';
import Notfound from './components/Notfound';




class App extends Component {
  
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route  exact path="/"  component={Login}></Route>
            <Route  exact path="/register"  component={Register}></Route>
            <Route path="/dash" component={Dashboard}></Route>
            <Route path="/todo" component={Todo}></Route>
            <Route path="/changePass" component={ChangePassword}></Route>
            <Route exact component={Notfound}/>
          </Switch>
        </Router>


      </>
    );

  }
}
export default App;

