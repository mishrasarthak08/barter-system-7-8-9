import React, { Component } from 'react';
import { StyleSheet, Text, View, Image ,TextInput,KeyboardAvoidingView, Alert,TouchableOpacity,Modal, ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import BarterAnimation from '../components/barteranimation'

export default class SignUpLoginScreen extends Component {
  constructor(){
    super()
    this.state={
      emailaddress :"",
      password : '',
      isModalVisible:"false",
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:''
    }
  }

  userLogIn=(email,password)=>{
    firebase.auth().signInWithEmailAndPassword(email, password)
.then(() => {
this.props.navigation.navigate('HomeScreen')
})
.catch((error) => {
var errorCode = error.code;
var errorMessage = error.message;
});
}

  userSignUp=(email,password,confirmPassword)=>{
    if(password!==confirmPassword){
return Alert.alert("password doesn't match\n check your password")
    }
    else{
   firebase.auth().createUserWithEmailAndPassword(email, password)
.then(() => {
// Signed in 
db.collection("users").add({
   first_name:this.state.firstName,
   last_name:this.state.lastName,
   contact:this.state.contact,
   email_Id:this.state.emailaddress,
   address:this.state.address
})
return Alert.alert("user added successfully"," ",
[ {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})}, ]

)

})
.catch((error) => {
var errorCode = error.code;
var errorMessage = error.message;
return Alert.alert(errorMessage)
});
    }
}

  showModal=()=>{
    return(
        <Modal animationType = "fade" transparent = {true} visible = {this.state.isModalVisible}>
            <View style = {styles.modalcontainer}>
                <ScrollView style = {{width:"100%"}}>
                    <KeyboardAvoidingView style = {{flex:1,alignItems:"center",justifyContent:"center"}}>
                        <Text style = {styles.modalTitle}>Registration</Text>
                        <TextInput
                        style={styles.formtextinput}
                        placeholder={"First Name"}
                        maxLength ={8}
                        onChangeText={(text)=>{
                            this.setState({
                            firstName: text 
                            })
                        }}
                        />
                         <TextInput
                        style={styles.formtextinput}
                        placeholder={"Last Name"}
                        maxLength ={8}
                        onChangeText={(text)=>{
                            this.setState({
                            lastName: text
                            })
                        }}
                        />
                       
                     <TextInput
                        style={styles.formtextinput}
                        placeholder={"Contact"}
                        maxLength ={10}
                        keyboardType = {"numeric"}
                        onChangeText={(text)=>{
                            this.setState({
                            contact: text
                            })
                        }}
                        />
                         <TextInput
                        style={styles.formtextinput}
                        placeholder={" Address"}
                        multiline ={true}
                        onChangeText={(text)=>{
                            this.setState({
                            address: text
                            })
                        }}
                        />
                         <TextInput
                        style={styles.formtextinput}
                        placeholder="abc@example.com"
                        keyboardType ='email-address'
                        onChangeText={(text)=>{
                            this.setState({
                            emailaddress: text
                            })
                        }}
                        />
    
                        <TextInput
                        style={styles.formtextinput}
                        secureTextEntry = {true}
                        placeholder="Enter Password"
                        onChangeText={(text)=>{
                            this.setState({
                            password: text
                            })
                        }}
                        
                        />
    
                        <TextInput
                        style={styles.formtextinput}
                        secureTextEntry = {true}
                        placeholder="Confirm Password"
                        onChangeText={(text)=>{
                        this.setState({
                        confirmPassword: text
                            })
                        }}
                        
                        />
    
                        <View>
                            <TouchableOpacity style = {styles.registerbutton} onPress = {()=>{
                                this.userSignUp(this.state.emailaddress,this.state.password,this.state.confirmPassword)
                            }}><Text style = {styles.registerbuttontext}>Register</Text></TouchableOpacity>
                        </View>
    
                        <View>
                            <TouchableOpacity style = {styles.cancelbutton} onPress = {()=>{
                                this.setState({
                                    isModalVisible:"false"
                                })
                            }}><Text style={styles.registerbuttontext}>cancel</Text></TouchableOpacity>
                        </View>    
    
                                 </KeyboardAvoidingView>
                    </ScrollView>
            </View>
        </Modal>
    )
    }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <BarterAnimation/>
          <Text style={styles.title}>Barter System App</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@bartersystem.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:"lightblue",
      alignItems:"center",
      justifyContent: 'center'
  },
  profilecontainer:{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
  },
  title:{
      fontSize:65,
      fontWeight:"300",
      paddingBottom:30,
      color:"yellow"     
  },
  loginBox:{
      width:300,
      height:40,
      borderBottomWidth:1.5,
      borderColor:"black",
      fontSize:20,
      paddingLeft:10,
      margin:10
  },
  button:{
      width:300,
      height:50,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:25,
      backgroundColor:"blue",
  },
  buttontext:{
      fontSize:20,
      fontWeight:"200",
      color:"white"     
  },
  buttoncontainer:{
      flex:1,
      alignItems:"center"
  },
  modalcontainer:{
    flex:1,
    borderRadius:20,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white",
    marginRight:30,
    marginLeft:30,
    marginTop:80,
    marginBottom:80
  },
  formtextinput:{
    width:"75%",
    height:35,
    alignSelf:"center",
    borderColor:"yellow",
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  registerbutton:{
    width:200,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    borderWidth:1,
    borderRadius:10,
    marginTop:30
  },
  registerbuttontext:{
    color:"blue",
    fontSize:15,
    fontWeight:"bold",
  },
  cancelbutton:{
    width:200,
    height:40,
    justifyContent:"center",
    alignItems:"center",
    marginTop:5,
    borderWidth:1,
    borderRadius:10,
  },
  modalTitle:{
    justifyContent:"center",
    alignSelf:"center",
    fontSize:30,
    color:"green",
    margin:30
  }
})