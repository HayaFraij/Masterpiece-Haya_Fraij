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

const codingAcademy = '10.60.247.112'
const home = '192.168.1.92'
const mobile = '172.20.10.4'
// const sakan = ''

sortByData = [{
  value: 'Categories',
}, {
  value: 'Price',
}, {
  value: 'Location',
}, {
  value: 'Time',
}]

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

const isUrgent = [{
  value: 'Urgent',
}, {
  value: 'Schadualed',
}]

const Price = [{
  value: 'Hight to low',
}, {
  value: 'low to high',
}]


export default class SortItem extends Component {
  state = {
    getData: [],
    sortBy: '',
    dataDropdown: [],
    dataFlatlist: [],
    count: 0,
    first: [],
    second: [],
    third: [],
    fourth: [],
    display: false
  }

  componentWillMount() {
    axios.get(`http://${codingAcademy}:9000/posts/posts`)
      .then(res => this.setState({ getData: res.data }))
  }
  render() {
    return (
      <Fragment>
        <Text>Hello from here</Text>
        <Dropdown
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
            } else if (this.state.sortBy === 'Time') {
              this.setState({ dataDropdown: Time })
            }
            this.setState({ count: this.state.count + 1 })
          }
          }
        />

        {this.state.display ?
          <Dropdown
            label={this.state.sortBy}
            data={this.state.dataDropdown}
            onChangeText={(value) => {
              if (this.state.count === 1) {
                let first = this.state.getData.filter(elem => elem[this.state.sortBy] === value)
                this.setState({ first })
                this.setState({ dataFlatlist: this.state.first })
              } else if (this.state.count === 2) {
                let second = this.state.first.filter(elem => elem[this.state.sortBy] === value)
                this.setState({ second })
                this.setState({ dataFlatlist: this.state.second })
              } else if (this.state.count === 3) {
                let third = this.state.second.filter(elem => elem[this.state.sortBy] === value)
                this.setState({ third })
                this.setState({ dataFlatlist: this.state.third })
              } else if (this.state.count === 4) {
                let fourth = this.state.third.filter(elem => elem[this.state.sortBy] === value)
                this.setState({ fourth })
                this.setState({ dataFlatlist: this.state.fourth })
              }
            }}
          />
          : null
        }
        <FlatList
          data={this.state.dataFlatlist}
          renderItem={({ item }) => {
            return (
              <Text>{item.task}</Text>
            )
          }}
        />
      </Fragment>
    )
  }
}