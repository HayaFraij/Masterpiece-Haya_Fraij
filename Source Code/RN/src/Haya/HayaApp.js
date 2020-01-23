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
  FlatList
} from 'react-native';
import Wellcome from './components/Wellcome'
// import Wellcome from './components/Wellcome';

class HayaApp extends Component {

    render(){
        return (
          <Fragment>
            <Text>Haya App</Text>
            <Wellcome/>
          </Fragment>
        );
    }
  };
  

  export default HayaApp;