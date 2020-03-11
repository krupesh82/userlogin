import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import SplashScreen from './components/screens/splashscreen';
import SignIn from "./components/screens/auth/signin";
import Home from "./components/screens/home";

const AuthContext = React.createContext();
const Stack = createStackNavigator();

export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
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

        // fetch('http://localhost:8000/accounts/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ username: username, password: password}),
        // })
        // .then( res => res.json() )
        // .then( res => {
        //     console.log(res.token);
        //     saveToken(res.token);
        //     props.navigation.navigate('Home');
        // })
        // .catch( error => console.log(error) );

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
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
            ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              initialParams={{ authContext: AuthContext }}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={Home} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}





// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";


// import { isSignedIn } from "./components/auth";
// // import { DrawerNav, BottomNav } from "./components/router";
// import LogIn from "./components/screens/auth/login";
// import Register from "./components/screens/auth/register";
// import Home from "./components/screens/home";

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       token: '',
//       checkedSignIn: false
//     };
//   }

//   componentDidMount() { 
//     isSignedIn()
//       .then(res => this.setState({ token: res, checkedSignIn: true }))
//       .catch(err => alert("An error occurred"));
//   }

//   render() {
//     const { checkedSignIn, token } = this.state;

//     // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
//     if (!checkedSignIn) {
//       return null;
//     }
//     const Stack = createStackNavigator();

//     return (
//       <NavigationContainer>
//         <Stack.Navigator>
//           {( token === '' || token === null ) ? (
//             <>
//               <Stack.Screen name="LogIn" component={LogIn} />
//               <Stack.Screen name="Register" component={Register} />
//             </>
//           ) : (
//             <>
//               <Stack.Screen name="Home" component={Home} />
//             </>
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }