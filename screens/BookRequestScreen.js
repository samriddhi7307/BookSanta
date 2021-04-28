import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class BookRequestScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      bookName:"",
      reasonToRequest:""
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

getIsBookRequestActive()
{
  db.collection('Users').where('email_id','==',this.state.userId)
  .onSnapshot(querySnapshot => {
    querySnapshot.forEach(doc => {
      this.setState({
         IsBookRequestActive : doc.data().IsBookRequestActive,
         userDocId : doc.id
      })
    })
  })
}

  addRequest = async (bookName,reasonToRequest)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('requested_books').add({
        "user_id": userId,
        "book_name":bookName,
        "reason_to_request":reasonToRequest,
        "request_id"  : randomRequestId,
        "book_status" : "requested",
        "date" : firebase.firestore.FieldValue.serverTimestamp()
    })

    await this.getBookrequest()
    db.collection('Users').where('email_id','==',this.state.userId)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
         db.collection('Users').doc(doc.id).update({
           IsBookRequestActive : true
         })
      })
    })
  

    this.setState({
        bookName :'',
        reasonToRequest : '',
        requestId : randomRequestId
    })

    return Alert.alert("Book Requested Successfully")
  }

  updateBookRequestStatus=()=>{
    db.collection('RequestedBooks').doc(this.state.docId).update({
      bookStatus :'received'
    })
  
  
  db.collection('Users').where('email_id','==',this.state.userId).get()
  .then((snapshot)=>{
    snapshot.forEach((doc) => {
      //updating the doc
      db.collection('users').doc(doc.id).update({
        IsBookRequestActive: false
      })
    })
  })


}

getBookrequest=()=>{
  var bookRequest = db.collection('requested_books')
  .where('user_id','==',this.state.userId)
  .get()
  .then((snapshot)=>{
    snapshot.forEach((doc)=>{
if(doc.data().book_status  !== "received")
{
  this.setState ({
requestId:doc.data().requestId,
requestedBookName:doc.data().book_name,
bookStatus:doc.data().book_status,
docId:doc.id
  })
}

})
  })
}

sendNotification=()=>{
  db.collection('Users').where('email_id','==',this.state.userId).get()
  .then((snapshot)=>{
    snapshot.forEach((doc) => {
      var name = doc.data().first_name
      var lastname = doc.data().last_name


      db.collection('all_notifications').where('request_id','==',this.state.requestId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc) => {
          var  donorId = doc.data().donor_id
          var bookname = doc.data().book_name

          db.collection('all_notifications').add({
            "targetedUserID":donorId,
            
            "message": name + " " + lastname + "received the book" + bookname, 
            "notification_status" : "unread",
            "bookName":bookname
          })
          
      })
    })
  })
})
}

receivedBooks=(bookName)=>{
  var userId = this.state.userId;
  var requestId = this.state.requestId;
  db.collection('received_books').add({
    "user_id":  userId,
    "book_name": bookName,
    "request_id": requestId,
    "bookStatus":"received"
  })
}

componentDidMount()
{
  this.getBookrequest()
  this.getIsBookRequestActive()
}

  render(){

    if(this.state.IsBookRequestActive === true){
      return(

        // Status screen

        <View style = {{flex:1,justifyContent:'center'}}>
          <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
          <Text>Book Name</Text>
          <Text>{this.state.requestedBookName}</Text>
          </View>
          <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
          <Text> Book Status </Text>

          <Text>{this.state.bookStatus}</Text>
          </View>

          <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:30,marginTop:30}}
          onPress={()=>{
            this.sendNotification()
            this.updateBookRequestStatus();
            this.receivedBooks(this.state.requestedBookName)
          }}>
          <Text>I recieved the book </Text>
          </TouchableOpacity>
        </View>
      )
    }
    else
    {
    return(
      // Form screen
        <View style={{flex:1}}>
          <MyHeader title="Request Book" navigation ={this.props.navigation}/>

          <ScrollView>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter book name"}
                onChangeText={(text)=>{
                    this.setState({
                        bookName:text
                    })
                }}
                value={this.state.bookName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Why do you need the book"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{ this.addRequest(this.state.bookName,this.state.reasonToRequest);
                }}
                >
                <Text>Request</Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
  }
}
}
const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
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
  }
)