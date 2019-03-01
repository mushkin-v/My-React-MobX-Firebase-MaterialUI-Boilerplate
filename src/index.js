import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import dotenv from "dotenv";
import App from "./components/App";
import { Provider } from "mobx-react";
import store from "./stores";
import Firebase, { FirebaseContext } from "./components/Firebase";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import DevTools from "mobx-react-devtools";

dotenv.config();

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "Oswald",
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

ReactDOM.render(
  <Provider {...store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <MuiThemeProvider theme={theme}>
        <App />
        {/*<DevTools />*/}
      </MuiThemeProvider>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
