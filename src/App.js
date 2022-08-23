import React from 'react';
import './App.css';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListing from './ProductListing';
import SingleProductDetails from './SingleProductDetails';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BIGCOMMERCE_URI,
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
  cache: new InMemoryCache({
    // https://www.apollographql.com/docs/react/caching/cache-configuration/#customizing-cache-ids
    typePolicies: {
      Site: {
        keyFields: [],
      },
    },
  }),
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <h1>BigCommerce Store</h1>
          <Routes>
            <Route path="/" element={<ProductListing />} />
            <Route path="/product/:id" element={<SingleProductDetails />} />
          </Routes>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
