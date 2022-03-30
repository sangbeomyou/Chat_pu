import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import persistReducer from "./reducers/rootReducer";
import { BrowserRouter } from "react-router-dom";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const logger = createLogger();
const store = createStore(
  persistReducer,
  composeWithDevTools(applyMiddleware(logger))
);
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
