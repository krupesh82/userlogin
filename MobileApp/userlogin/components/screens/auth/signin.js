import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
// import { CheckBox } from 'react-native-elements';

export default function SignIn({ navigation, route }) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ message, setMessage ] = useState(route.params?.message);

    const { signIn } = React.useContext(route.params?.authContext);

    React.useEffect(() => {
        console.log('signin useEffect');
        setMessage(route.params?.message);
    }, []);
    const setSignInMessage = (message) => {
        setMessage(message);
    }
    return (
        <View>
            <Text>{ message } </Text>
            <Text>Username</Text>
            <TextInput
                placeholder="Enter your username"
                value={username}
                onChangeText={text => setUsername(text)}
                autoCapitalize = {"none"}
                autoCompleteType = {"email"}
                keyboardType = {"email-address"}
            />
            <Text>Password</Text>
            <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                autoCapitalize = {"none"}
                autoCompleteType = {"password"}
            />
            <Button onPress={() => signIn({ username, password, setSignInMessage })} title="Login" />
            {/* <CheckBox
                title='Remember Me'
                checked={true}
            /> */}
            <Text onPress={() => navigation.navigate('PasswordReset', { setSignInMessage: setSignInMessage })} >Forgot your password?</Text>
            <Text onPress={() => navigation.navigate('SignUp', { setSignInMessage: setSignInMessage })} >New User?</Text>

        </View>
    );

    SignIn.navigationOptions = screenProps => ({
        title: "Sign In",
        headerStyle: {
            backgroundColor : "blue"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24
        }
    });
    
}