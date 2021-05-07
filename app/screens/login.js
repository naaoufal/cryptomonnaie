import React from 'react'
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Google from "expo-google-app-auth";

const Login = () => {
    async function signInWithGoogleAsync() {
        try {
          const result = await Google.logInAsync({
            issuer : 'https://accounts.google.com',
            androidClientId : '61849560883-0n0il9mn52q7qe5p66rjj91uatlfi00t.apps.googleusercontent.com',
            redirectUrl : 'com.googleusercontent.apps.61849560883-0n0il9mn52q7qe5p66rjj91uatlfi00t:/oauth2redirect/google',
            androidStandaloneAppClientId : '61849560883-0n0il9mn52q7qe5p66rjj91uatlfi00t.apps.googleusercontent.com',
            //iosClientId: YOUR_CLIENT_ID_HERE,
            behavior : 'web',
            scopes : ['profile', 'email'],
          });

          if (result.type === 'success') {
            console.log("gmail results" + result.user + result.user.familyName + result.user.email + result.user.photoUrl)
            return social_signup(result.user.givenName, result.user.familyName, result.user.email, result.user.photoUrl, "google_login")
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
    }
  
    return (
      <View style={styles.container}>
        <Button title="Login with Google" onPress={signInWithGoogleAsync} />
      </View>
    );
};
  
  export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});