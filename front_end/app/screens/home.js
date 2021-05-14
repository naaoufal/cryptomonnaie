import React, { useState } from 'react'
//import React, { Component } from 'react-native'
import { Button, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import * as Google from "expo-google-app-auth";
import Constants from 'expo-constants';
const {height, width} = Dimensions.get('screen');
import firebase from '../config'
import { useHistory } from 'react-router';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

export default function Home () {

    const [coins, setCoins] = React.useState([])
    const state = {
        symbols : []
    }
    let history = useHistory()
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    var user = firebase.auth().currentUser;
    //console.log(user.email)

    function renderCoinData () {
        fetch("http://api.coincap.io/v2/assets")
        .then(res => {
            return res.json()
        })
        .then(data => setState({symbols : data.symbol}))
    }

    // logOut function :
    function logOut () {
        firebase.signOut().then(() => {
            console.log('user signed out');
        })
        history.push("/")
    }

    useEffect(() => {
        //renderCoinData()
        console.log(state)
    }, [])

    return (
        <View>
            <NavBar>
            <NavTitle>
            {user.email}
            </NavTitle>
            <NavButton onPress={logOut}>
            <NavButtonText>
                {"Se Deconnecter"}
            </NavButtonText>
            </NavButton>
            </NavBar>
            <View style={styles.container}>
                {/* {coins.map((i) => {
                    <DropDownPicker
                    open={open}
                    value={i.symbol}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    />
                })} */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {  padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});