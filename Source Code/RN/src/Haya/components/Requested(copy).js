import React, { Component, Fragment } from 'react';
import ListOfProviders from '../components/ListOfProviders'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Switch,
  Text,
  Button,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from "axios";
import StarRating from 'react-native-star-rating';

import { NativeModules } from 'react-native';
import { Card, Rating } from 'react-native-elements';
const { ToastModule } = NativeModules

class Requested extends Component {
  state = {
    listOfProviders: [],
    display: false,
    starCount: 3.5,
    refresh: false
  }

  doneTask(serveceProviderRating) {
    axios.put(`http://${this.props.ipAddress}:9000/users/doneFromUser/${serveceProviderRating}`)
      .then(res => {
        this.setState({ listOfProviders: res.data })
        this.setState({ display: !this.state.display })
      })
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }


  refreshing(val = true) {
    this.setState({
      refresh: val
    });
  }
  // serveceProvider(listOfProviders) {
  // 	axios.get(`http://${this.props.ipAddress}:9000/users/listOfProviders/${listOfProviders}`)
  // 		.then(res => {
  // 			this.setState({ listOfProviders: res.data })
  // 			this.setState({ display: !this.state.display })
  // 		})
  // }

  // refreshing(){
  //   this.setState({refresh: true})
  // }

  serveceProvider(listOfProviders, postId) {
    axios.get(`http://${this.props.ipAddress}:9000/users/listOfProviders/${listOfProviders}`)
      .then(res => {
        this.setState({ listOfProviders: res.data })
        this.setState({ display: true })
        this.setState({ postId })
        console.log('this.state.listOfProviders', this.state.listOfProviders)
      })
  }

  updateProvider(serviceProvider) {
    axios.put(`http://${this.props.ipAddress}:9000/posts/updateProvider/${this.props.postId}/${serviceProvider}`)
      .then(res => {
        this.setState({ display: !this.state.display })

      })
  }





  render() {
    return (
      <Fragment >
        <View style={styles.info}>
          <View style={styles.historyContainer}></View>
          <FlatList
            inverted={true}
            data={this.props.requested}
            renderItem={({ item }) => {
              return (
                <Card>
                  {/* <View style={styles.row}>
										<Text>isRequested? </Text>
										{(item.requested) ? <Text>True</Text> : <Text>False</Text>}
									</View> */}
                  <View style={styles.row}>
                    <Text>{item.task} </Text>
                  </View>
                  <View style={styles.row}>
                    <Text>category: </Text>
                    <Text>{item.Categories} </Text>
                  </View>
                  <View style={styles.row}>
                    <Text>Time: </Text>
                    <Text>{item.time} </Text>
                  </View>
                  <View style={styles.row}>
                    <Text>Price: </Text>
                    <Text>{item.Price} </Text>
                  </View>
                  <View>
                    {(item.serveceProvider) ?
                      <View>
                        <Text>Service Provider: </Text>
                        <Text>{item.serveceProvider} </Text>

                        <Text>Please Rate your Provider</Text>
                        <View style={styles.stars}>

                          <StarRating
                            // disabled={false}
                            maxStars={5}
                            rating={item.serveceProviderRating}
                            starSize={15}
                            fullStarColor='gold'
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                          />
                        </View>
                        <Button
                          title='Done'
                          onPress={this.doneTask}
                        />
                      </View>
                      :
                      <View>
                        <ListOfProviders ipAddress={this.props.ipAddress} listOfProviders={item.listOfProviders} postId={item._id} refreshing={this.refreshing.bind(this)} />


                        {/* <Button
                          title='Providers'
                          onPress={this.serveceProvider.bind(this, item.listOfProviders, item._id)} />
                        {this.state.display ?
                          <View>
                            <FlatList
                              inverted={true}
                              data={this.state.listOfProviders}
                              renderItem={({ item }) => {
                                return (
                                  <Card>
                                    {console.log('hey haya !')}
                                    <Text>
                                      The serveceProvider Name:
                                      {item.name}
                                    </Text>
                                    <Text>
                                      Rating:
										                </Text>
                                    <View style={styles.stars}>
                                      <StarRating
                                        maxStars={5}
                                        rating={item.rating}
                                        starSize={13}
                                        fullStarColor='gold'
                                      />
                                    </View>
                                    <Button
                                      title='Select'
                                      onPress={this.updateProvider.bind(this, item.name, item._id)}
                                    />
                                  </Card>
                                )
                              }}
                            />
                          </View>
                          :
                          null
                        } */}


                      </View>
                    }
                  </View>
                </Card>
              )
            }}
          />
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
    // borderColor: 'black',
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

export default Requested;