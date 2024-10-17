// UserProfileComponent.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary, ImagePickerResponse, ImageLibraryOptions } from 'react-native-image-picker';

interface User {
  name: string;
  dp?: string; 
}

const UserProfileComponent: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: 'John Doe',
    dp: undefined, // Start with no image
  });

  const handleUpdateProfile = (updatedData: Partial<User>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
    Alert.alert('Profile updated successfully');
  };

  const handleLogout = () => {
    Alert.alert('Logged out successfully');
    // Perform your logout logic here
  };

  const handleImagePick = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8, // Use a numeric value between 0 and 1 for quality
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          handleUpdateProfile({ dp: uri });
        }
      }
    });
  };

  const handleSave = () => {
    if (user.name.trim() === '') {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    handleUpdateProfile({ name: user.name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <TouchableOpacity onPress={handleImagePick}>
        <Image
          source={{
            uri: user.dp || 'https://via.placeholder.com/100', // Use a default image if no dp is set
          }}
          style={styles.dp}
        />
      </TouchableOpacity>
      <Button title={user.dp ? "Change User Image" : "Add User Image"} onPress={handleImagePick} />
      <TextInput
        style={styles.input}
        value={user.name}
        onChangeText={(text) => handleUpdateProfile({ name: text })}
        placeholder="Enter your name"
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white', // Updated for better contrast
  },
  dp: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
   
  },
});

export default UserProfileComponent;
