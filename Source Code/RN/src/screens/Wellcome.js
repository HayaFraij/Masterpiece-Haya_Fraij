import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Switch,
  Text,
  TextInput,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { Card, ListItem, Button, Icon, withTheme } from 'react-native-elements'
import {Icon} from 'react-native-vector-icons'
// import { DrawerNavigator } from 'react-navigation'

class Wellcome extends Component {
  render() {
    return (
      <Fragment >
         <View style = {{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 50, backgroundColor: '#0A6E5B'}}>
              <TouchableOpacity onPress = {() => this.props.navigation.navigate('AbouttUs')}>
                <Text
                style = {{ color:'white', fontWeight: 'bold', padding: 10}}
                > About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress = {() => this.props.navigation.navigate('ContactUs')}>            
                <Text
                style = {{ color:'white', fontWeight: 'bold', padding: 10}}                
                > Contact Us</Text>
              </TouchableOpacity>
            </View>
        <View style={styles.Slogan}>
          <Image style={{ width: 150, height: 150 }} source={require('../Haya/components/OG_Facebook.png')} />
          <Text>We are Always fff بخدمتكـ !</Text>
        </View>
       
        <View>
          <Card>
            <View style={styles.authentecation}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                <Text>Register as User!</Text>
              </TouchableOpacity>
            </View>
          </Card>
          <Card>
            <View style={styles.authentecation}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SigninServiceProviderScreen')}>
                <Text>Register as Servece Provider!</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </Fragment>
    );
  }
};





const styles = StyleSheet.create({
  Slogan: {
    margin: 50,
    alignItems: 'center'

  },
  authentecation: {
    // margin: 30,
    alignItems: 'center'
  },
  cardStyle: {
    backgroundColor: 'black'
  }
})

export default Wellcome;