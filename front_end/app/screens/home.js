import React, { useState } from 'react'
import { Button, StyleSheet, Text, View, Dimensions, TextInput, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import firebase from '../config'
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';

export default function Home () {

    let history = useHistory()
    const [names, setNames] = React.useState([])

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
        fetch("http://192.168.8.91:8080/user/userWallet").then(res => {
            return res.json()
        }).then(info => {
            //console.log(info)
            var x = info.map(i => {
                if(i.f_uid == user.uid && i.f_uid != undefined) {
                    return i.f_uid
                }
            })
            
            if(x.filter(Boolean).length > 0){
                history.push("/Wallet")
            } else {
                fetch(`http://192.168.8.91:8080/user/add/${user.uid}`, {
                        method : 'POST',
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            f_uid : user.uid
                        })
                    }).then(res => {
                        return res.json()
                    }).then(data => {
                        history.push("/Wallet")
                })
            }
        })
        //history.push("/Wallet")
    }

    // logOut function :
    function logOut () {
        firebase.signOut().then(() => {
            history.push("/")
        })
    }

    useEffect(() => {
        //toWallet()
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
                    <TouchableOpacity onPress={() => history.push('/Details', i)} key={i.id}>
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
                                i.changePercent24Hr > 0 ? {  color: "green" } : {  color: "red" } 
                                }>{parseFloat(i.changePercent24Hr).toFixed(2)} %</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
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