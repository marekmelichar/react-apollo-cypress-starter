import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from './app/cache';
import './index.css';
import App from './app/App';
// import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  cache,
});

const target = document.getElementById('react-apollo-cypress-starter');
if (target) {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    target,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
