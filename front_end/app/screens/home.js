import React, { useState } from 'react'
//import React, { Component } from 'react-native'
import { Button, StyleSheet, Text, View, Dimensions, TextInput, ScrollView, Image } from 'react-native';
import * as Google from "expo-google-app-auth";
import Constants from 'expo-constants';
const {height, width} = Dimensions.get('screen');
import firebase from '../config'
import { useHistory } from 'react-router';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';


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
        fetch("http://api.coincap.io/v2/assets?limit=15").then(res => {
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
        fetch("http://192.168.11.104:8080/user/userWallet").then(res => {
            return res.json()
        }).then(info => {
            //console.log(info)
            info.map(i => {
                //console.log(i.f_uid)
                if(user.uid == i.f_uid){
                    console.log("kayn")
                    history.push("/Wallet")
                } else {
                    console.log("makaynch")
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

    // get Graph function
    function getGraph (rank) {
        //console.log(rank)
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
        <ScrollView>
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
                {names.map((i) => (
                    <View style={styles.listItem}>
                        <Image source={{uri: `https://assets.coincap.io/assets/icons/${i.symbol.toLowerCase()}@2x.png`}}  style={{width:40, height:40,borderRadius:30}} />
                        <View style={{justifyContent:"center",alignItems:"flex-start",flex:1,marginHorizontal: "5%"}}>
                            <Text style={{fontWeight:"bold"}}>{i.name}</Text>
                            <Text >{i.symbol}</Text>
                        </View>
                        <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                            <Text style={{fontWeight:"bold"}}>${parseFloat(i.priceUsd).toFixed(2)}</Text>
                        </View>
                        <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                            <Text style={{fontWeight:"bold"},
                            
                            i.changePercent24Hr > 0
                                    ? {  color: "green" }
                                    : {  color: "red" }
                            
                            }>{parseFloat(i.changePercent24Hr).toFixed(2)} %</Text>
                        </View>
                    </View>
                ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop:0
    },
    listItem:{
        margin:10,
        padding:20,
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
        alignItems: 'center'
    
    }
});