import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {DrawerItems} from 'react-navigation-drawer'
import MyHeader from '../components/myheader'

export default class SideBarMenu extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.8}}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style={styles.logoutcontainer}>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('Welcomescreen')
                        firebase.auth().signOut()
                    }} style = {styles.logoutbutton}>
                        <Text style = {styles.logouttext}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    logoutbutton:{
        height:30,
        width:"100%",
        justifyContent:"center",
        padding:10
    },
    logouttext:{
        fontSize:30,
        fontWeight:"bold"
    },
    logoutcontainer:{
        flex:0.2,
        justifyContent:"flex-end",
        padding:10
    }
})