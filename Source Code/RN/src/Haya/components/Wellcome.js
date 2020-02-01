import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Switch,
  // Text,
  TextInput,
  // Button,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Avatar, Rating, Button, Text, Card, Input } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";


class Wellcome extends Component {
  state = {
    ipAddress: '172.20.10.2'
  }

  render() {
    return (
      <Fragment >
        <View style={{ backgroundColor: '#3098B1', flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 50 }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AbouttUs')}>
              <Text
                style={{ color: 'white', fontWeight: 'bold', borderBottomColor: '#094250', borderBottomWidth: 1, padding: 10 }}
              > About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactUs')}>
              <Text
                style={{ color: 'white', fontWeight: 'bold', borderBottomColor: '#094250', borderBottomWidth: 1, padding: 10 }}
              > Contact Us</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Slogan}>
            <Image style={{ width: 150, height: 150, marginTop: 10 }} source={require('../../screens/Images/logo.webp')} />
            <Text
              style={{ color: '#094250', fontSize: 20, margin: 40, fontWeight: 'bold' }}
            >We are Always  بخدمتكـ !</Text>
          </View>
          <View style={styles.authentecation}>
            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={() => this.props.navigation.navigate('LoginScreen', { ipAddress: this.state.ipAddress })}>
              <Text
                style={{ color: '#D4F1F8', fontSize: 14 }}
              >Register as User!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={() => this.props.navigation.navigate('LoginScreen2', { ipAddress: this.state.ipAddress })}>
              <Text
                style={{ color: '#D4F1F8', fontSize: 14 }}
              >Register as Servece Provider!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Fragment>
    );
  }
};


const styles = StyleSheet.create({
  Slogan: {
    // margin: 50,
    alignItems: 'center'

  },
  authentecation: {
    // margin: 30,
    alignItems: 'center'
  },
  TouchableOpacity: {
    margin: 10,
    color: '#1C4B7D',
    borderWidth: 0.8,
    padding: 15,
    borderRadius: 5,
    borderColor: '#094250'
  }
})

export default Wellcome;

       