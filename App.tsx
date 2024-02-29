import React from 'react';

import {Provider} from 'react-redux';
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {PersistGate} from 'redux-persist/integration/react';

import StackNav from './src/navigation/StackNav';
import {persistor, store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GluestackUIProvider config={config}>
          <StackNav />
        </GluestackUIProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
