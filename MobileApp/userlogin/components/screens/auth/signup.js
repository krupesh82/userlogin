import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Button, AsyncStorage } from 'react-native';

export default function SignUp(props) {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect( () => {
        getToken();
    }, []);

    const auth = () => {
        props.navigation.navigate('Home');
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
        //     props.navigation.navigate('Dashboard');
        // })
        // .catch( error => console.log(error) );
    };

    const saveToken = async (token) => {
        await AsyncStorage.setItem('Auth_Token', token);
    }

    const getToken = async () => {
        const token = await AsyncStorage.getItem('Auth_Token');
        if (token) props.navigation.navigate('Dashboard');
    }

    return (
        <View>
            <Text>Username</Text>
            <TextInput
                placeholder="Enter your username"
                value={username}
                onChangeText={text => setUsername(text)}
                autoCapitalize = {"none"}
            />
            <Text>Password</Text>
            <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                autoCapitalize = {"none"}
            />
            <Button onPress={() => auth()} title="Login" />
        </View>
    );

    SignUp.navigationOptions = screenProps => ({
        title: "Register",
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