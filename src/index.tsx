import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { ThemeProvider } from "styled-components"
import { DefaultTheme } from "styled-components"
import * as serviceWorker from "./serviceWorker"

const theme: DefaultTheme = {
  background: "#E5CB90",
  text: "#4C3800",
  darkText: "white",
  darkBackground: "#4C3800",
  border: "#DBB561",
  ascent1: "#5DAB7C",
  ascent2: "#BB6B62",
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
