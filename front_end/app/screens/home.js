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
    const [coins, setCoins] = React.useState([])
    const [names, setNames] = React.useState([])
    const state = {
        HeadTable : ["ID", "Name", "Symbol", "PriceUsd", "Supply"],
        DataTable : [
            ['12', names, '3', '4', '5']
        ]
    }
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    var user = firebase.auth().currentUser;
    //console.log(user.email)

    function renderCoinData () {
        fetch("http://api.coincap.io/v2/assets")
        .then(res => {
            return res.json()
        })
        .then(info => {
            setNames(info.data)
        })
    }

    renderCoinData()

    // logOut function :
    function logOut () {
        firebase.signOut().then(() => {
            console.log('user signed out');
        })
        history.push("/")
    }

    useEffect(() => {
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
            <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                {/* <Table borderStyle={{borderWidth: 1, borderColor: '#ffa1d2'}}>
                    <Row data={state.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
                    <Rows data={names} textStyle={styles.TableText}/>
                </Table> */}
                {names.map((i) => (
                    <Text style={styles.txt}>{i.rank} # {i.name} # {i.symbol} # {i.priceUsd}</Text>
                ))}
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
        margin : 10
    }
});