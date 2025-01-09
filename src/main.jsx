import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import { MagicBellProvider } from "@magicbell/magicbell-react";

// Register the service worker
if ("serviceWorker" in navigator) {
  // window.addEventListener("load", () => {
  navigator.serviceWorker.register("/sw.js").then(
    (registration) => {
      console.log(
        "ServiceWorker registration successful with scope: ",
        registration.scope
      );
    },
    (error) => {
      console.log("ServiceWorker registration failed: ", error);
    }
  );
  // });
}
const apiKey = import.meta.env.VITE_MAGICBELL_API_KEY;
const vapidKey = import.meta.env.VITE_MAGICBELL_VAPID_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <MagicBellProvider
          apiKey={apiKey}
          vapidKey={vapidKey}
          userEmail="pwa.example.magicbell@gmail.com"
        >
          <App />
        </MagicBellProvider>
      </BrowserRouter>
    </Provider>
  </React.Fragment>
);

// serviceWorker.unregister()
