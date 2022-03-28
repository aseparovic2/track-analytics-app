import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import "./i18n"
import App from "./App"
import { ApolloProvider } from "@apollo/client"
import { client } from './graphql/ApolloClient/client'

const AppWithApollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<AppWithApollo/>, document.getElementById("root"))
serviceWorker.unregister()
