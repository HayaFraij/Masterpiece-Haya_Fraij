import React, { Component } from "react";
import axios from "axios";
import {
  Text,
  StyleSheet,
  View,
  Button,
  FlatList,
  TextInput,
  TouchableNativeFeedback
} from "react-native";

const codingAcademy = '10.60.247.112'
const home = '192.168.1.92'
const codingAcademy0 = '10.6.210.55'
// const sakan = ''

class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    submittedEmail: "",
    submittedPassword: "",
    valid: false
  };

  OnSubmit = async () => {
    await this.setState({
      submittedEmail: this.state.email,
      submittedPassword: this.state.password,
      email: "",
      password: ""
    });
    let res = await axios.post(
      `http://${codingAcademy0}:9000/users/getUsers`,
      {
        email: this.state.submittedEmail,
        password: this.state.submittedPassword
      }
    );
    if (res.data.length !== 0) {
      await this.setState({
        valid: true
      });
      this.props.navigation.navigate('ServeceProviderHome', {user: res.data[0]})
    } else await this.setState({ valid: false });
    console.log(res.data);
  };
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={{ textAlign: "center" }}>Login ServiceProvider</Text>
          <View style={styles.emailView}>
            <Text>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={newValue => this.setState({ email: newValue })}
              placeholder="example@example.com"
              value={this.state.email}
              style={styles.emailInput}
              keyboardType="email-address"
              dataDetectorType="email"
              //   onFocus={() => true}
            />
          </View>
          <View style={styles.passwordView}>
            <Text>Password</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={newValue => this.setState({ password: newValue })}
              placeholder="PLease Enter Your Password"
              value={this.state.password}
              style={styles.passwordInput}
              secureTextEntry={true}
              returnKeyType="send"
              // onSubmitEditing={() => {
              //   this.OnSubmit();
              // }}
            />
          </View>
          <Button
            style={{ marginTop: 15 }}
            title="Login"
            onPress={this.OnSubmit}
          />
          <Text> {this.state.submittedEmail} </Text>
          <Text> {this.state.submittedPassword} </Text>
          <Text> {this.state.valid ? "VALID" : "NOTVALID"} </Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "60%",
    height: 136,
    marginTop: "25%",
    borderColor: "black",
    borderWidth: 1,
    marginLeft: "20%"
  },
  emailView: {
    flexDirection: "row"
  },
  emailInput: {
    borderColor: "black",
    borderWidth: 1
  },
  passwordView: {
    flexDirection: "row",
    marginBottom: 15
  },
  passwordInput: {
    borderColor: "black",
    borderWidth: 1
  }
});

export default LoginScreen;
