import React from 'react';
import {Image} from 'react-native';
import BookDonateScreen from '../screens/BookDonateScreen';
import BookRequestScreen from '../screens/BookRequestScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';

export const AppTabNavigator = createBottomTabNavigator({
    DonateBooks:
    {
     screen:BookDonateScreen,
    navigationOptions:
    {
    tabBarIcon:<Image source = {require("../assets/Donate.png")}
    style = {{width:40,height:40}}
    />,
    tabBarLabel:"Donate Books",
}},
 
RequestBooks:
{
screen:BookRequestScreen,
    navigationOptions:
    {
    tabBarIcon:<Image source = 
    {
        require("../assets/Request.png")
    }
    style = {{width:40,height:40}}
    />,
    tabBarLabel:"Request Books"
}}

});
