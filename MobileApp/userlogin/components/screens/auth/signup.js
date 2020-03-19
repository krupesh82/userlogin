import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { AuthContext } from "../../context";

export default function SignUp({ navigation, route }) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ cPassword, setCPassword ] = useState('');
    const [ usernameMessage, setUsernameMessage ] = useState('');
    const [ passwordMessage, setPasswordMessage ] = useState('');

    const { signUp } = React.useContext(AuthContext);

    const navigateBack = (signInMessage) => {
        route.params?.setSignInMessage(signInMessage);
        navigation.dispatch(CommonActions.goBack());
    }

    const setSignUpMessage = (usernameMessage, passwordMessage) => {
        setUsernameMessage(usernameMessage);
        setPasswordMessage(passwordMessage);
    }

    return (
        <View>
            <Text>Username</Text>
            <TextInput
                placeholder="Enter your username"
                value={username}
                onChangeText={text => setUsername(text)}
                autoCapitalize = {"none"}
                autoCompleteType = {"email"}
                keyboardType = {"email-address"}
            />
            {   
                usernameMessage !== '' &&
                <Text>{ usernameMessage }</Text>
            }
            <Text>Password</Text>
            <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                autoCapitalize = {"none"}
            />
            {   
                passwordMessage !== '' &&
                <Text>{ passwordMessage }</Text>
            }
            <Text>Confirm Password</Text>
            <TextInput
                placeholder="Enter your password again"
                value={cPassword}
                onChangeText={text => setCPassword(text)}
                secureTextEntry={true}
                autoCapitalize = {"none"}
            />
            {
                password !== cPassword &&
                <Text>Passwords do not match</Text>
            }
            <Button 
                disabled= { username === '' || password === '' || password !== cPassword }
                onPress={() => { 
                    setUsernameMessage(''); 
                    setPasswordMessage(''); 
                    signUp({ username, password, navigateBack, setSignUpMessage }); 
                }} 
                title="Reset" 
            />

        </View>
    );

    SignUp.navigationOptions = screenProps => ({
        title: "Sign Up",
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