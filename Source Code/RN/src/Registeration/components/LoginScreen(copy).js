import React, { Component } from "react";
import axios from "axios";
import Icon2 from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Entypo";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import KeyboardSpacer from "react-native-keyboard-spacer";
import {
  Text,
  StyleSheet,
  View,
  // Button,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from "react-native";


class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    submittedEmail: "",
    submittedPassword: "",
    valid: true,
    focusNext: false,
    ipAddress: this.props.navigation.getParam('ipAddress')
    // test: ''
  };
  OnSubmit = async () => {
    if (this.state.email === "" || this.state.password === "") return;
    await this.setState({
      submittedEmail: this.state.email,
      submittedPassword: this.state.password,
      email: "",
      password: ""
    });
    let res = await axios.post(`http://${this.state.ipAddress}:9000/users/getUsers`, {
      email: this.state.submittedEmail,
      password: this.state.submittedPassword
    });
    if (res.data.length !== 0) {
      await this.setState({
        valid: true
      });
      this.props.navigation.navigate("HomeScreen2", {
        user: res.data[0],
        ipAddress: this.state.ipAddress
      });
    } else await this.setState({ valid: false });
    // console.log("res.data[0]", res.data[0]);
  };
  render() {
    return (
      <>
        <ImageBackground
          // source={require("./images/background.png")}
          style={{width: "100%", height: "100%", backgroundColor: "#FFFFFF"}}
          >
          <View style={{ flex: 1, backgroundColor: "#ccddff" }}>
            <ScrollView>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 28,
                  fontWeight: "bold",
                  marginTop: 10
                }}
              >
                بخدمتك
              </Text>
              <View style={styles.container}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 21,
                    fontWeight: "bold",
                    marginBottom: 30,
                    color: "#660066"
                  }}
                >
                  دخول مزود الخدمة
                </Text>
                <View style={styles.emailView}>
                  {/* <Text>Email</Text> */}
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={true}
                    onChangeText={newValue =>
                      this.setState({ email: newValue })
                    }
                    placeholder="Examlpe@email.com"
                    value={this.state.email}
                    inputStyle={styles.emailInput}
                    keyboardType="email-address"
                    returnKeyType="go"
                    dataDetectorType="email"
                    leftIcon={<Icon2 name="user" size={24} color="#660066" />}
                    inputContainerStyle={{
                      width: "95%"
                      // backgroundColor: "white"
                    }}
                    onSubmitEditing={async () => {
                      await this.setState({ focusNext: true });
                      this.secondTextInput.focus();
                    }}
                    blurOnSubmit={false}
                    // containerStyle={{ fontSize: 12 }}
                    //   onFocus={() => true}
                  />
                </View>
                <View style={styles.passwordView}>
                  {/* <Text>Password</Text> */}
                  <Input
                    blurOnSubmit={false}
                    autoFocus={this.state.focusNext}
                    ref={input => {
                      this.secondTextInput = input;
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={newValue =>
                      this.setState({ password: newValue })
                    }
                    placeholder="*******"
                    value={this.state.password}
                    inputStyle={styles.passwordInput}
                    secureTextEntry={true}
                    returnKeyType="send"
                    inputContainerStyle={{
                      width: "95%"
                      // backgroundColor: "white"
                    }}
                    leftIcon={
                      <Icon
                        name="key"
                        size={24}
                        color="#660066"
                        iconStyle={{}}
                      />
                    }
                    onSubmitEditing={() => {
                      this.setState({ focusNext: false });
                      this.OnSubmit();
                    }}
                  />
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: 7,
                    // width: "40%",
                    // left: 92
                    alignSelf:"center"
                  }}
                >
                  <Button
                    buttonStyle={{
                      borderRadius: 10,
                      width: 100,
                      backgroundColor: "#841584"
                    }}
                    title="Login"
                    onPress={this.OnSubmit}
                  />
                </View>
                <View
                  style={{
                    // marginLeft: 50,
                    marginVertical: 12,
                    alignSelf: "center"
                  }}
                >
                  <Text style={{ color: "red" }}>
                    {this.state.submittedEmail !== "" ||
                    this.state.submittedPassword !== ""
                      ? this.state.valid
                        ? null
                        : "Username or Password is wrong"
                      : null}
                    {/* {this.state.focusNext ? "TRUE" : "FALSE"} */}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    // marginLeft: 45,
                    marginTop: 19,
                    alignSelf: "center"
                  }}
                >
                  <Text>Dont Have Account? </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("SignupScreen2", {ipAddress: this.state.ipAddress})
                    }
                  >
                    <Text style={{ textDecorationLine: "underline" }}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <Text> {this.state.submittedEmail} </Text>
              <Text> {this.state.submittedPassword} </Text> */}
              </View>
            </ScrollView>
          </View>
          <KeyboardSpacer />
        </ImageBackground>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 340,
    marginTop: "25%",
    borderColor: "black",
    // borderWidth: 1,
    // marginLeft: "20%"
    alignSelf: "center",
    flexDirection: "column",
    borderRadius: 10
  },
  emailView: {
    // flexDirection: "row"
    marginBottom: 22
  },
  emailInput: {
    // borderColor: "black",
    // borderWidth: 1,
    fontSize: 15,
    marginLeft: 10
    // backgroundColor: "white"
  },
  passwordView: {
    flexDirection: "row",
    marginBottom: 15
  },
  passwordInput: {
    // borderColor: "black",
    // borderWidth: 1,
    fontSize: 15,
    marginLeft: 10
    // backgroundColor: "white"
  }
});
export default LoginScreen;