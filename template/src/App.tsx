import store from '@redux/store';
import checkLocalStorage from '@utils/handleLocalStorage';
import React, { useLayoutEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Routes from './navigations/Routes';
import './styles/unistyles';

const App = (): React.JSX.Element => {
  useLayoutEffect(() => {
    checkLocalStorage();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
