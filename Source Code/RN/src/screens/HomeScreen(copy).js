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
  // Rating,
  TouchableOpacity,
  TouchableOpacityBase
} from 'react-native';
import { Avatar, Rating, Button, Text, Card } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios'
import StarRating from 'react-native-star-rating';
import Icon from "react-native-vector-icons/FontAwesome";


/// Sort Requirment:
sortByData = [{
  value: 'Categories',
}, {
  value: 'Price',
}, {
  value: 'Location',
}, {
  value: 'isUrgent',
}]

const Categories = [{
  value: 'Cleaning',
}, {
  value: 'Shopping',
}, {
  value: 'Kids Needs',
}]

const isUrgent = [{
  value: 'true',
}, {
  value: 'false',
}]

const Price = [{
  value: 'Hight to low',
}, {
  value: 'Low to high',
}]

/// NewPost requirment:

let Location = [{
  value: 'Sweleh',
},
{
  value: 'Aljamaha',
},
{
  value: 'Tlaa Al-Ali',
},
{
  value: 'Alhuseen',
},
{
  value: 'Alsuefieh',
},

];

export default class SortItem extends Component {
  state = {
    // Sort
    getData: [],
    sortBy: '',
    dataDropdown: [],
    dataFlatlist: [],
    count: 0,
    first: [],
    second: [],
    third: [],
    fourth: [],
    color: '#16629E',
    display: false,
    // NewPost
    myPosts: [],
    // SortPrice_1: [],
    // SortPrice1: [],
    newPostState: {
      user: this.props.navigation.getParam('user').name,
      task: '',
      time: `${new Date().getDate()}/${new Date().getMonth()} _ ${new Date().getHours()}: ${new Date().getMinutes()} `,
      Categories: '',
      Price: '',
      isUrgent: '',
      scheduledDate: '',
      Location: '',
      requested: false,
      listOfProviders: [],
      booking: false,
      userRating: this.props.navigation.getParam('user').rating,
      serveceProviderRating: 2,
      serveceProvider: '',
      reports: 0
    },
    ipAddress: this.props.navigation.getParam('ipAddress')
  }

  // Sort 

  componentWillMount() {
    axios.get(`http://${this.state.ipAddress}:9000/posts/posts`)
      .then(res => {
        this.setState({ myPosts: res.data })
        this.setState({ dataFlatlist: res.data })
      })
  }

  reset = () => {
    axios.get(`http://${this.state.ipAddress}:9000/posts/posts`)
      .then(res => {
        this.setState({ myPosts: res.data })
        this.setState({ display: false })
        this.setState({ dataFlatlist: res.data })
      })
  }


  // NewPost 
  _onPressButton = () => {
    axios.post(`http://${this.state.ipAddress}:9000/posts/newPost`, this.state.newPostState)
      .then(response => {
        this.setState({ myPosts: response.data })
        this.setState({ dataFlatlist: response.data })
      })
      .catch(error => {
        console.log(error.response)
      });
  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }


  // Posts:
  book = (id) => {
    axios.put(`http://${this.state.ipAddress}:9000/posts/booking/${id}/${this.props.navigation.getParam('user').name}`)
      .then(res => {
        console.log('from book native', res.data)
      })
    this.setState({ color: 'red' })
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.body}>
        {/* DashBoard */}
        <View>
          <TouchableOpacity
            style={{ marginBottom: 30, justifyContent: 'center' }}
            onPress={() => this.props.navigation.navigate('DashBoard2', {
              user: this.props.navigation.getParam('user'),
              ipAddress: this.props.navigation.getParam('ipAddress')
            })}
          >
            <View
              style={{ justifyContent: 'center' }}
            >
              <Text
                style={{ fontSize: 15, margin: 10, color: '#074445', }}
              >User Name: {this.props.navigation.getParam('user').name} </Text>
              <View style={styles.stars}>
                {/* <Text>User Rating: </Text> */}
                <StarRating
                  maxStars={5}
                  rating={this.props.navigation.getParam('user').rating} // it should be this.props.userRating
                  starSize={13}
                  fullStarColor='gold'
                />
              </View>
              <View
                style={{ height: 2, backgroundColor: '#074445' }}
              >
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {/* <Text>{this.state.dataFlatlist.length}</Text> */}


        {/* Sort */}
        <Card>
        {/* <View  style={{backgroundColor: '#C8D9E7', margin: 0}} > */}
          <Dropdown
            baseColor='#900C3F'
            selectedItemColor='#3F082A'
            label='Sort By: '
            data={sortByData}
            onChangeText={(value) => {
              this.setState({ sortBy: value })
              this.setState({ display: true })
              if (this.state.sortBy === 'Categories') {
                this.setState({ dataDropdown: Categories })
              } else if (this.state.sortBy === 'Price') {
                this.setState({ dataDropdown: Price })
              } else if (this.state.sortBy === 'Location') {
                this.setState({ dataDropdown: Location })
              } else if (this.state.sortBy === 'isUrgent') {
                this.setState({ dataDropdown: isUrgent })
              }
              this.setState({ count: this.state.count + 1 })
            }
            }
          />
          {this.state.display ?
            <Dropdown
              baseColor='#40082A'
              selectedItemColor='#900C3F'
              label={this.state.sortBy}
              data={this.state.dataDropdown}
              onChangeText={(value) => {
                if (this.state.count === 1) {
                  if (value === 'Hight to low') {
                    let first = this.state.myPosts.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price))
                    this.setState({ first })
                  }
                  else if (value === 'Low to high') {
                    let first = this.state.myPosts.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price))
                    this.setState({ first })
                  } else {
                    let first = this.state.myPosts.filter(elem => elem[this.state.sortBy] === value)
                    this.setState({ first })
                  }
                  this.setState({ dataFlatlist: this.state.first })
                }

                else if (this.state.count === 2) {

                  if (value === 'Hight to low') {
                    let second = this.state.first.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price))
                    // this.setState({ first })

                    this.setState({ second })
                  }
                  else if (value === 'Low to high') {
                    let second = this.state.first.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price))
                    this.setState({ second })

                    // this.setState({ second: this.state.SortPrice1 })
                  } else {
                    let second = this.state.first.filter(elem => elem[this.state.sortBy] === value)
                    this.setState({ second })
                  }

                  this.setState({ dataFlatlist: this.state.second })
                }

                else if (this.state.count === 3) {
                  if (value === 'Hight to low') {
                    let third = this.state.second.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price))
                    // this.setState({ first })

                    this.setState({ third })
                  }
                  else if (value === 'Low to high') {
                    let third = this.state.second.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price))
                    this.setState({ third })

                    // this.setState({ second: this.state.SortPrice1 })
                  } else {
                    let third = this.state.second.filter(elem => elem[this.state.sortBy] === value)
                    this.setState({ third })
                  }

                  this.setState({ dataFlatlist: this.state.third })
                }

                else if (this.state.count === 4) {
                  if (value === 'Hight to low') {
                    let fourth = this.state.third.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price))
                    // this.setState({ first })

                    this.setState({ fourth })
                  }
                  else if (value === 'Low to high') {
                    let fourth = this.state.third.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price))
                    this.setState({ fourth })

                    // this.setState({ second: this.state.SortPrice1 })
                  } else {
                    let fourth = this.state.third.filter(elem => elem[this.state.sortBy] === value)
                    this.setState({ fourth })
                  }
                  this.setState({ dataFlatlist: this.state.fourth })
                }
              }}
            />
            : null
          }
          <Button
            buttonStyle={{
              borderRadius: 10,
              width: 100,
              backgroundColor: "#841584"
            }}
            title="Rest Filter"
            onPress={this.reset}
          />
        {/* </View> */}
        </Card>



        {/* posts */}
        <View style={{ marginTop: 30, flexDirection: 'row-reverse' }}>
          <FlatList
            inverted={true}
            data={this.state.dataFlatlist}
            renderItem={({ item }) =>
              <View style={styles.ContainerView}>
                <View style={styles.listView}>
                  <Avatar rounded title='NU' />
                  <Text style={styles.NameView}> {item.user} </Text>
                  <Text note style={styles.TimeView}> {item.time} </Text>
                </View>
                <View style={styles.listView}>
                  <StarRating
                    maxStars={5}
                    rating={item.userRating}
                    starSize={15}
                    fullStarColor='gold'
                  />
                </View>
                <View style={styles.listInfo}>
                  <Icon
                    name="file-text-o"
                    color="#660066"
                    size={20}
                  />
                  <Text style={styles.textLarge}> {item.task} </Text>
                </View>
                <View style={styles.listInfo}>
                  <Icon
                    name="dollar"
                    color="#660066"
                    size={20}
                  />
                  <Text style={styles.textLarge}>{item.Price}</Text>
                </View>
                <View style={styles.listInfo}>
                  <Icon
                    name="list"
                    color="#660066"
                    size={12}
                  />
                  <Text style={styles.textSmall}>
                    {item.Categories}
                  </Text>
                </View>
                <View style={styles.listInfo}>
                  <Icon
                    name="location-arrow"
                    color="#660066"
                    size={12}
                  />
                  <Text style={styles.textSmall}>
                    {item.Location}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    buttonStyle={{ marginTop: 15, width: 100, marginRight: 10, backgroundColor: this.state.color }}
                    title='Book'
                    onPress={this.book.bind(this, item._id)}
                  >
                  </Button>
                  <TouchableOpacity
                    style={{ backgroundColor: "#CF0707", marginLeft: 10, marginTop: 15, width: 80, height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
                    onPress={async () => {
                      let res = await axios.put(
                        `http://${this.state.ipAddress}:9000/posts/report/${item._id}`
                      );
                      await this.setState({ myPosts: res.data, dataFlatlist: res.data });
                      console.log(item.reports);
                      if (item.reports >= 2) {
                        let res = await axios.put(
                          `http://${this.state.ipAddress}:9000/posts/report2/${item._id}`
                        );
                        await this.setState({ myPosts: res.data, dataFlatlist: res.data });
                      }
                      alert("you report sent sucssesfully,, Thank you!");
                    }}
                  >
                    <Text style={{ color: 'white' }}>Report</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            keyExtractor={item => item._id}
          />
        </View>

        </View>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  body: {
    backgroundColor: '#C8D9E7'
  },
  ContainerView: {
    flex: 1,
    borderColor: '#900C3F',
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    margin: 20,
    backgroundColor: '#C8D9E7'
  },
  listView: {
    flexDirection: 'row',
    textAlign: 'justify',
    lineHeight: 30,
  },
  TimeView: {
    position: 'absolute',
    right: 0
  },
  DropDown: {
    color: 'black',
    backgroundColor: '#fff',
  },
  NameView: {
    paddingTop: 7
  },
  stars: {
    alignItems: 'flex-start',
    margin: 10,
    flexDirection: 'row',
  },
  textLarge: {
    marginLeft: 10,
    fontSize: 18
  },
  textSmall: {
    marginLeft: 15,
    fontSize: 12
  },
  listInfo: {
    flexDirection: 'row',
    textAlign: 'justify',
    lineHeight: 30,
    marginTop: 20,
  },
});