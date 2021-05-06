import React from 'react'
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
//import * as Google from 'expo-google-app-auth';

export default function Login () {

    async function signInWithGoogleAsync () {
        try {
          const result = await Google.logInAsync({
            //androidClientId: '61849560883-bdveo3lilhu2o18d05359vbbuhtect90.apps.googleusercontent.com',
            iosClientId: '61849560883-bdveo3lilhu2o18d05359vbbuhtect90.apps.googleusercontent.com',
            behavior : 'web',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }

    return (
        <View style={styles.container}>
            <Button
            title = "Sign With Google"
            onPress = {() => signInWithGoogleAsync()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});