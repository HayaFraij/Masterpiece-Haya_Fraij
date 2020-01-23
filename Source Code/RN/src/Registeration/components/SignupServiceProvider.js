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

const codingAcademy0 = '10.6.210.55'

class SignupScreen extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    age: "",
    submittedEmail: "",
    submittedPassword: "",
    submittedName: "",
    submittedPhoneNumber: "",
    submittedAge: ""
  };

  OnSubmit = async () => {
    await this.setState({
      submittedEmail: this.state.email,
      submittedPassword: this.state.password,
      submittedName: this.state.name,
      submittedAge: this.state.age,
      submittedPhoneNumber: this.state.phoneNumber,

      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      age: ""
    });
    let res = await axios.post(
      `http://${codingAcademy0}:9000/users/CreateServeceProvider`,
      {
        email: this.state.submittedEmail,
        password: this.state.submittedPassword,
        name: this.state.submittedName,
        phoneNumber: this.state.submittedPhoneNumber,
        age: this.state.submittedAge
      }
    );
    this.props.navigation.navigate('Sort')

    console.log(res.data);
  };

  // login = () => {
  //   this.props.navigation.navigate('SigninServiceProviderScreen')
  // }
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={{ textAlign: "center" }}>Signup ServiceProvider</Text>
          <View style={styles.passwordView}>
            <Text>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={newValue => this.setState({ email: newValue })}
              placeholder="PLease Enter Your Email"
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
              placeholder="PLease Enter Your Email"
              value={this.state.password}
              style={styles.passwordInput}
              secureTextEntry={true}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.OnSubmit();
              }}
            />
          </View>
          <View style={styles.passwordView}>
            <Text>Name</Text>
            <TextInput
              //   autoCapitalize="none"
              autoCorrect={false}
              onChangeText={newValue => this.setState({ name: newValue })}
              placeholder="PLease Enter Your Name"
              value={this.state.name}
              style={styles.passwordInput}
              //   secureTextEntry={true}
              returnKeyType="next"
              //   onSubmitEditing={() => {
              //     this.OnSubmit();
              //   }}
            />
          </View>
          <View style={styles.passwordView}>
            <Text>Phone</Text>
            <TextInput
              //   autoCapitalize="none"
              autoCorrect={false}
              onChangeText={newValue =>
                this.setState({ phoneNumber: newValue })
              }
              placeholder="PLease Enter Your Phone Number"
              value={this.state.phoneNumber}
              style={styles.passwordInput}
              keyboardType="phone-pad"

              //   secureTextEntry={true}
              //   returnKeyType="Submit"
              //   onSubmitEditing={() => {
              //     this.OnSubmit();
              //   }}
            />
          </View>
          <View style={styles.passwordView}>
            <Text>Age</Text>
            <TextInput
              //   autoCapitalize="none"
              autoCorrect={false}
              onChangeText={newValue => this.setState({ age: newValue })}
              placeholder="PLease Enter Your Phone Number"
              value={this.state.age}
              style={styles.passwordInput}
              keyboardType="phone-pad"
              //   secureTextEntry={true}
              //   returnKeyType="Submit"
              //   onSubmitEditing={() => {
              //     this.OnSubmit();
              //   }}
            />
          </View>
          <Button
            style={{ marginTop: 15 }}
            title="SignUp"
            onPress={this.OnSubmit}
          />
          <Text> {this.state.submittedEmail} </Text>
          <Text> {this.state.submittedPassword} </Text>
          <Text> {this.state.submittedName} </Text>
          <Text> {this.state.submittedPhoneNumber} </Text>
        </View>
          <Button
            style={{ marginTop: 15 }}
            title="Already User"
            onPress={() => this.props.navigation.navigate('SigninServiceProviderScreen')}
          />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 285,
    marginTop: "25%",
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 40
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

export default SignupScreen;
