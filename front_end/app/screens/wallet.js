import React, { useState } from 'react'
//import React, { Component } from 'react-native'
import { Button, StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import * as Google from "expo-google-app-auth";
import Constants from 'expo-constants';
const {height, width} = Dimensions.get('screen');
import firebase from '../config'
import { useHistory } from 'react-router';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { DataTable } from 'react-native-paper';
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

export default function Home () {

    let history = useHistory()
    const [localCrncy, setLocalCrncy] = useState("")
    const [solde, setSolde] = useState("")
    var user = firebase.auth().currentUser;
    //console.log(user.uid)

    function renderWalletData () {
        fetch("http://192.168.1.137:8080/user/userWallet").then(res => {
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
console.log(localCrncy)
    useEffect(() => {
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
                <Text>User ID : {user.uid}</Text>
                <Text>Your Solde Is : {solde} {localCrncy}</Text>
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
    }
});