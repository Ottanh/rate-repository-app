import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    return await AsyncStorage.getItem(
      `${this.namespace}:accesstoken`,
    );
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:accesstoken`,
      accessToken
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accesstoken`);
  }
}

export default AuthStorage;