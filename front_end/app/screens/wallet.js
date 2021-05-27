import React, { useState } from 'react'
//import React, { Component } from 'react-native'
import { Button, StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import * as Google from "expo-google-app-auth";
import Constants from 'expo-constants';
const {height, width} = Dimensions.get('screen');
import firebase from '../config'
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';

export default function Home () {

    let history = useHistory()
    const [localCrncy, setLocalCrncy] = useState("")
    const [solde, setSolde] = useState("")
    var user = firebase.auth().currentUser;
    //console.log(user.uid)

    function renderWalletData () {
        fetch("http://192.168.8.91:8080/user/userWallet").then(res => {
            return res.json()
        }).then(info => {
            info.map(i => {
                //console.log(i.f_uid)
                if(i.f_uid == user.uid) {
                    //console.log(i.localCrncy, i.solde)
                    setLocalCrncy(i.localCrncy)
                    setSolde(i.solde)
                }
            })
        })
    }

    renderWalletData()

    function toCoins () {
        history.push("/Home")
    }

    // logOut function :
    function logOut () {
        firebase.signOut().then(() => {
            console.log('user signed out');
        })
        history.push("/")
    }

    useEffect(() => {
        //createUserIfNotExist()
    }, [])

    return (
        <View>
            <NavBar>
            <NavTitle>
            {user.email}
            </NavTitle>
            <NavButton onPress={toCoins}>
                <NavButtonText>
                    {"Coins"}
                </NavButtonText>
            </NavButton>
            <NavButton onPress={logOut}>
            <NavButtonText>
                {"Se Deconnecter"}
            </NavButtonText>
            </NavButton>
            </NavBar>
            <ScrollView style={styles.container}>
                <View style={styles.listItem}>
                    <Text>User ID : {user.uid}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text>Your Solde Is : {solde} {localCrncy}</Text>
                </View> 
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {  padding: 16, paddingTop: 30, backgroundColor: '#fff', borderColor : 'black' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    txt : {
        color : 'black',
        borderColor : "green",
        borderWidth : 2,
        padding : 15,
        borderRadius : 8,
        margin : 10,
        backgroundColor : 'gray'
    },
    listItem:{
        margin:10,
        padding:10,
        backgroundColor:"#FFF",
        width:"90%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:5,
        elevation: 3,
        shadowOffset: { width: 1 , height:1},
        shadowColor: "#333",
        shadowOpacity: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        
    
    },

});