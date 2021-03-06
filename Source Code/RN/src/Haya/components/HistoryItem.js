import React, { Component, Fragment } from 'react';
import Requested from '../components/Requested'

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
  Image,
} from 'react-native';
import axios from "axios";
import StarRating from 'react-native-star-rating';

import { NativeModules } from 'react-native';
import { Card } from 'react-native-elements';
const { ToastModule } = NativeModules


class HistoryItem extends Component {
  state = {
    requested: [],
    notRequested: [],
    listOfProviders: [],
    serveceProvider: 'name',
    display: false,
    starCount: 4,
  }

  onStarRatingPress = (rating) => {
    this.setState({
      starCount: rating
    });
  }

  componentWillMount() {
    axios.get(`http://${this.props.ipAddress}:9000/posts/getRequested/${this.props.user.name}`)

      .then(res => {
        let requested = []
        let notRequested = []
        for(let i = 0; i < res.data.length; i++) {
          if(res.data[i].requested === true) {
            requested.push(res.data[i])
          }
          else if (res.data[i].requested === false) {
            notRequested.push(res.data[i])
          }
        }
        this.setState({ requested: requested })
        this.setState({ notRequested: notRequested })
      })
  }

  serveceProvider(listOfProviders) {
    axios.get(`http://${this.props.ipAddress}:9000/users/listOfProviders/${listOfProviders}`)
      .then(res => {
        this.setState({ display: true })
        this.setState({ listOfProviders: res.data })
      })
  }

  render() {
    return (
      <Fragment >
        <Text>Your Requested Posts: </Text>
        <Requested requested = {this.state.requested} ipAddress = {this.props.ipAddress}/>
        <Text>Your NOT Requested Posts: </Text>
        <View style={styles.info}>
          <View style={styles.historyContainer}>
            
            <FlatList
              inverted={true}
              data={this.state.notRequested}
              renderItem={({ item }) => {
                return (
                  <Card>
                    {/* <Text>isRequested? </Text>
                    {((item.requested) ? <Text>True</Text> : <Text>False</Text>)} */}
                    <Text>Task Discription: </Text>
                    <Text>{item.task} !</Text>
                    <View style={styles.row}>
                      <Text>Price:</Text>
                      <Text>{item.Price}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text>Date: </Text>
                      <Text>{item.scheduledDate}!</Text>
                    </View>
                  </Card>
                )
              }}
              keyExtractor={item => item._id}
            />
          </View>
        </View>
      </Fragment>
    );
  }
};

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  item: {
    marginRight: 30,
    width: 50,
    height: 50,
  },
  stars: {
    width: 30,
    alignItems: 'flex-start',
    marginLeft: 10
  },
  historyContainer: {
    alignItems: 'center'
  },
  historyItem: {
    borderWidth: 2,
    width: 400,
    padding: 10,
    borderRadius: 15,
    margin: 10
  },
  row: {
    flexDirection: 'row',
    margin: 5
  }
})

export default HistoryItem;