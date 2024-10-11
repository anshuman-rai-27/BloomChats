import React from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, ImageBackground } from 'react-native';

const Chatbox = () => {
  const messages = [
    { id: '1', text: 'Hey, how are you?', sender: 'me' },
    { id: '2', text: 'I am good, thanks! How about you?', sender: 'them' },
    { id: '3', text: 'What are you up to?', sender: 'me' },
    { id: '4', text: 'Just working on some projects.', sender: 'them' },
    // Add more messages as needed
  ];

  const renderMessage = ({ item }) => (
    <View style={item.sender === 'me' ? styles.myMessageBubble : styles.theirMessageBubble}>
      <Text style={item.sender === 'me' ? styles.myMessageText : styles.theirMessageText}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/images/login_imagef1.jpg')} // Replace with your image path
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  messageList: {
    paddingBottom: 100, // Add padding to avoid message overlap with bottom nav
  },
  myMessageBubble: {
    backgroundColor: '#DD651B', // Color for the sender's bubble
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    alignSelf: 'flex-end', // Aligns the bubble to the right
    maxWidth: '80%', // Limits the width of the bubble
  },
  theirMessageBubble: {
    backgroundColor: '#333', // Color for the receiver's bubble
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    alignSelf: 'flex-start', // Aligns the bubble to the left
    maxWidth: '80%', // Limits the width of the bubble
  },
  myMessageText: {
    color: '#fff',
    fontSize: 16,
  },
  theirMessageText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Chatbox;
