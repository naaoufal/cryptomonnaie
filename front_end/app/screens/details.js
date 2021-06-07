import React, { useEffect, useState } from 'react'
import axios from 'axios';
import firebase from '../config'
import { useHistory } from 'react-router';
import Modal from 'react-native-modal';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image,TextInput, ScrollView   } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import Svg, {Circle, Path, Rect} from 'react-native-svg';
import { Button } from '@material-ui/core';

export default function Details (props) {

    var user = firebase.auth().currentUser;
    let history = useHistory()
    //const [data, setData] = React.useState("")
    const [solde, setSolde] = React.useState([])
    const [time, setTime] = React.useState([0,0])
    const [priceRe, setPrice] = React.useState([0,0])
    const [val, setCurrVal] = React.useState("")
    const [value, setValue] = React.useState("0")
    const { id, name, symbol, changePercent24Hr, priceUsd, localCrncy } =
    (props.location && props.location.state) || {};

    const convertTimeToDay =  (time) => {             
        var a = new Date(time);
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var dayOfWeek = days[a.getDay()]
        //console.log(dayOfWeek);
        return dayOfWeek
    }

    function clickMe () {
      fetch("http://192.168.8.91:8080/user/userWallet").then(res => {
        return res.json()
      }).then(data => {
        data.map(i => {
          if(i.f_uid == user.uid){
            //console.log(i)
            //console.log(i.id+" "+name+" "+val+" "+val*priceUsd)
            fetch("http://192.168.8.91:8080/wallet/add", {
              method : 'POST',
              headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
              },
              body : JSON.stringify({
                id : i.id.toString(),
                id_user : i.id.toString(),
                cryp_name : name,
                currencyPrice : val*priceUsd,
                value : parseFloat(val)
              })
            }).then(res => {
              return res.json()
            }).then(info => {
              alert("Done")
              history.push("/Home")
            })
          }
        })
      })
    }

    function sellCurr () {
      fetch("http://192.168.8.91:8080/user/userWallet").then(res => {
        return res.json()
      }).then(data => {
        data.map(i => {
          if(i.f_uid == user.uid){
            //console.log(i)
            //console.log(i.id+" "+name+" "+val+" "+val*priceUsd)
            fetch("http://192.168.8.91:8080/wallet/sell", {
              method : 'POST',
              headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
              },
              body : JSON.stringify({
                idUser : i.id.toString(),
                id_user : i.id.toString(),
                currencyName : name,
                currencyPrice : val*priceUsd,
                value : parseFloat(val)
              })
            }).then(res => {
              return res.json()
            }).then(info => {
              alert("Done")
              history.push("/Home")
            })
          }
        })
      })
    }

    function renderData () {
        fetch("http://192.168.8.91:8080/user/userWallet").then(res => {
          return res.json()
        }).then(data => {
          data.map(i => {
            if(i.f_uid == user.uid){
              setSolde(i.solde)
              //console.log(i)
              fetch("http://192.168.8.91:8080/wallet/allWallet").then(res => {
                return res.json()
              }).then(info => {
                info.map(o => {
                  if(o.id_user == i.id){
                    if(o.cryp_name.toLowerCase() == name.toLowerCase()) {
                      //console.log(o)
                      setValue(o.value)
                    }
                  }
                })
              })
            }
          })
        })
    }

    async function getData () {
        
      const response = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`).then(res => {
        return res.json()
      })
        
      const dataFull = response.data
      //console.log(dataFull)
      const timeArr = dataFull && dataFull.map(i => convertTimeToDay(i.time))
      const priceArr = dataFull && dataFull.map(i => i.priceUsd)
      setTime(timeArr && timeArr.slice(-6))
      setPrice(priceArr && priceArr.slice(-6))

      
    }

    // logOut function :
    function logOut () {
        firebase.signOut().then(() => {
          console.log('user signed out');
          //history.push("/")
        }) 
    }

    //console.log(time)

    useEffect(() => {
      getData()
      renderData()
    }, [])
    

    return (
        <ScrollView>
            <NavBar>
            <NavTitle>
            {user.email}
            </NavTitle>
            <NavButton onPress={() => {history.push("/Home")}}>
                <NavButtonText>
                    {"Retour"}
                </NavButtonText>
            </NavButton>
            <NavButton onPress={logOut}>
            <NavButtonText>
                {"Se Deconnecter"}
            </NavButtonText>
            </NavButton>
            </NavBar>
            <View style={styles.container}>
                <View style={styles.listItem}>
                    <Image source={{uri: `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}}  style={{width:40, height:40,borderRadius:30}} />
                    <View style={{justifyContent:"center",alignItems:"flex-start",flex:1,marginHorizontal: "5%"}}>
                      <Text style={{fontWeight:"bold"}}>{name}</Text>
                      <Text >{symbol}</Text>
                    </View>
                    <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                      <Text style={{fontWeight:"bold"}}>${parseFloat(priceUsd).toFixed(2)}</Text>
                    </View>
                    <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                        <Text style={ 
                        changePercent24Hr > 0
                        ? { fontWeight:"bold", color: "green" }
                        : { fontWeight:"bold", color: "red" }
                        }>{parseFloat(changePercent24Hr).toFixed(2)} %</Text>
                    </View>
                </View>
                <View style={styles.listItem}>
                  <Text style={{fontWeight:"bold"}}>My Solde Is : {solde} USD</Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={{fontWeight:"bold"}}>How Many {name} Currency You Have : {value}</Text>
                </View>
                <View style={styles.listItem}>
                    <TextInput
                    placeholder={"Enter The Value of Currency you Want to Buy"}
                    onChangeText={setCurrVal}
                    />
                </View>
                <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                    <Text style={styles.txt} onPress={clickMe}>Buy</Text>
                    <Text style={styles.txt} onPress={sellCurr}>Sell</Text>
                </View>
                <LineChart
                data={{
                  labels: time,
                  datasets: [
                    {
                      data : priceRe
                    }
                  ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={500}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#FFF",
                  backgroundGradientFrom: "#FFF",
                  backgroundGradientTo: "#FFF",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(0,82,212, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0,82,212, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#0052D4"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      marginTop:0,
      justifyContent: "center", 
      alignItems: "center",
      
    },
    txt : {
      fontSize : 26,
      elevation: 1,
      color : 'white',
      backgroundColor: "dodgerblue",
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 60,
      marginHorizontal: "4%",
      marginTop: 8,
      minWidth: "30%",
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
    textHeder:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center'
    },
    itemTextHeder:{
      textAlign:'left'
  
    },
    baseText: {
    },
  
    titleText: {
      fontSize: 20,
      fontWeight: "bold"
    },
    ButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center'
    },
    appButtonContainer: {
      elevation: 1,
      backgroundColor: "orange",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 0,
      marginHorizontal: "4%",
      marginTop: 8,
      minWidth: "30%",
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
  
    modalContainer:{
      flex: 0.5,
      backgroundColor:"#FFF",
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius:15,
    },
    appButtonContainerNoBg: {
      
      backgroundColor: "#FFF",
      borderRadius: 30,
      borderWidth :2,
      borderColor : '#2ecc71',
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginHorizontal: "1%",
      marginBottom: 2,
      marginTop: 8,
      width: "30%",
    },
    appButtonTextNoBg: {
      fontSize: 18,
      color: "#2ecc71",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    appButtonContainerNoBg2: {
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginHorizontal: "1%",
      marginBottom: 2,
      marginTop: 8,
      width: "30%",
    },
    appButtonTextNoBg2: {
      fontSize: 18,
      color: "#FFF",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    listItem:{
      margin:10,
      padding:10,
      backgroundColor:"#FFF",
      width:"95%",
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5,
      elevation: 8,
    },
    input: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: "#f1f2f6",
      borderRadius: 60,
      width: "80%",
    },
});