import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { RouteProp } from '@react-navigation/native';

const BotCreationPage = ({route}:{route:RouteProp<any>}) => {
  const [step, setStep] = useState(1);
  const [botName, setBotName] = useState('');
  const [description, setDescription] = useState('');
  const [commands, setCommands] = useState<string[]>(['']);
  const [actions, setActions] = useState<string[]>(['']);
  const [mediaFiles, setMediaFiles] = useState<string[]>(['']);
  const [links, setLinks] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>(['']);
  const createBot = useMutation(api.bot.createBot)
  const createCommand = useMutation(api.bot.createCommand)

  const handleNextStep = () => {
    if (step === 1) {
      if (botName.trim() === '') {
        Alert.alert('Error', 'Bot name cannot be empty');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (commands.some(command => command.trim() === '')) {
        Alert.alert('Error', 'All commands must be filled');
        return;
      }
      setStep(3);
    }
  };

  const handleCreateBot = async () => {
    const botId = await createBot({
      name:botName,
      description:description,
      groupId:route.params?.groupId
    })
    if(botId){
    for(let i = 0 ; i < commands.length ; i++){
      await createCommand({
        command:commands[i],
        action:links[i],
        botId:botId!
      })
    }
    Alert.alert('Success', `Bot "${botName}" created successfully!`);
    setBotName('');
    setDescription('');
    setCommands(['']);
    setActions(['']);
    setMediaFiles(['']);
    setLinks(['']);
    setTags(['']);
    setStep(1);}
  };

  const handleBackPress = () => {
    if (step > 1) {
      setStep(step - 1); 
    } else {
      Alert.alert('Back button pressed');
    }
  };

  const handleAddCommand = () => {
    if (commands.length < 2) {
      setCommands([...commands, '']);
      setActions([...actions, '']);
      setMediaFiles([...mediaFiles, '']);
      setLinks([...links, '']);
      setTags([...tags, '']);
    } else {
      Alert.alert('Limit Reached', 'You can only add up to 2 commands.');
    }
  };

  const handleCommandChange = (index: number, value: string) => {
    const newCommands = [...commands];
    newCommands[index] = value;
    setCommands(newCommands);
  };

  const handleActionChange = (index: number, value: string) => {
    const newActions = [...actions];
    newActions[index] = value;
    setActions(newActions);
  };


  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  return (
    <ImageBackground
      source={
        step === 1
          ? require('../assets/images/botPage.jpg')
          : step === 2
          ? require('../assets/images/botPage2.jpg')
          : require('../assets/images/botPage3.jpg')
      }
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.heading}>Create Bot</Text>

        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image
            source={require('../assets/images/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>

        {step === 1 && (
          <View style={styles.step1}>
            <Text style={styles.title}>Step 1 of 3</Text>
            <Text style={styles.label}>Bot Name</Text>
            <TextInput
              style={styles.input}
              value={botName}
              onChangeText={setBotName}
              placeholder="Enter bot name"
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter bot description"
              multiline
            />
            <TouchableOpacity style={styles.createButton} onPress={handleNextStep}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <ScrollView style={styles.page2}>
            <Text style={styles.title2}>Step 2 of 3</Text>
            {commands.map((command, index) => (
              <View key={index} style={styles.commandContainer}>
                <Text style={styles.label}>Command {index + 1}</Text>
                <TextInput
                  style={styles.input}
                  value={command}
                  onChangeText={value => handleCommandChange(index, value)}
                  placeholder="Enter command (e.g., /bot)"
                />
                <Text style={styles.label}>Action</Text>
                  <TextInput
                    style={styles.input}
                    value={links[index]}
                    onChangeText={value => handleLinkChange(index, value)}
                    placeholder="Enter any kind of text"
                  />
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={handleAddCommand}>
              <Icon name="add" size={30} color="#DD651B" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.createButton} onPress={handleNextStep}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {step === 3 && (
          <View style={styles.page3}>
            <Text style={styles.title}>Step 3 of 3</Text>
            <Text style={styles.confirmationText}>Confirm Bot Creation</Text>
            <Text style={styles.summary}>Bot Name: {botName}</Text>
            <Text style={styles.summary}>Description: {description}</Text>
            <Text style={styles.summary2}>Commands:</Text>
            {commands.map((command, index) => (
              <Text key={index} style={styles.summary}>
                {command} → {links[index]}
              </Text>
            ))}
            <TouchableOpacity style={styles.createButton} onPress={handleCreateBot}>
              <Text style={styles.buttonText}>Create Bot</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
  step1: {
    padding: 30,
    marginLeft: 10,
    marginRight:10,
    marginTop: 280,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderColor: '#000', 
    borderWidth: 2, 
    borderRadius: 5, 
    overflow: 'hidden', 
    elevation: 1, 
    shadowColor: '#bbb', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 3.5, // Shadow blur for iOS
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
   
  },
  title2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#bbb',
    fontWeight:'900',
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  createButton: {
    backgroundColor: '#DD651B',
    opacity:0.85,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
   
  
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight:'600',
  },
  addButton: {
    alignItems: 'center',
    marginVertical: 0,
  },
  commandContainer: {
    marginBottom:0,
    borderRadius: 8,
    padding: 0,
  },
  picker: {
    backgroundColor: '#000',
    borderRadius: 8,
    marginBottom: 10,
  },
  placeholderText: {
    color: '#666',
  },
  summary: {
    color: 'white',
    marginVertical: 5,
    padding: 10,
    fontWeight:'700',
  },
  summary2: {
    color: '#DD651B',
    marginVertical: 5,
    padding: 10,
    fontWeight:'700',
  },
  confirmationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  page2: {
    marginTop:0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderColor: '#000', 
    borderWidth: 2, 
    borderRadius: 5, 
    overflow: 'hidden', 
    elevation: 1, 
    shadowColor: '#bbb', 

  },
  page3: {
    marginTop:150,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderColor: '#000', 
    borderWidth: 2, 
    borderRadius: 5, 
    overflow: 'hidden', 
    elevation: 1, 
    shadowColor: '#bbb', 
  },

});

export default BotCreationPage;
