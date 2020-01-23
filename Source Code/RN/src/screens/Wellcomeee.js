import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Switch,
  Text,
  TextInput,
  Button,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';

// import { DrawerNavigator } from 'react-navigation'


class Wellcome extends Component {

    render(){
        return (
          <Fragment >
            <View style = {{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 50}}>
              <TouchableOpacity onPress = {() => this.props.navigation.navigate('AbouttUs')}>
                <Text
                style = {{ color:'black', fontWeight: 'bold', borderBottomColor: '#094250', borderBottomWidth: 1, padding: 10}}
                > About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress = {() => this.props.navigation.navigate('ContactUs')}>            
                <Text
                style = {{ color:'black', fontWeight: 'bold', borderBottomColor: '#094250', borderBottomWidth: 1, padding: 10}}                
                > Contact Us</Text>
              </TouchableOpacity>
            </View>
              <View style={styles.Slogan}>
              <Image style={{width: 150, height: 150}} source={require('./Images/logo.webp')}/>
            <Text>Some Slogan ...</Text>
            </View>
            <View style={styles.authentecation}>
            <TouchableOpacity
            style = {{borderWidth: 1, borderBottomColor: 'black', padding: 10, borderRadius: 5, margin: 10}}
            onPress={ () => this.props.navigation.navigate('LoginScreen')}>
                <Text>Register as User!</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style = {{borderWidth: 1, borderBottomColor: 'black', padding: 10, borderRadius: 5, margin: 10}}
            onPress={ () => this.props.navigation.navigate('SigninServiceProviderScreen')}>
                <Text>Register as Servece Provider!</Text>
            </TouchableOpacity>
            </View>
          </Fragment>
        );
    }
  };




  
  const styles = StyleSheet.create({
      Slogan:{
          margin: 50,
          alignItems: 'center'

      },
      authentecation:{
        // margin: 30,
        alignItems: 'center'
      }
  })

  export default Wellcome;