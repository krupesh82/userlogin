import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import SplashScreen from './components/screens/splashscreen';
import SignIn from "./components/screens/auth/signin";
import SignUp from "./components/screens/auth/signup";
import PasswordReset from "./components/screens/auth/passwordreset";
import Home from "./components/screens/home";

const AuthContext = React.createContext();
const Stack = createStackNavigator();

export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      console.log(action);
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            signInMessage: null,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            signInMessage: null,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            signInMessage: null,
          };
        // case 'SIGN_IN_MESSAGE':
        //   return {
        //     ...prevState,
        //     isSignout: true,
        //     userToken: null,
        //     signInMessage: action.message,
        //   };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      signInMessage: null,
    }
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
        console.log('error restoring token: ' + e);
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
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
            if(res.key)
              dispatch({ type: 'SIGN_IN', token: res.key });
            else {
              console.log('Invalid username and/or password.');
              data.setSignInMessage('Invalid username and/or password.');
              // dispatch({ type: 'SIGN_IN_MESSAGE', message: 'Invalid username and/or password.' });
              // navigation('SignIn');
            }
        })
        .catch( error => console.log('signin error ' + error) );
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
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
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
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
              // dispatch({ type: 'SIGN_IN_MESSAGE', message: res.email });
            }
            else {
              console.log('detail: ' + res.detail);
              data.navigateBack(res.detail);
              // dispatch({ type: 'SIGN_IN_MESSAGE', message: res.detail });
            }
        })
        .catch( error => console.log('signin error ' + error) );
      },
    }),
    []
  );

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
            ) : 
            (state.userToken == null ? (
              // No token found, user isn't signed in
              <>
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  initialParams={{ authContext: AuthContext, message: state.signInMessage }}
                  options={{
                    title: 'Sign in',
                  }}
                />
                <Stack.Screen
                  name="PasswordReset"
                  component={PasswordReset}
                  initialParams={{ authContext: AuthContext }}
                  options={{
                    title: 'Reset Password',
                  }}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                  initialParams={{ authContext: AuthContext }}
                  options={{
                    title: 'Sign Up',
                  }}
                />
              </>
              )
             : (
              // User is signed in
              <Stack.Screen name="Home" component={Home} />
              )
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
