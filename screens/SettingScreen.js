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
import MyHeader from '../components/MyHeader'

export default class SettingScreen extends Component{
  constructor(){
      super()
      this.state={
      emailId:'',
      FirstName:'',
      LastName:'',
      Address:'',
      Contact:'',
      docId :''
      }
  }
   
getUserDetails=()=>{
    var email = firebase.auth().currentUser.email;
    db.collection("Users").where('emailId','==',email).get()
    .then(snapshot =>{
        snapshot.forEach(doc =>{
            var data = doc.data()
            this.setState ({
                emailId:data.emailId,
                FirstName:data.FirstName,
                LastName:data.LastName,
                Address:data.Address,
                Contact:data.Contact,
                docId :doc.id
            })
        })
    }) 
}

UpdateUserDetails = () =>{
db.collection("Users").doc(this.state.docId).update({
    "FirstName ": this.state.FirstName,
      "LastName":this.state.LastName,
      "Address":this.state.Address,
      "Contact":this.state.Contact
})
Alert.alert ("profile updated successfully")
}

componentDidMount(){
  this.getUserDetails();
}

render(){
    return(
        <View style={styles.container}>
          <MyHeader title="Setting" navigation ={this.props.navigation}/>
             <View style={styles.formContainer}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={" First Name"}
                onChangeText={(text)=>{
                    this.setState({
                         FirstName:text
                    })
                }}
                value={this.state. FirstName}
              />
              </View>

              <View style={styles.formContainer}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={" Last Name"}
                onChangeText={(text)=>{
                    this.setState({
                         LastName:text
                    })
                }}
                value={this.state. LastName}
              />
              </View>

              <View style={styles.formContainer}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={" Contact"}
                maxLength ={10}
                keyboardType ={'numeric'}
                onChangeText={(text)=>{
                    this.setState({
                         Contact:text
                    })
                }}
                value={this.state. Contact}
              />
              </View>

              <View style={styles.formContainer}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={" Address"}
                multiline = {true}
                onChangeText={(text)=>{
                    this.setState({
                         Address:text
                    })
                }}
                value={this.state. Address}
              />
              </View>

<TouchableOpacity style = {styles.button}
 onPress = {()=>{
this.UpdateUserDetails();
 }}
 >
    <Text Style={styles.buttonText}>
        Save
    </Text>
</TouchableOpacity>

              </View>
              )
              }
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer:{
    flex:1,
    width:'100%',
    alignItems: 'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
  },
  buttonText:{
    fontSize:20,
    fontWeight:'200',
    color:'white'
  }
})