import React, { Component, Fragment } from 'react';
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
import axios from "axios";
import StarRating from 'react-native-star-rating';

import {NativeModules} from 'react-native';
const { ToastModule } = NativeModules

const codingAcademy = '10.60.247.112'
const home = '192.168.1.92'
// const sakan = ''
class HistoryItem extends Component {
  state = {
    myPosts: [],
    serveceProvider: 'name',
    starCount: 4,

  }
  // componentWillMount(){
  //     axios.get(`http://${home}:9000/posts/getAll`)
  //     // :${this.state.serveceProvider}
  //     .then(res => {
  //         this.setState({myPosts:res.data})
  //         console.log(this.state)
  //     })
  // }
  onStarRatingPress = (rating) => {
    this.setState({
      starCount: rating
    });
  }

  componentWillMount() {
    axios.get(`http://${home}:9000/posts/getHistory/${this.props.user.name}`)
      // axios.get(`http://${codingAcademy}:9000/posts/getHistory/:${this.props.user.name}`)
      // :${this.state.serveceProvider}then
      // console.log('this.props.user.name', this.props.user.name)
      .then(res => {
        this.setState({ myPosts: res.data })
        console.log('this.state.myPosts', this.state.myPosts.length)
      })
  }
  render() {
    // const {price, date, serveceProviderRating} = this.state.myPosts
    return (
      <Fragment >
        {/* <Text>{this.props.user.name}</Text> */}
        {/* <Button onPress={this.onClick} title ='test'/> */}
        <View style={styles.info}>
          <View style={styles.historyContainer}>
            <Text>{this.state.myPosts.length}</Text>
            <FlatList
              inverted={true}
              data={this.state.myPosts}
              renderItem={({ item }) => {
                return (
                  <View style={styles.historyItem}>
                    {/* // data= this.state.myPosts */}
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
                    <View style={styles.row}>
                      <Text>Your Task Rating: </Text>
                      <Text>{item.serveceProviderRating}</Text>
                    </View>
                    <View style={{ width: 150 }}>
                      <Button
                        title='Done'
                        // onPress={() =>
                        //   alert(
                        //     <StarRating
                        //       maxStars={5}
                        //       rating={this.state.starCount} // it should be this.props.userRating
                        //       starSize={15}
                        //       fullStarColor='gold'
                        //       selectedStar={(rating) => this.onStarRatingPress(rating)}
                        //     />
                        //   )
                        //  ToastModule.showText(`Hellllllo`)
                        // }
                      />
                    </View>
                  </View>
                )
              }}
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
    borderColor: 'black',
    borderWidth: 2,
    width: 300,
    padding: 10
  },
  row: {
    flexDirection: 'row',
  }
})

export default HistoryItem;