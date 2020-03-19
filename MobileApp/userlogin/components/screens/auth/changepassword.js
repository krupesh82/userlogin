import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function PasswordChange({ navigation, route }) {
    const [ newPassword1, setNewPassword1 ] = useState('');
    const [ newPassword2, setNewPassword2 ] = useState('');
    const [ oldPassword, setOldPassword ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ userToken, setUserToken ] = useState('');

    // const userToken = await AsyncStorage.getItem('userToken');

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          console.log('boorstrapAsync');
          try {
            AsyncStorage.getItem('userToken')
                .then((value) => {
                    setUserToken(value);
                    console.log('Token: ' + value);        
                });
          } catch (e) {
            console.log('error restoring token: ' + e);
            // Restoring token failed
          }
        };
    
        bootstrapAsync();
      }, []);

    const changePassword = () => {
        fetch('http://192.168.0.107:8000/rest-auth/password/change/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Token ' + userToken
            },
            body: JSON.stringify({ old_password: oldPassword, 
                                    new_password1: newPassword1,
                                    new_password2: newPassword2,  
                                }),
        })
        .then( res => res.json() )
        .then( res => {
            console.log(res);
            if(res.detail) {
              alert(res.detail);
            }
            // else {
            //   var email='', password='';
            //   if(res.email) { email = res.email; }
            //   if(res.password1) { password = res.password1; }
            //   data.setSignUpMessage(email, password);
            // }
        });
    }

    return (
        <View>
            <Text>{ message }</Text>
            <Text>Current Password</Text>
            <TextInput
                placeholder="Enter your current password"
                value={oldPassword}
                onChangeText={text => setOldPassword(text)}
                secureTextEntry={true}
                autoCapitalize = {"none"}
                keyboardType = {"password"}
            />
            <Text>New Password</Text>
            <TextInput
                placeholder="Enter your new password"
                value={newPassword1}
                onChangeText={text => setNewPassword1(text)}
                secureTextEntry={true}
                autoCapitalize = {"none"}
                keyboardType = {"password"}
            />
            <Text>Confirm Password</Text>
            <TextInput
                placeholder="Enter your new password again"
                value={newPassword2}
                onChangeText={text => setNewPassword2(text)}
                secureTextEntry={true}
                autoCapitalize = {"none"}
                keyboardType = {"password"}
            />
            <Button onPress={() => changePassword()} title="Update" />

        </View>
    );

    PasswordChange.navigationOptions = screenProps => ({
        title: "Change Password",
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