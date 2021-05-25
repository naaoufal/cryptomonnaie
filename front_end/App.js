import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NativeRouter, Route, Switch } from 'react-router-native';
import Login from './app/screens/login';
import Home from './app/screens/home';
import LogintoHome from './app/screens/logintoHome';
import Wallet from './app/screens/wallet'
import Details from './app/screens/details'

//import firebaseConfig from './app/config';

//firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <NativeRouter>
      <Switch>
        <Route exact path="/" component={LogintoHome} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Inscription" component={Login} />
        <Route exact path="/Wallet" component={Wallet} />
        <Route exact path="/Details" component={Details} />
      </Switch>
    </NativeRouter>
  );
}
