import React from 'react';
import {Provider} from 'react-redux';
import Main from './src/screen/Main';
import {mystore} from './src/newredux/MyStore';
import 'react-native-gesture-handler';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';

let persistor = persistStore(mystore);

const App = () => {
  return (
    <Provider store={mystore}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
