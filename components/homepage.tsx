import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';

const Home = () => {
  const defaultImage = require('../assets/images/login_imagef1.jpg'); // Default user image

  const contacts = [
    { id: '1', name: 'John Doe', image: defaultImage },
    { id: '2', name: 'Jane Smith', image: defaultImage },
    { id: '3', name: 'Alice Johnson', image: defaultImage },
    { id: '4', name: 'Bob Brown', image: defaultImage },
    // Add more contacts with the default image as needed
  ];

  const handleContactPress = (contactName) => {
    // Handle navigation to chat with the selected contact
    console.log(`Chat with ${contactName}`);
  };

  const renderContact = ({ item }) => (
    <TouchableOpacity style={styles.contactItem} onPress={() => handleContactPress(item.name)}>
      <Image source={item.image} style={styles.contactImage} />
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}>
        <Text style={styles.title}>Contacts</Text>

        <FlatList
          data={contacts}
          renderItem={renderContact}
          keyExtractor={(item) => item.id}
          style={styles.contactList}
          contentContainerStyle={styles.contactListContent}
        />
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Default background color
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '700',
  },
  contactList: {
    flexGrow: 0,
  },
  contactListContent: {
    paddingBottom: 60, // Ensure items are not hidden under the bottom nav
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.7)', // Transparent background
    padding: 10, // Adjusted padding for more space
    borderRadius: 10,
    marginBottom: 10,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10, // Reduced space between image and text
  },
  contactName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Background for bottom nav
    borderTopWidth: 1,
    borderColor: '#444',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    color: '#DD651B',
    fontSize: 16,
  },
});

export default Home;
