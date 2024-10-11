/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StyleSheet,
  Text,
} from 'react-native';
import RootLayout from './_layout';
import { SignIn } from './auth_components/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatComponent } from './auth_components/ChatComponent';
import Home from './components/homepage';

export type RootStackParamList = {
  Login:undefined;
  Chat:undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const UI = false;

function App() {
  if(!UI){
  return (
    <RootLayout>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={SignIn} />
          <Stack.Screen name="Chat" component={ChatComponent} />
        </Stack.Navigator>
        </NavigationContainer>
    </RootLayout>)
  }
  return (
   <Home/>

  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
