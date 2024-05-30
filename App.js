import React, { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import StatusBarComponent from './src/components/StatusBarComponent';
import store from './src/store';
// import { AppProvider } from './src/hooks/AppContext';

const App = () => {
  let [fontsLoaded] = Font.useFonts({
    'mulish-light': require('./assets/fonts/Mulish-Regular.ttf'),
    'mulish-regular': require('./assets/fonts/Mulish-Regular.ttf'),
    'mulish-bold': require('./assets/fonts/Mulish-Bold.ttf'),
    'mulish-semibold': require('./assets/fonts/Mulish-SemiBold.ttf'),
    'mulish-medium': require('./assets/fonts/Mulish-Medium.ttf'),
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load your assets or perform any necessary initialization here.
    // For demonstration purposes, we'll use a setTimeout to simulate loading.
    setTimeout(() => {
      setIsReady(true);
      SplashScreen.hideAsync();
    }, 3000); // Replace with your actual asset loading logic.
  }, []);

  if (!isReady) {
    SplashScreen.preventAutoHideAsync(); // Prevent auto-hide of the splash screen.
    return null; // You can return a loading indicator if needed.
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <Provider store={store}>
        <StatusBarComponent />
        <NavigationContainer>
          {/* <AppProvider> */}
          <AppNavigation />
          {/* </AppProvider> */}
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
