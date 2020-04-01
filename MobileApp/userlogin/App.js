import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text } from 'react-native';

import {AuthContext} from './components/context';

import SplashScreen from './components/screens/splashscreen';
import {AuthStackScreen} from "./components/navigators/authstack";
import {TabsScreen} from './components/navigators/bottomtabs';

export default function App({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSignout, setIsSignout] = React.useState(false);
  const [userToken, setUserToken] = React.useState(null);
  const [signInMessage, setSignInMessage] = React.useState(null);
    
  const RootStack = createStackNavigator();
  const RootStackScreen = () => (
    <RootStack.Navigator headerMode="none">
      {userToken ? (
        <RootStack.Screen
          name="App"
          component={TabsScreen}
          initialParams={{userToken: userToken}}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          initialParams={{message: signInMessage}}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      console.log('boorstrapAsync');
      try {
        userToken = await AsyncStorage.getItem('userToken');
        console.log('Token: ' + userToken);
      } catch (e) {
        userToken = null;
        console.log('error restoring token: ' + e);
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);
      setIsLoading(false);
      setSignInMessage(null);
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        fetch('http://192.168.0.107:8000/rest-auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: data.username, email: data.username, password: data.password }),
        })
        .then( res => res.json() )
        .then( res => {
            console.log('received login response');
            console.log(res);
            if(res.key) {
              AsyncStorage.setItem('userToken', res.key)
              .then(() => {
                setIsSignout(false);
                setSignInMessage(null);
                setUserToken(res.key);
              });
            }
            else {
              console.log('Invalid username and/or password.');
              data.setSignInMessage('Invalid username and/or password.');
            }
        })
        .catch( error => console.log('signin error ' + error) );
      },
      signOut: async () => {
        await AsyncStorage.removeItem('userToken').then(res => {
        setIsSignout(true);
        setUserToken(null);
        setSignInMessage(null);
        });
      },
      signUp: async data => {
        fetch('http://192.168.0.107:8000/rest-auth/registration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: data.username, 
                                    email: data.username, 
                                    password1: data.password,
                                    password2: data.password,  
                                }),
        })
        .then( res => res.json() )
        .then( res => {
            console.log(res);
            if(res.detail) {
              data.navigateBack(res.detail);
            }
            else {
              var email='', password='';
              if(res.email) { email = res.email; }
              if(res.password1) { password = res.password1; }
              data.setSignUpMessage(email, password);
            }
        });
      },
      resetPassword: async data => {
        fetch('http://192.168.0.107:8000/rest-auth/password/reset/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: data.username }),
        })
        .then( res => res.json() )
        .then( res => {
            console.log(res);
            if (res.email) {
              console.log('email: ' + res.email[0]);
              data.setResetMessage(res.email[0]);
            }
            else {
              console.log('detail: ' + res.detail);
              data.navigateBack(res.detail);
            }
        })
        .catch( error => console.log('signin error ' + error) );
      },
    }),
    []
  );
  console.log('app js rendering');
  if (isLoading) {
    console.log('isLoading');
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
