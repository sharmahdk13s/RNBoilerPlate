import store from '@redux/store';
import checkLocalStorage from '@utils/handleLocalStorage';
import React, { useLayoutEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Routes from './navigations/Routes';
import './styles/unistyles';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  useLayoutEffect(() => {
    checkLocalStorage();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Routes />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
