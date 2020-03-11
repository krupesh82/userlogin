import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function SplashScreen(props) {

    return (
        <View>
            <Text>Splash Screen</Text>
        </View>
    );

    SplashScreen.navigationOptions = screenProps => ({
        title: '',
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