import React from 'react';
import { createStackNavigator} from 'react-navigation-stack';
import BookDonateScreen from '../screens/BookDonateScreen';
import RecieverDetailsScreen from '../screens/RecieverDetailsScreen';

export const AppDrawerNavigator = createStackNavigator({
    BookDonateList:{
        screen:BookDonateScreen
    },
    RecieverDetails:{
        screen:RecieverDetailsScreen
    },
}, 
    {
        initialRouteName:'BookDonateList'
});