import React, { Component, Fragment } from 'react';
import Nav from './src/navigation';
import { Loader } from './src/components';
import { StoreProvider } from './src/context/store';

export default class App extends Component {
  render() {
    return (
      <StoreProvider>
        <Nav />
        <Loader />
      </StoreProvider>
    )
  }
}
