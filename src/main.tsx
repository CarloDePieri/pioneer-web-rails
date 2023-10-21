import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { persistor, store } from "./app/store"
import App from "./App"
import "./index.css"
import { PersistGate } from "redux-persist/integration/react"
import "./i18n"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
