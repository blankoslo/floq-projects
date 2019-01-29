import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import { Router, browserHistory } from "react-router";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import apiMiddleware from "./middleware/api";
import routes from "./routes";
import reducers from "./reducers";

import "./styles/main.less";

// needed for material-ui, for nows

const createStoreWithMiddleware = compose(
  applyMiddleware(apiMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router history={browserHistory} routes={routes} />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("app")
);
