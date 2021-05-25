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
import Modal from 'react-native-modal';

export default function Home () {

    let history = useHistory()
    const [coins, setCoins] = React.useState([])
    const [names, setNames] = React.useState([])
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    var user = firebase.auth().currentUser;
    //console.log(user.uid)

    function renderCoinData () {
        fetch("http://api.coincap.io/v2/assets").then(res => {
            return res.json()
        })
        .then(info => {
            setNames(info.data)
        })
    }

    // function buyCoins (id) {
    //     alert(id)
    // }

    renderCoinData()
    

    function toWallet () {
        fetch("http://192.168.1.137:8080/user/userWallet").then(res => {
            return res.json()
        }).then(info => {
            //console.log(info)
            info.map(i => {
                //console.log(i.f_uid)
                if(user.uid == i.f_uid){
                    console.log(i)
                    history.push("/Wallet")
                } else {
                    history.push("/Wallet")
                }
                // if(user.uid != i.f_uid) {
                //     fetch(`http://192.168.1.137:8080/user/add/${user.uid}`, {
                //         method : 'POST',
                //         headers : {
                //             'Content-Type' : 'application/json'
                //         },
                //         body : JSON.stringify({
                //             f_uid : user.uid
                //         })
                //     }).then(res => {
                //         history.push("/Wallet")
                //     })
                // } else {
                //     history.push("/Wallet")
                // }
            })
        })
        //history.push("/Wallet")
    }

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
            <NavButton onPress={toWallet}>
                <NavButtonText>
                    {"My Wallet"}
                </NavButtonText>
            </NavButton>
            <NavButton onPress={logOut}>
            <NavButtonText>
                {"Se Deconnecter"}
            </NavButtonText>
            </NavButton>
            </NavBar>
            <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                {names.map((i) => (
                    <View>
                        <Text style={styles.txt}>
                            {i.rank} # {i.name} # {i.symbol} # {i.priceUsd} # {i.changePercent24Hr}
                        </Text>
                    </View>
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
        margin : 10,
        backgroundColor : 'gray'
    }
});