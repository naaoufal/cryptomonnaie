import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NativeRouter, Route, Switch } from 'react-router-native';
import Login from './app/screens/login';
import Home from './app/screens/home';
import firebase from 'firebase';
import firebaseConfig from './app/config';

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <NativeRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Home" component={Home} />
      </Switch>
    </NativeRouter>
  );
}
