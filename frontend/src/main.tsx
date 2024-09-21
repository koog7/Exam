import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {persistor, store} from "./app/store.ts";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <PersistGate persistor={persistor}>
                  <App />
              </PersistGate>
          </BrowserRouter>
      </Provider>
  </StrictMode>,
)
