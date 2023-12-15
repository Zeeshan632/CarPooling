import React from 'react';
import Routes from './src/routes';
import { SafeAreaView, StatusBar } from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import {store} from './src/redux/store';
import {persistor} from './src/redux/store';
import {Toast} from 'react-native-toast-message/lib/src/Toast';


const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar backgroundColor={'white'}  />
          <Routes />
          <Toast />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
