import React, { useState } from 'react'
import { Button, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import * as Google from "expo-google-app-auth";
import Constants from 'expo-constants';
const {height, width} = Dimensions.get('screen');
import firebase from '../config'
import { useHistory } from 'react-router';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { useEffect } from 'react';

export default function Home () {

    const [coins, setCoins] = useState("")
    const arr = []

    var user = firebase.auth().currentUser;
    //console.log(user)

    function renderCoinData () {
        fetch("http://api.coincap.io/v2/assets").then(res => {
            return res.json()
        }).then(data => {
            //setCoins(data)
            console.log(data)
        })
    }

    //arr.push(data)
    const state = {
        heads : ['Name', 'Supply', 'Volume', 'Change/24'],
        body : coins
    }

    useEffect(() => {
        renderCoinData()
        //console.log(coins)
    }, [])

    return (
        <View style={styles.container}>
            <Text>This is Home Page !!!</Text>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={state.heads} style={styles.head} textStyle={styles.text}/>
                <Rows data={coins.name} textStyle={styles.text}/>
            </Table>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});