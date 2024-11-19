/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'
import 'react-native-reanimated'
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



function App(): React.JSX.Element {
  
  // const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  // const theme = isDarkMode ? themes.dark : themes.light;
  const height = StatusBar.currentHeight
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <View style={{height: height, backgroundColor: 'red'}}/>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <RootNavigation />
          </SafeAreaView>
    
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight
  },
});

export default App;
