import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client";

import ProductListing from "./ProductListing";
import SingleProductDetails from "./SingleProductDetails";

const httpLink = createHttpLink({
  uri: "https://store-29iql3rwa6.mybigcommerce.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.REACT_APP_BIGCOMMERCE_TOKEN}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <h1>Mark Murphy's BigCommerce Store</h1>
          <Switch>
            <Route exact path="/" render={() => <ProductListing />} />
            <Route
              exact
              path="/product/:id"
              render={({ match }) => (
                <SingleProductDetails id={match.params.id} />
              )}
            />
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
