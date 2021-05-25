import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image,TextInput   } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default function Details (props) {

    const [time, setTime] = useState([0,0]);
    const [price, setPrice] = useState([0,0]);
    const { id, name, symbol, changePercent24Hr } =
    (props.location && props.location.state) || {};

    const convertTimeToDay =  (time) => {             
        var a = new Date(time);
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var dayOfWeek = days[a.getDay()]
        //console.log(dayOfWeek);
        return dayOfWeek
    }

    function getData () {
        fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`).then(res => {
            return res.json()
        }).then(i => {
            console.log(i)
        })
    }

    //getData()

    return (
        <View  style={styles.container}>
            <Text>this is a page details {id}</Text>
            <View style={styles.listItem}>
                <Image source={{uri: `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}}  style={{width:40, height:40,borderRadius:30}} />
                <View style={{justifyContent:"center",alignItems:"flex-start",flex:1,marginHorizontal: "5%"}}>
                    <Text style={{fontWeight:"bold"}}>{name}</Text>
                    <Text >{symbol}</Text>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                    <Text style={ 
                    changePercent24Hr > 0
                    ? { fontWeight:"bold", color: "green" }
                    : { fontWeight:"bold", color: "red" }
                    }>{parseFloat(changePercent24Hr).toFixed(2)} %</Text>
                </View>
            </View>
        </View>
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
      elevation: 8,
      backgroundColor: "#5000FF",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginHorizontal: "1%",
      marginBottom: 2,
      marginTop: 8,
      minWidth: "48%",
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
      
      backgroundColor: "#2ecc71",
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