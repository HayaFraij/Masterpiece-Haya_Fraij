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
import { Dropdown } from "react-native-material-dropdown";
import axios from "axios";

class Post extends Component {
  state = {
    data: [
      {
        value: "Clean"
      },
      {
        value: "Delivery"
      }
    ],
    data2: [
      {
        value: "Amman"
      },
      {
        value: "Zarqa"
      }
    ],
    data3: [
      {
        value: "Now"
      },
      {
        value: "Later"
      }
    ],
    post: "",
    service: "",
    location: "",
    price: "",
    priority: "",
    SubmittedPost: "",
    SubmittedService: "",
    SubmittedLocation: "",
    SubmittedPrice: "",
    SubmittedPriority: ""
  };

  Submit = async () => {
    console.log("SUBMIT");
    await this.setState({
      SubmittedPost: this.state.post,
      SubmittedService: this.state.service,
      SubmittedLocation: this.state.location,
      SubmittedPrice: this.state.price,
      SubmittedPriority: this.state.priority,
      post: "",
      service: "",
      location: "",
      price: "",
      priority: ""
    });
    // console.log(this.state.post);
    res = await axios.put("http://10.60.241.4:9000/extra/createData", {
      post: this.state.SubmittedPost,
      service: this.state.SubmittedService,
      location: this.state.SubmittedLocation,
      price: this.state.SubmittedPrice,
      priority: this.state.SubmittedPriority
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          multiline={true}
          style={styles.textInput}
          placeholder="Enter Your Post Here"
          onChangeText={newValue => this.setState({ post: newValue })}
          value={this.state.post}
        />
        <View style={{ flexDirection: "row" }}>
          <Text>Price:</Text>
          <TextInput
            keyboardType="decimal-pad"
            style={styles.price}
            placeholder="Price in JD"
            onChangeText={newValue => this.setState({ price: newValue })}
            value={this.state.price}
          />
        </View>
        <View>
          <Dropdown
            style={styles.dropDown}
            label="Kind of Service"
            data={this.state.data}
            onChangeText={newValue => this.setState({ service: newValue })}
            value={this.state.service}
          />
          <Dropdown
            style={styles.dropDown}
            label="Location"
            data={this.state.data2}
            onChangeText={newValue => this.setState({ location: newValue })}
            value={this.state.location}
          />
          <Dropdown
            style={styles.dropDown}
            label="Priority"
            data={this.state.data3}
            onChangeText={newValue => this.setState({ priority: newValue })}
            value={this.state.priority}
          />
        </View>
        <Button title="Post" onPress={() => this.Submit()} />
        <Text>{this.state.SubmittedPost}</Text>
        <Text>{this.state.SubmittedPrice}</Text>
        <Text>{this.state.SubmittedLocation}</Text>
        <Text>{this.state.SubmittedService}</Text>
        <Text>{this.state.SubmittedPriority}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 398,
    marginTop: "7%",
    borderColor: "black",
    borderWidth: 1,
    alignSelf: "center"
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    height: 100,
    width: "90%",
    // marginLeft: 22,
    alignSelf: "center",
    textAlignVertical: "top",
    marginBottom: 15,
    marginTop: 12
  },
  price: {
    width: "25%",
    height: 20,
    borderColor: "black",
    borderWidth: 1
  },
  dropDown: { width: 30 }
});

export default Post;
