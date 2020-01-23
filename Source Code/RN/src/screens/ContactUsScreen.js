import React, { Component } from "react";
import { Text, View, TextInput, Button, ScrollView } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";

class ContactUsScreen extends Component {
  render() {
    return (
      <>
        <View>
          <ScrollView>
            <View
              style={{
                width: "70%",
                alignSelf: "center",
                marginVertical: 25
              }}
            >
              <Text style={{ textAlign: "center" }}>
                Our support team is spread across the globe to help you fast
              </Text>
            </View>
            <View
              style={{
                borderColor: "gray",
                borderWidth: 1,
                width: "80%",
                alignSelf: "center",
                padding: 10
              }}
            >
              <View
                style={{
                  width: "70%",
                  alignSelf: "center",
                  marginVertical: 8
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold"
                  }}
                >
                  Contact Us
                </Text>
              </View>
              <View style={{ marginVertical: 13 }}>
                <Text>Your Email:</Text>
                <TextInput style={{ borderWidth: 1, borderColor: "black" }} />
              </View>
              <View style={{ marginVertical: 13 }}>
                <Text>Subject:</Text>
                <TextInput style={{ borderWidth: 1, borderColor: "black" }} />
              </View>
              <View style={{ marginVertical: 13 }}>
                <Text>Message:</Text>
                <TextInput
                  multiline={true}
                  style={{
                    borderWidth: 1,
                    borderColor: "black",
                    height: 100,
                    textAlignVertical: "top"
                  }}
                />
              </View>
              <View>
                <Button title="Send" />
              </View>
            </View>
          </ScrollView>
          <KeyboardSpacer />
        </View>
        <KeyboardSpacer />
      </>
    );
  }
}

export default ContactUsScreen;
