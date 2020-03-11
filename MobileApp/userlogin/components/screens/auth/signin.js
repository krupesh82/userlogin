import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';

export default function SignIn({ navigation, route }) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const { signIn } = React.useContext(route.params?.authContext);

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
            <Text>Password</Text>
            <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                autoCapitalize = {"none"}
                autoCompleteType = {"password"}
            />
            <Button onPress={() => signIn({ username, password })} title="Login" />
        </View>
    );

    SignIn.navigationOptions = screenProps => ({
        title: "Login",
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