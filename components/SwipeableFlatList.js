import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';
import { Dimensions } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipeableFlatList extends Component{

constructor(props){
super(props)
this.state={
    allNotifications : this.props.allNotifications
}
}

updateMarkAsRead = notification=>{
    db.collection('all_notifications').doc(notification.doc_id).update
    ({
        Notification_Status : "Read"
    })
}


onSwipeValueChange = swipeData =>
{
    var allNotifications = this.state.allNotifications;
    const {key,value} = swipeData;
    if(value <-Dimensions.get("window").width)
    {
        const newData = [...allNotifications];
        this.updateMarkAsRead(allNotifications[key]);
        newData.splice(key,1);
        this.setState({allNotifications :newData});
    }
}

closeRow = (item,key) =>
{
    if(item[key])
        {
           item[key].closeRow();
        }
}

deleteRow = (item,key)=>{
var allNotifications = this.state.allNotifications

this.closeRow(item,key);

}

renderItem = data =>
{
    <ListItem
    leftElement ={<Icon name= "Book"
    type= "font-awesome"
    color = "White"
    />}
    title = {data.item.book_name}
    titleStyle = {{ color: "black", fontWeight: "bold" }}
     subtitle = {data.item.message}
     bottomDivider 
   /> 
}

renderHiddenitem = ()=> (

    <View style={styles.rowBack}>
        <View style ={[styles.backRightBtn,styles.backRightBtnRight]}>
        <Text style = {styles.backTextWhite}>Mark as read </Text>
        </View>
    </View>
)

    render(){
        return(
<View style ={styles.container}>
    <SwipeListView
    disableRightSwipe
    data = {this.state.allNotifications}
    renderItem ={this.renderItem}
    renderHiddenItem = {this.renderHiddenitem}
    rightOpenValue = {-Dimensions.get("window").width}
    previewRowKey = {"0"}
    previewOpenDelay = {3000}
    onSwipeValueChange = {this.onSwipeValueChange}
    keyExtractor= {(item,index) => index.toString()}
    
    
    />


</View>
        )
    }
}

const styles = StyleSheet.cerate = ({
    container: {
        backgroundColor: "white",
        flex: 1
      },
    rowBack:{
        alignItems:'center',
        backgroundColor:'orange',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:20
    },
    backRightBtn:{
        alignItems: 'center',
        justifyContent:'center',
        bottom :0,
        top : 0,
        width :100
    },
    backRightBtnRight:{
        backgroundColor:'orange',
        right:0
    },
    backTextWhite:{
        color:'white',
        fontWeight:'bold',
        fontSize:15,
        textAlign:'center',
        alignSelf:'flex-start'
    }  
})