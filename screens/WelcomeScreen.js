import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert ,Modal, ScrollView, KeyboardAvoidingView} from 'react-native'; 
import db from '../config';
import firebase from 'firebase';
import SantaAnimation from '../components/SantaCluas';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      FirstName:'',
      LastName:'',
      Address:'',
      Contact:'',
      ConfirmPassword:'',
      isModalVisible:'false'    
    }
  }

ShowModal = () =>{
  return(
  <Modal 
  animationType = 'fade'
  transparent = {true}
  visible = {this.state.isModalVisible}>

    <View style ={styles.modalContainer}>
      <ScrollView style={{width:"100%"}}>
<KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
<Text style={styles.ModalTitle}>
Registration
</Text>

<TextInput style={styles.FormInput} 
placeholder={'First Name'}
maxLength ={8}
onChangeText={(text)=>{
  this.setState({
   FirstName: text
  })
}}
/>

<TextInput style={styles.FormInput} 
placeholder={'Last Name'}
maxLength ={8}
onChangeText={(text)=>{
  this.setState({
   LastName: text
  })
}}
/>

<TextInput style={styles.FormInput} 
placeholder={'Contact'}
maxLength ={10}
keyboardType ={'numeric'}
onChangeText={(text)=>{
  this.setState({
   Contact: text
  })
}}
/>

<TextInput style={styles.FormInput} 
placeholder={'Address'}
 multiline ={true}
onChangeText={(text)=>{
  this.setState({
   Address: text
  })
}}
/>

<TextInput style={styles.FormInput} 
placeholder={'EmailId'}
keyboardType = {'email-address'}
onChangeText={(text)=>{
  this.setState({
   emailId: text
  })
}}
/>

<TextInput style={styles.FormInput} 
placeholder={'Password'}
secureTextEntry={true}
onChangeText={(text)=>{
  this.setState({
   password: text
  })
}}
/>

<TextInput style={styles.FormInput} 
placeholder={'Confrim Password'}
secureTextEntry={true}
onChangeText={(text)=>{
  this.setState({
   ConfirmPassword: text
  })
}}
/>

<View style={styles.Modalbackbutton}>
<TouchableOpacity style={styles.registerButton}
onPress={
  ()=>{
    this.userSignUp(this.state.emailId,this.state.password,this.state.ConfirmPassword);
  }
}>
  <Text style={styles.buttonText}>
    Resgister
  </Text>
</TouchableOpacity>
</View>

<View style={styles.Modalbackbutton}>
<TouchableOpacity style={styles.registerButton}
onPress={
  ()=>{
    this.setState({"isModalVisible":false})  
  }
}>
  <Text style={styles.buttonText}>
    Cancel
  </Text>
</TouchableOpacity>
</View>

</KeyboardAvoidingView>
        
      </ScrollView>
    </View>
    
    </Modal>
    )
}

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      this.props.navigation.navigate('DonateBooks')
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailId, password,ConfirmPassword) =>{
if(password!==ConfirmPassword){
  return Alert.alert("Password Doesn't Match")
}
else{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then(()=>{

      db.collection('Users').add({
FirstName:this.state.FirstName,
LastName:this.state.LastName,
Contact:this.state.Contact,
emailId:this.state.emailId,
Address:this.state.Address,
IsBookRequestActive:false
      })
      return Alert.alert("User Added Successfully")
      [
{text : 'OK',onPress :()=> ({
  "isModalVisible":false
})}
      ]
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
  }
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.profileContainer}>
         
 <SantaAnimation/>

          <Text style={styles.title}>Book Santa</Text>
        </View>
        {
          this.ShowModal()
        }
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@booksanta.com"
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
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    textAlign:'center',
    alignItems:'center',
    backgroundColor:'orange',
    margin:10
  },
  KeyboardAvoidingView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  ModalTitle:{
    justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:50
  },
  FormInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderRadius:20,
    borderColor:'red',
    marginTop:10,
    padding:20
  },
  registerButton:{
    width:100,
    height:35,
    borderRadius:20,
    borderColor:'red',
    margin:10,
    alignItems:'center',
    justifyContent:'center',
  },
  buttonText:{
    fontSize:20,
    fontWeight:'200',
    color:'white'
  }
})