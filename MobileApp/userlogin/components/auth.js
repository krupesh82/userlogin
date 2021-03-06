import { AsyncStorage } from "react-native";

export const USER_KEY = 'AUTH_TOKEN';

export const onSignIn = token => AsyncStorage.setItem(USER_KEY, token);

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        console.log('res');
        console.log(res);
        if (res !== null) {
          resolve(res);
        } else {
          resolve('');
        }
      })
      .catch(err => reject(err));
  });
};
