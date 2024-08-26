import "./index.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import momentWL from "moment-with-locales-es6";
import ReactGA from "react-ga4";
import "./i18next";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENT_ID);
momentWL.locale("hy-am");

ReactDOM.render(
  // <I18nextProvider>
  <Provider store={store}>
    <App />
  </Provider>,
  // </I18nextProvider>,
  document.getElementById("root")
);

reportWebVitals();
