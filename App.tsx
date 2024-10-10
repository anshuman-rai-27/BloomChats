/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
import { decrypt, encrypt, generateKey } from './utils';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState("");
  const [textField, setTextField] = useState("");
  const [text1Field, setText1Field] = useState("");
  const [decryptData, setDecryptData] = useState(""); 
  const [key,setKey] = useState("");
  useEffect(()=>{
    setKey(generateKey());
  },[])
  function encryptg(){
    setData(encrypt(textField, key));
  }
    console.log(data)
  function decryptg(){
    setDecryptData(decrypt(text1Field, key));
  }
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <TextInput onChangeText={setTextField}/>
      <Button onPress={()=>{
        encryptg();
      }} title="Encrypt"/>
      <Text>Encrypted Text</Text>
      <Text>{data}</Text>
      <TextInput onChangeText={setText1Field}/>
      <Button onPress={()=>{
        decryptg();
      }} title="Decrypt"/>
      <Text>Decrypt Text</Text>
      <Text>{decryptData}</Text>
      {children}
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Section title="life">

    </Section>
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
