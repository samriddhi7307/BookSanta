import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from '../components/AppTabNavigator';
import SettingScreen from '../screens/SettingScreen';
import CustomSideBarMenu from '../components/CustomSideBarMenu';
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home :
     {
        screen : AppTabNavigator
     } ,

    MyDonations :{
        screen : MyDonationScreen
        },
    Notification:{
        screen : NotificationScreen
    },

     Setting : {
         screen : SettingScreen
     }
   },
    {
contentComponent:CustomSideBarMenu
    },
     
    {
initialRouteName:'Home'
     })