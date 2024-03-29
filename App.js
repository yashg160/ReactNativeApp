import React from 'react';
import Main from './components/MainComponent';
import { Loading } from './components/LoadingComponent';
import { Provider } from 'react-redux';
import {PersistGate } from 'redux-persist/es/integration/react'
import { ConfigureStore } from './redux/configureStore';

const {persistor, store} = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loading />}
          persistor={persistor}
        >
          <Main/>
        </PersistGate>
      </Provider>
    );
  }
}
