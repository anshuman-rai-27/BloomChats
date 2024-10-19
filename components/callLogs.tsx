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
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { useConvex, useConvexAuth, useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Id } from '../convex/_generated/dataModel';

const { width, height } = Dimensions.get('window');

type chatScreenProp = NativeStackNavigationProp<RootStackParamList, "Chat">

const Calls = ({ route }: { route: RouteProp<any> }) => {
  const [chats, setChats] = useState<any[]>([]);
  const [friendChat, setFriendChat] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<chatScreenProp>();
  const removeFriend = useMutation(api.users.removeFriendShip)
  const user = useQuery(api.users.getUser,{
    email:route.params!.email
  })
  const group = useQuery(api.calllog.getCallLog,{
    fromEmail:route.params!.email
  })
  useEffect(()=>{
    if(group)
      setChats(group)
  },[group])
  const filteredChats = chats.filter((chat: any) =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

    navigation.navigate('DmCreate',{email:route.params?.email})
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

  const renderChatItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.chatItem}
    >
      <Image source={{ uri: item.image ?? "https://via.placeholder.com/50" }} style={styles.avatar} />
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.user.name ?? item.user.email}</Text>
        <Text style={{...styles.chatName, fontSize:10}}>{new Date(item._creationTime).toDateString()} {new Date(item._creationTime).toTimeString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>BloomChats</Text>
        <TouchableOpacity onPress={()=>{ navigation.navigate('Profile',{email:route.params!.email})
        }} >
          <Icon name="ellipsis-v" size={18} color="#fff"   />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { width: width * 0.9 }]}>
        <Icon name="search" size={20} color="#bbb" style={styles.searchIcon} />
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
        keyExtractor={(item) => item._id}
        contentContainerStyle={[styles.chatList, { paddingBottom: height * 0.2 }]}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddButtonPress}>
        <Icon name="plus" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Navbar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={()=>{
          navigation.navigate('Chat',{email:route.params!.email})
        }}>
          <Icon name="home" size={20} color="#bbb" />
          <Text style={styles.navIcons}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={()=>{
          navigation.navigate('GroupChatScreen',{email:route.params!.email})
        }}>
          <Icon name="users" size={20} color="#bbb" />
          <Text style={styles.navIcons}>Groups</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={()=>{
          navigation.navigate('BillSplit',{email:route.params!.email})
        }}>
          <Icon name="money-bill-alt" size={20} color="#bbb" />
          <Text style={styles.navIcons}>Bill Split</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="phone-alt" size={20} color="#DD651B" />
          <Text style={styles.navIcons}>Calls</Text>
        </TouchableOpacity>

      

       

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 20,
  },
  navIcons: {
    fontSize: 12,
    fontWeight:'800',
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 25,
    paddingStart:2,
    marginBottom: 16,
  },
  searchIcon: {
    marginLeft: 18,
    marginRight:5,
  },
  searchBar: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  chatList: {
    alignItems: 'center',
  },
  chatItem: {
    width:width,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#DD651B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#121212',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: 'center',
  },
});

export default Calls;