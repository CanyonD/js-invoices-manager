import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';

import Products   from "./Products";
import Customers  from "./Customers";
import Invoices   from "./Invoices";

const customHistory = createBrowserHistory();

const muiTheme = getMuiTheme({ userAgent: false });

class App extends Component {
  componentDidMount() {
    injectTapEventPlugin();
  }
  render() {
    return (
      <Router history={customHistory}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/invoices" className="navbar-brand">
                  Invoice App
                </Link>
              </div>
              <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li>
                    <NavLink to="/products">Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="/customers">Customers</NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/invoices">
                      Invoices
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Route exact path="/" component={Products} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/customers" component={Customers} />
          <Route exact path="/invoices" component={Invoices} />
        </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
