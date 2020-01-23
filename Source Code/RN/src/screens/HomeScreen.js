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
    color: 'blue',
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

  reset = ()=>{
    axios.get(`http://${this.state.ipAddress}:9000/posts/posts`)
    .then(res => {
      this.setState({ myPosts: res.data })
      this.setState({ display: false })
      this.setState({ dataFlatlist: res.data })
    })
  }
  // componentWillMount () {
  //   axios.get(`http://${home}:9000/posts/Price`)
  //     .then(res => {
  //       this.setState({ SortPrice_1: res.data })
  //       console.log('price from react')

  //       // this.setState({ dataFlatlist: res.data })
  //     })
  // }




  // componentWillMount () {
  //   axios.get(`http://${home}:9000/posts/Price1`)
  //     .then(res => {
  //       this.setState({ SortPrice1: res.data })
  //       // this.setState({ dataFlatlist: res.data })
  //     })
  // }

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
        {/* DashBoard */}
        <View>
          <TouchableOpacity
            style={{ marginBottom: 30, justifyContent: 'center' }}
            onPress={() => this.props.navigation.navigate('Dashboard', {
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
        <Text>{this.state.dataFlatlist.length}</Text>


        {/* Sort */}
        <Card
        >
          <Dropdown
            baseColor='#900C3F'
            // textColor = 'blue'
            // itemColor = 'red'
            selectedItemColor='#3F082A'
            label='Sort By: '
            data={sortByData}
            // style = {{ }}
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

                    // this.setState({ first: this.state.SortPrice_1 })
                  }
                  else if (value === 'Low to high') {
                    let first = this.state.myPosts.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price))
                    this.setState({ first })
                    // this.setState({ first: this.state.SortPrice1 })
                  } else {
                    // this.setState({ first })
                    // this.setState({ dataFlatlist: this.state.first })

                    // {console.log('this.state.first', this.state.first)}
                    // if( this.state.sortBy === 'isUrgent' && value === 'Urgent'){
                    // let first = this.state.myPosts.filter(elem => elem.IsUrgen === true)
                    // }
                    // else if (this.state.sortBy === 'isUrgent' && value === 'Schadualed'){
                    // let first = this.state.myPosts.filter(elem => elem.IsUrgen === false)
                    // } 
                    // else
                    // {
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
        </Card>
        {/* </View> */}





        {/* {console.log('sort myPosts', this.state.myPosts.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price)))} */}








        {/* NewPost */}
        {/* <View style={{ borderColer: 'black', borderWidth: 2, margin: 20 }}> */}
        <ScrollView>
          {/* <Text>{console.log('this.state.SortPrice1', this.state.SortPrice1)}</Text> */}
          {/* <Text>{console.log('this.state.SortPrice_1', this.state.SortPrice_1)}</Text> */}

          <Card style={{ borderColer: 'blue', justifyContent: 'center' }}>
            <TextInput onChangeText={(task) => this.setState({ newPostState: { ...this.state.newPostState, task: task } })}
              label=' task ' style={{ borderColor: '#0C7576', borderWidth: 1, margin: 20, padding: 10, borderRadius: 7 }}
              placeholder=" Task Describtion.. "
              placeholderTextColor="#074445" />
            <TextInput onChangeText={(Price) => this.setState({ newPostState: { ...this.state.newPostState, Price: Price } })}
              label='price ' placeholder="Price"
              placeholderTextColor="#074445"
              style={{ borderColor: '#0C7576', borderWidth: 1, margin: 20, padding: 10, borderRadius: 7 }} />
            <Dropdown
              baseColor='#40082A'
              selectedItemColor='#900C3F'

              label='Categories'
              data={Categories}
              onChangeText={(Categories) => this.setState({ newPostState: { ...this.state.newPostState, Categories: Categories } })}
            />
            <Dropdown
              baseColor='#40082A'
              selectedItemColor='#900C3F'
              label='isUrgent'
              data={[{ value: 'Urgent', }, { value: 'Schaduled', }]}
              onChangeText={isUrgent => { this.setState({ newPostState: { ...this.state.newPostState, isUrgent: isUrgent } }) }
              }
            />
            <Dropdown
              baseColor='#40082A'
              selectedItemColor='#900C3F'

              onChangeText={(Location) => this.setState({ newPostState: { ...this.state.newPostState, Location: Location } })}
              label='Region'
              data={Location}
            />
            <View style={{ alignSelf: 'center' }}>
              <Button
                onPress={this._onPressButton}
                title="New Post"
                buttonStyle={{ backgroundColor: '#074445', marginTop: 40, width: 200 }}
              />
            </View>
          </Card>
        </ScrollView>
        {/* </View> */}

        {/* posts */}
        {/* style={{ borderColer: '#900C3F', borderWidth: 2, margin: 20, padding: 20 }} */}
        <View style={{ marginTop: 30, flexDirection: 'row-reverse' }}>
          <FlatList
            inverted={true}
            data={this.state.dataFlatlist}
            renderItem={({ item }) =>
              <View style={styles.ContainerView}>
                <View style={styles.listView}>
                  <Avatar rounded title='MG' />
                  <Text style={styles.NameView}> {item.serveceProvider} </Text>
                  <Text note style={styles.TimeView}> {item.time} </Text>
                </View>
                <View style={styles.listView}>
                  <StarRating
                    maxStars={5}
                    rating={item.userRating} // it should be this.props.userRating
                    starSize={15}
                    fullStarColor='gold'
                  />
                </View>
                <View style={styles.listView}>
                  <Text> {item.task} </Text>
                </View>
                <View style={styles.listView}>
                  <Text note> {item.serverProviderRating} </Text>
                </View>
                <View style={styles.listView}>
                  <Text>{item.Price}</Text>
                </View>
                <View style={styles.listView}>
                </View>
                <View style={styles.listView}>
                  <Text>{item.isUrgent}</Text>
                </View>
                <View style={styles.listView}>
                  <Text>
                    Categories: {item.Categories}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    buttonStyle={{ marginTop: 15, width: 100, marginRight: 10, backgroundColor: this.state.color }}
                    title='book'
                    onPress={this.book.bind(this, item._id)}
                  >
                  </Button>
                  <TouchableOpacity
                    style={{ backgroundColor: "red", marginLeft: 10, marginTop: 15, width: 80, height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
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
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  ContainerView: {
    // backgroundColor: '#94948C',
    flex: 1,
    borderColor: '#900C3F',
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    margin: 20,
  },
  listView: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    fontSize: 18,
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
    // width: 40,
    alignItems: 'flex-start',
    margin: 10,
    flexDirection: 'row',
  }
});