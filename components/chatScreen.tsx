import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface Chat {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
}

const initialChats: Chat[] = [
  { id: '1', name: 'Tamuna12', message: 'You: ❤️', time: '12:21 PM', avatar: 'https://via.placeholder.com/50' },
  { id: '2', name: 'George9', message: 'Yes I agree with your suggestion and...', time: '12:21 PM', avatar: 'https://via.placeholder.com/50' },
  { id: '3', name: 'George', message: 'Yes I agree with your suggestion and...', time: '12:21 PM', avatar: 'https://via.placeholder.com/50' },
  { id: '4', name: 'Nick', message: 'You: How are you?', time: '12:22 PM', avatar: 'https://via.placeholder.com/50' },
  { id: '5', name: 'Anna', message: 'You: How are you? 😁', time: '12:21 PM', avatar: 'https://via.placeholder.com/50' },
  { id: '6', name: 'Anya', message: 'Yes I agree with your suggestion and...', time: '12:21 PM', avatar: 'https://via.placeholder.com/50' },
];

const ChatScreen: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteChat = (id: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
  };

  const handleLongPress = (id: string) => {
    Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete this chat?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteChat(id), style: "destructive" }
      ]
    );
  };

  // Animation for the add button
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleAddButtonPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1, // Scale up
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Scale back
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animation for bottom navigation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Final opacity value
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item.id)}
      style={styles.chatItem}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage}>{item.message}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.profilePic} />
        <Text style={styles.greeting}>Welcome, Mariam!</Text>
        <Icon name="bell-outline" size={24} color="#FFA500" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={24} color="#bbb" style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#bbb"
          style={styles.searchBar}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />

      {/* Bottom Navigation with Animation */}
      <Animated.View style={[styles.bottomNav, { opacity: fadeAnim }]}>
        <TouchableOpacity>
          <Icon name="home-outline" size={28} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="phone-outline" size={28} color="#fff" />
          <Text style={styles.navLabel}>Calls</Text>
        </TouchableOpacity>

        {/* Animated Add Button */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
            <Icon name="plus" size={28} color="#000" />
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity>
          <Icon name="account-outline" size={28} color="#fff" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="dots-horizontal" size={28} color="#fff" />
          <Text style={styles.navLabel}>More</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500',
    flex: 1,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    color: '#ffffff',
  },
  chatList: {
    paddingBottom: 80,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  chatMessage: {
    fontSize: 14,
    color: '#bbb',
  },
  time: {
    fontSize: 12,
    color: '#bbb',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFA500',
    borderRadius: 25,
    marginHorizontal: 16,
  },
  navLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default ChatScreen;
