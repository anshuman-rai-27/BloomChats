
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
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatComponent } from './auth_components/ChatComponent';
import CallPage from './components/call';
import Home from './components/homepage';
import Login from './components/login';

import Chatbox from './components/chatbox';
import { Id } from './convex/_generated/dataModel';
import GroupComponent from './components/groupCreate';
import Testing from './auth_components/Testing';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from './components/register';
import DmCreate from './components/dmCreate';
import ChatScreen from './components/chatScreen';
import { VerificationScreen } from './components/verification';
import { UsernameComponent } from './components/username';
import { DmChatbox } from './components/dm';

export type RootStackParamList = {
  CallPage:{email:string, groupId:Id<'groups'>, name:string};
  Login: undefined;
  Chat: { email: string };
  DmChat:{fromId:string, toId:string};
  DmCreate:{email:string},
  Register: undefined;
  Verification:{email:string, password:string, type:'signUp'|'signIn'},
  GroupChat: { groupId: Id<'groups'>; email: string };
  GroupCreate: {email:string};
  Username:{email:string};
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {

  return (
    <RootLayout>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{
          headerShown: false
        }} initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="DmChat" component={DmChatbox} />
          <Stack.Screen name="DmCreate" component={DmCreate} />
          <Stack.Screen name="GroupCreate" component={GroupComponent} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="Username" component={UsernameComponent} />
          <Stack.Screen name="GroupChat" component={Chatbox}/>
          <Stack.Screen name="CallPage" component={CallPage}/>
        </Stack.Navigator>
      </NavigationContainer>
    </RootLayout>)
}

export default App;
