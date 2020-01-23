import React from 'react';
import { Text, StyleSheet, Button, View, ScrollView } from 'react-native';
import Sort from '../Haya/components/Sort';
import DashBoard from '../Haya/components/DashBoard'
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
// import AboutUs from './AboutUs'
import Wellcome from '../Haya/components/Wellcome'

const UserHomeScreen = (props) => {
  console.log(props.navigation.getParam('user'))
  return(
    <>
    <ScrollView>
    <View>
    <Sort/>
    </View>
    <View style = {{marginTop: 40, marginBottom: 40, width: 300, justifyContent: 'center'}}>
    {/* <NewPost user = {props.navigation.getParam('user')}/> */}
    </View>
    {/* <View style = {{width: 200, alignItems: 'flex-end'}}> */}
    <Posts user = {props.navigation.getParam('user')}/>
    {/* </View> */}
    <Button title = 'DashBoard' onPress = {() => props.navigation.navigate('Dashboard', {user: props.navigation.getParam('user')})}/>
    </ScrollView>
    </>
    )
};

// const MyApp = DrawerNavigator({

//   // For each screen that you can navigate to, create a new entry like this:
//   AboutUs: {
//     screen: AboutUs,
//   },
//   Wellcome: {
//     screen: Wellcome
//   }
// },
//   {
//     initialRouteName: 'Wellcome',
//     drawerPosition: 'left',
//     // contentComponent: CustomDrawerContentComponent,
//     // drawerOpenRoute: 'DrawerOpen',
//     // drawerCloseRoute: 'DrawerClose',
//     // drawerToggleRoute: 'DrawerToggle'
//   });

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 30
//   }
// });

export default UserHomeScreen;
