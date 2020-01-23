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
  FlatList
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios'
    
const r = [5,2,4,3]
const Categories = [{
  value: 'Cleaning',
}, {
  value: 'Shopping',
}, {
  value: 'Kids Need',
}]

const Location = [{
  value: 'amman1',
}, {
  value: 'amman2',
}, {
  value: 'amman3',
}]

const Time = [{
  value: 'Urgent',
}, {
  value: 'Schadualed',
}]

const Price = [{
  value: 'Hight to low',
}, {
  value: 'low to high',
}]

// let testt = task
class Sort extends Component {
  state = {
    sortBy: '',
    allData: [],
    valueToSortBy: [],
    Categories: '',
    Price: '',
    Location: '',
    Time: '',
    // value,
    hello: '',
    fristData: [],
    first: false,
    displayCategories: false,
    displayPrice: false,
    displayLocation: false,
    displayTime: false,
    r:[1,2,4,3]
  }

  componentWillMount() {
    axios.get(`http://10.60.247.112:9000/posts/getAll`)
      .then(res => {
        this.setState({ allData: res.data })
        // console.log(res.data)
      })
  }

  // onClick = (sortedBy, filteredValue) => {
  //   axios.get(`http://10.60.247.112:9000/posts/sortBy/:${filteredValue}`)
  //   .then(res => this.setState({[sortedBy]: res.data}))
  // }

  // occhange = () => {
  //   console.log('this.state.r', this.state.r)
  //   this.setState({r:[...this.state.r.sort((a,b)=>a-b)]})
  //   r.sort((a,b)=>a-b)
  //   // return this.state.r.sort((a,b)=>a-b)
  // }
  render() {
    sortByData = [{
      value: 'Categories',
    }, {
      value: 'Price',
    }, {
      value: 'Location',
    }, {
      value: 'Time',
    }];

    return (
      <Fragment>
        <View style = {{flexDirection: 'row'}}>
        <View style = {{ width: 80}}>
        <Dropdown
          label='Sort By:'
          data={sortByData}
          onChangeText={(value) => {
            this.setState({ sortBy: value })
            // if (this.state.sortBy === 'Categories') {
              var sorted = `display${this.state.sortBy}`
              this.setState({ [sorted]: true })
              // this.setState({ Categories: value })
              // console.log(this.state.display)
            // }
            //  else if (this.state.sortBy === 'Price') {
            //   // this.setState({ Price: value })
            //   this.setState({ displayPrice: true })
            //   // console.log(this.state.display)
            // } else if (this.state.sortBy === 'Time') {
            //   // this.setState({ Time: value })
            //   this.setState({ displayTime: true })
            //   // console.log(this.state.display)
            // } else if (this.state.sortBy === 'Location') {
            //   // this.setState({ Location: value })
            //   this.setState({ displayLocation: true })
            //   // console.log(this.state.display)
            // }
          }}
        />
        </View>
        
        {this.state.displayCategories ?
        <View style = {{ width: 80}}>          
          <Dropdown
            label= {this.state.sortBy}
            data={Categories}
            onChangeText={(value) => {
              if (!this.state.first){
                let newData = this.state.allData.filter(elem => elem.categories === value)
                this.setState({ Categories: newData })
              } else {
                let newData = this.state.fristData.filter(elem => elem.categories === value)
                this.setState({ first: ture })                
              }
              // this.setState({ allData: newData })
              // this.onClick('Categories', value)
            }}
          />
          {/* <Dropdown
            label= {this.state.sortBy}
            data={Categories}
            onChangeText={(value) => {
              if (!this.state.first){
                let newData = this.state.allData.filter(elem => elem.categories === value)
                this.setState({ Categories: newData })
              } else {
                let newData = this.state.fristData.filter(elem => elem.categories === value)

              }
              // this.setState({ allData: newData })
              // this.onClick('Categories', value)
            }}
          /> */}
          </View>
          : null}

        {this.state.displayPrice ?
        <View style = {{ width: 80}}>                    
          <Dropdown
            label='Price'
            data={Price}
            onChangeText={(value) => {
              // this.setState({ Price: value })
              let newData = this.state.allData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
              // console.log(this.state.allData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)))
                this.setState({ Price: newData})
                // console.log(this.state.allData)
            }}
          />
          </View>
          : null}

        {this.state.displayLocation ?
        <View style = {{ width: 80}}>                    
          <Dropdown
            label='Location'
            data={Location}
            onChangeText={(value) => {
              this.setState({ Location: value })
              let newData = this.state.allData.filter(elem => elem.location === value)
              this.setState({ allData: newData })
            }}
          />
          </View>
          : null}

        {this.state.displayTime ?
        <View style = {{ width: 80}}>          
          <Dropdown
            label='Time'
            data={Time}
            onChangeText={(value) => {
              this.setState({ Time: value })
              let isUrgent = false
              if (value === 'Urgent') {
                isUrgent = true
              }
              let newData = this.state.allData.filter(elem => elem.isUrgent === isUrgent)
              this.setState({ allData: newData })
            }}
          />
          </View>
          : null}
            {/* {console.log(this.state.allData)} */}
            </View>
        <FlatList
          data={this.state.allData}
          renderItem={({ item }) => { 
            return <Text>{item.task}</Text> }}
            />
      </Fragment>
    );
  }
};

// const styles = StyleSheet.create({
//   Dropdown:{
//       display: 'none'
//   }
// })


export default Sort;