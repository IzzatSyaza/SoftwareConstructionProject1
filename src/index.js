import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store, {Persistor} from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store} >
    {/* <PersistGate Loading={null} persistor={Persistor}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
);
