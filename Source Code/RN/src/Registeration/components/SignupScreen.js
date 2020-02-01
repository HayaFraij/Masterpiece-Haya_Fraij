import React, { Component } from "react";
import axios from "axios";
import Icon2 from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Entypo";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
// import KeyboardSpacer from "react-native-keyboard-spacer";
import {
  Text,
  StyleSheet,
  View,
  // Button,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity
  
} from "react-native";
class SignupScreen extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    submittedEmail: "",
    submittedPassword: "",
    submittedName: "",
    submittedPhoneNumber: ""
  };
  OnSubmit = async () => {
    await this.setState({
      submittedEmail: this.state.email,
      submittedPassword: this.state.password,
      submittedName: this.state.name,
      submittedPhoneNumber: this.state.phoneNumber,
      email: "",
      password: "",
      name: "",
      phoneNumber: ""
    });
    let res = await axios.post(`http://${this.props.navigation.getParam('ipAddress')}:9000/users/CreateUser`, {
      email: this.state.submittedEmail,
      password: this.state.submittedPassword,
      name: this.state.submittedName,
      phoneNumber: this.state.submittedPhoneNumber
    });
    this.props.navigation.navigate("LoginScreen");
    console.log(res.data);
  };
  render() {
    return (
      <>
        <View style={styles.back}>
          <View style={styles.container}>
            <Text
              style={{
                marginBottom: 30,
                textAlign: "center",
                fontSize: 30,
                color: "#660066"
              }}
            >
إنشاء حساب جديد
            </Text>
            <View style={styles.passwordView}>
              {/* <Text style={styles.info}>Email:</Text> */}
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={newValue => this.setState({ email: newValue })}
                placeholder="Examlpe@email.com"
                value={this.state.email}
                style={styles.emailInput}
                keyboardType="email-address"
                dataDetectorType="email"
                leftIcon={
                  <Icon name="email" size={24} color="#660066" iconStyle={{}} />
                }
                //   onFocus={() => true}
              />
            </View>
            <View style={styles.passwordView}>
              {/* <Text style={styles.info}>Password:</Text> */}
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={newValue => this.setState({ password: newValue })}
                placeholder="*********"
                value={this.state.password}
                style={styles.passwordInput}
                secureTextEntry={true}
                returnKeyType="next"
                // onSubmitEditing={() => {
                //   this.OnSubmit();
                // }}
                leftIcon={
                  <Icon name="key" size={24} color="#660066" iconStyle={{}} />
                }
              />
            </View>
            <View style={styles.passwordView}>
              {/* <Text style={styles.info}>Name:</Text> */}
              <Input
                //   autoCapitalize="none"
                autoCorrect={false}
                onChangeText={newValue => this.setState({ name: newValue })}
                placeholder="Your Name"
                value={this.state.name}
                style={styles.passwordInput}
                //   secureTextEntry={true}
                returnKeyType="next"
                //   onSubmitEditing={() => {
                //     this.OnSubmit();
                //   }}
                leftIcon={
                  <Icon name="user" size={24} color="#660066" iconStyle={{}} />
                }
              />
            </View>
            <View style={styles.passwordView}>
              {/* <Text style={styles.info}>Phone:</Text> */}
              <Input
                //   autoCapitalize="none"
                autoCorrect={false}
                onChangeText={newValue =>
                  this.setState({ phoneNumber: newValue })
                }
                placeholder="+09842424232"
                value={this.state.phoneNumber}
                style={styles.passwordInput}
                keyboardType="phone-pad"
                //   secureTextEntry={true}
                //   returnKeyType="Submit"
                //   onSubmitEditing={() => {
                //     this.OnSubmit();
                //   }}
                leftIcon={
                  <Icon name="phone" size={24} color="#660066" iconStyle={{}} />
                }
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                // marginLeft: 50,
                marginTop: 19,
                alignSelf: "center"
              }}
            >
              <Text>Already Have Account? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("LoginScreen")}
              >
                <Text style={{ textDecorationLine: "underline" }}>Sign In</Text>
              </TouchableOpacity>
            </View>
            <Button
              buttonStyle={{ backgroundColor: "#841584", marginTop: 30 }}
              title="SignUp"
              onPress={this.OnSubmit}
            />
            {/* <Text> {this.state.submittedEmail} </Text>
            <Text> {this.state.submittedPassword} </Text>
            <Text> {this.state.submittedName} </Text>
            <Text> {this.state.submittedPhoneNumber} </Text> */}
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "90%",
    // height: 300,
    marginTop: "25%",
    marginHorizontal: 20,
    borderRadius: 4,
    backgroundColor: "#ccddff"
  },
  emailView: {
    flexDirection: "row"
  },
  emailInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 20
  },
  passwordView: {
    flexDirection: "row",
    marginBottom: 15
  },
  passwordInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 20
  },
  info: {
    fontSize: 20
  },
  back: {
    flex: 1,
    backgroundColor: "#ccddff"
  }
});
export default SignupScreen;




