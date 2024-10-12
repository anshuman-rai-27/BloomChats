import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';

const Chatbox = () => {
  // Define different themes with corresponding background and bubble colors
  const themes = [
    { id: 1, name: 'Orange Theme', backgroundImage: require('../assets/images/chat1.jpg'), myBubble: '#DD651B', theirBubble: '#333' },
    { id: 2, name: 'Violet Theme', backgroundImage: require('../assets/images/chat_violet.jpg'), myBubble: '#6A0DAD', theirBubble: '#333' },
   
    { id: 3, name: 'Minimal Theme', backgroundImage: require('../assets/images/chat_white.jpg'), myBubble: '#333', theirBubble: '#000000' },
    { id: 4, name: 'Yellow Theme', backgroundImage: require('../assets/images/chat_yellow.jpg'), myBubble: '#EAB613', theirBubble: '#333' },
    { id: 5, name: 'Pink Theme', backgroundImage: require('../assets/images/chat_pink.jpg'), myBubble: '#DA70A5', theirBubble: '#333' },
  ];

  // State to manage the current theme and message input
  const [selectedTheme, setSelectedTheme] = useState(themes[1]); // Default theme is now Orange
  const [isModalVisible, setModalVisible] = useState(false); // For the theme selector modal
  const [message, setMessage] = useState(''); // State for message input

  const messages = [
    { id: '1', text: 'Hey, how are you?', sender: 'me' },
    { id: '2', text: 'I am good, thanks! How about you?', sender: 'them' },
    { id: '3', text: 'What are you up to?', sender: 'me' },
    { id: '4', text: 'Just working on some projects.', sender: 'them' },
  ];

  const renderMessage = ({ item }) => (
    <View style={item.sender === 'me' ? [styles.myMessageBubble, { backgroundColor: selectedTheme.myBubble }] : [styles.theirMessageBubble, { backgroundColor: selectedTheme.theirBubble }]}>
      <Text style={item.sender === 'me' ? styles.myMessageText : styles.theirMessageText}>
        {item.text}
      </Text>
      {item.sender === 'me' && <View style={[styles.triangleMyMessage, { borderTopColor: selectedTheme.myBubble }]} />}
      {item.sender === 'them' && <View style={[styles.triangleTheirMessage, { borderTopColor: selectedTheme.theirBubble }]} />}
    </View>
  );

  // Toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Send message function
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { id: Date.now().toString(), text: message, sender: 'me' };
      messages.push(newMessage);
      setMessage(''); // Clear the input field after sending
    }
  };

  return (
    <ImageBackground
      source={selectedTheme.backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Image
              source={require('../assets/images/back.png')} // Replace with your back button icon path
              style={styles.iconImage} // Using the correct style here
            />
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <Image
              source={require('../assets/images/user.png')} // Replace with the user image path
              style={styles.userImage}
            />
            <Text style={styles.userName}>John Doe</Text>
          </View>

          {/* Three-Dot Button for Theme Selection */}
          <TouchableOpacity style={styles.threeDotButton} onPress={toggleModal}>
            <Text style={styles.threeDotText}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for Theme Selection */}
        <Modal transparent={true} visible={isModalVisible} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select Theme</Text>
              {themes.map((theme) => (
                <Pressable
                  key={theme.id}
                  style={styles.modalOption}
                  onPress={() => {
                    setSelectedTheme(theme);
                    toggleModal();
                  }}
                >
                  <View style={styles.themeOption}>
                    <View style={[styles.colorCircle, { backgroundColor: theme.myBubble }]} />
                    <Text style={styles.modalOptionText}>{theme.name}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </Modal>

        {/* Message List */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
        />

        {/* Message Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.messageInput, { borderColor: selectedTheme.myBubble }]}
            placeholder="Type a message..."
            placeholderTextColor="#ccc"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: selectedTheme.myBubble }]}
            onPress={sendMessage}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  backButton: {
    paddingRight: 0,
    justifyContent:'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -5,
  },
  userImage: {
    width: 30,

    height: 30,
    borderRadius: 20,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  threeDotButton: {
    padding: 10,
  },
  threeDotText: {
    color: 'white',
    fontSize: 24,
  },
  messageList: {
    paddingBottom: 100,
  },
  myMessageBubble: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    alignSelf: 'flex-end',
    maxWidth: '80%',
    position: 'relative',
  },
  theirMessageBubble: {
    borderRadius: 10,
    padding: 15,
    marginLeft: 2,
    marginVertical: 5,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    position: 'relative',
  },
  triangleMyMessage: {
    position: 'absolute',
    bottom: -5,
    right: 1,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
  },
  triangleTheirMessage: {
    position: 'absolute',
    top:1,
    left: -3,
    width: 0,
    height: 2,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
  },
  myMessageText: {
    color: '#fff',
    fontSize: 16,
  },
  theirMessageText: {
    color: '#fff',
    fontSize: 16,
  },

  // Icon image style
  iconImage: {
    width: 20,
    height: 20,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 250,
    padding: 20,
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOption: {
    marginVertical: 5,
    width: '100%',
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  modalOptionText: {
    fontSize: 16,
  },

  // Input styles
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#000',
    marginBottom: 15,
  },
  sendButton: {
    marginLeft: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Chatbox;