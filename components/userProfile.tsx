import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { launchImageLibrary, ImagePickerResponse, ImageLibraryOptions } from 'react-native-image-picker';

interface User {
  name: string;
  dp?: string; 
}

const UserProfileComponent: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: '',
    dp: undefined,
  });

  const handleUpdateProfile = (updatedData: Partial<User>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
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
      quality: 1,
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
    Alert.alert('Profile updated successfully');
  };

  const handleBackPress = () => {
    // Implement your logic to navigate back or close the profile
    Alert.alert('Back button pressed');
  };

  return (
    <ImageBackground
      source={require('../assets/images/chat1.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Image
          source={require('../assets/images/back.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <Text style={styles.title}>User Profile</Text>
      <TouchableOpacity onPress={handleImagePick}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: user.dp || 'https://via.placeholder.com/100',
            }}
            style={styles.dp}
          />
          <View style={styles.iconContainer}>
            <Image
              source={require('../assets/images/editIcon.png')}
              style={styles.icon}
            />
          </View>
        </View>
      </TouchableOpacity>

      <Text style={styles.name}>Name</Text>
      <TextInput
        style={styles.input}
        value={user.name}
        onChangeText={(text) => handleUpdateProfile({ name: text })}
        placeholder="Enter your name"
      />

      {/* Styled Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      {/* Styled Logout button */}
      <TouchableOpacity style={[styles.saveButton, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout !</Text>
      </TouchableOpacity>
    </ImageBackground>
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  name: {
    marginRight: 200,
    fontWeight: 'bold',
    marginTop: 20,
    color:'#DD651B',
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    color: 'white',
  },
  imageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  dp: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderColor: '#000',
    borderWidth: 3,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#bbb',
    borderWidth: 0,
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 4,
  },
  input: {
    marginTop: 20,
    paddingLeft: 40,
    width: '100%',
    color: 'white',
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#DD651B',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  logoutButton: {
    marginTop: 60,
    backgroundColor:'grey',
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UserProfileComponent;
