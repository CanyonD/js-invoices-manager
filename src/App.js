import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Router, Route, Link, NavLink } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import Products from "./Products";
import Product from "./Product";
import Customers from "./Customers";
import Invoices from "./Invoices";
import Invoice from "./Invoice";
import NotFound from "./NotFound";

import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();
const muiTheme = getMuiTheme({ userAgent: false });

class App extends Component {
  componentDidMount() {
    injectTapEventPlugin();
  }
  render() {
    return (
      <Router history={history}>
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
                      <NavLink exact to="/invoice/0">
                        Invoices
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <Route exact path="/" component={Invoices} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/product/:id" component={Product} />
            <Route exact path="/customers" component={Customers} />
            <Route exact path="/invoices" component={Invoices} />
            <Route exact path="/invoice/:id" component={Invoice} />
            <Route path="*" component={NotFound} status={404} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
