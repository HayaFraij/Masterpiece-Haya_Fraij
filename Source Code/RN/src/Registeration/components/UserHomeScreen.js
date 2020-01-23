import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  FlatList,
  TextInput,
  TouchableNativeFeedback
} from "react-native";
import Post from "./Components/Post";

class UsersHomeScreen extends Component {
  render() {
    return (
      <View>
        <Text>HomePage User</Text>
        <Post />
      </View>
    );
  }
}
const styles = StyleSheet.create({});

export default UsersHomeScreen;
