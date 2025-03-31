import { StyleSheet, Image, View as RNView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { router } from 'expo-router';

export default function TabTwoScreen() {
  const [loginStatus, setLoginStatus] = useState(false);

  const handleLogin = () => {
    router.push("/login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.person}>
        {loginStatus ? (
          <RNView style={styles.profileContainer}>
            <Text style={styles.username}>AtlasKK</Text>
          </RNView>
        ) : (
          <RNView style={styles.notLoggedInContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>登录</Text>
            </TouchableOpacity>
          </RNView>
        )}
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  person: {
    backgroundColor: 'white',
    marginTop: 70,
    width: 340,
    borderRadius: 20,
    height: 100,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  notLoggedInContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  notLoggedInText: {
    fontSize: 16,
    color: '#888888',
    marginTop: 10,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#69abf1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  }
});