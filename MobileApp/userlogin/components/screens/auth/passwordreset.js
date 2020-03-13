import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { CommonActions } from '@react-navigation/native';


export default function PasswordReset({ navigation, route }) {
    const [ username, setUsername ] = useState('');
    const [ message, setMessage ] = useState('');

    const { resetPassword } = React.useContext(route.params?.authContext);

    const navigateBack = (signInMessage) => {
        route.params?.setSignInMessage(signInMessage);
        navigation.dispatch(CommonActions.goBack());
    }

    const setResetMessage = (message) => setMessage(message);

    return (
        <View>
            <Text>{ message }</Text>
            <Text>Username</Text>
            <TextInput
                placeholder="Enter your username"
                value={username}
                onChangeText={text => setUsername(text)}
                autoCapitalize = {"none"}
                autoCompleteType = {"email"}
                keyboardType = {"email-address"}
            />
            <Button onPress={() => {resetPassword({ username, navigateBack, setResetMessage }); }} title="Reset" />

        </View>
    );

    PasswordReset.navigationOptions = screenProps => ({
        title: "Reset Password",
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