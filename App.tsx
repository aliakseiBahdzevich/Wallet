/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RootNavigation from './src/navigation/rootNavigation';
import { store, persistor } from './src/redux/store/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';



function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <RootNavigation />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // или любой цвет, подходящий для вашего приложения
  },
});

export default App;
