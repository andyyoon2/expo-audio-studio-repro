import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { ExpoAudioStreamModule } from '@siteed/expo-audio-studio';

export default function App() {
  const [permissionStatus, setPermissionStatus] = useState<string>('Not requested');

  const requestPermissions = async () => {
    try {
      const { status, granted } = await ExpoAudioStreamModule.requestPermissionsAsync();
      setPermissionStatus(`Status: ${status}, Granted: ${granted}`);
      
      if (granted) {
        Alert.alert('Success', 'Microphone permission granted!');
      } else {
        Alert.alert('Denied', 'Microphone permission denied.');
      }
    } catch (error) {
      console.error('Permission request error:', error);
      setPermissionStatus(`Error: ${error}`);
      Alert.alert('Error', 'Failed to request permissions');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Audio Studio Test</Text>
      
      <TouchableOpacity style={styles.button} onPress={requestPermissions}>
        <Text style={styles.buttonText}>Request Microphone Permission</Text>
      </TouchableOpacity>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Permission Status:</Text>
        <Text style={styles.statusText}>{permissionStatus}</Text>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    minWidth: 300,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
});
