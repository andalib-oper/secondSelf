import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import './ignoreWarnings';
import store from './redux/store';
import Config from './src/config';

const App = () => {
  return (
    <Provider store={store}>
      <Config />
    </Provider>
  );
};

export default App;

