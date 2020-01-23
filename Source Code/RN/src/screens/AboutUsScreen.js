import React, { Component } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

class AboutUsScreen extends Component {
  render() {
    return (
      <ScrollView>
        <Card
          title="Haya Fraij"
          image={require("./Images/Haya.jpg")}
          imageStyle={{ height: 265 }}
        >
          <Text style={{ marginBottom: 10 }}>CEO of Be5edmetak.</Text>
          <Button
            icon={<Icon name="mail" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="CONTACT"
          />
        </Card>
        <Card
          title="Deyaa Maali"
          image={require("./Images/Deyaa.jpg")}
          imageStyle={{ height: 265 }}
        >
          <Text style={{ marginBottom: 10 }}>Product Owner of Be5edmetak.</Text>
          <Button
            icon={<Icon name="mail" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="CONTACT"
          />
        </Card>
        <Card
          title="Moath Gharib"
          image={require("./Images/Moath.jpg")}
          imageStyle={{ height: 265 }}
        >
          <Text style={{ marginBottom: 10 }}>
            Backend Web Developer at Be5edmetak.
          </Text>
          <Button
            icon={<Icon name="mail" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="CONTACT"
          />
        </Card>
        <Card
          title="Emad Alrasheed"
          image={require("./Images/emadAlrasheed.jpg")}
          imageStyle={{ height: 265 }}
        >
          <Text style={{ marginBottom: 10 }}>
            Frontend Web Developer at Be5edmetak.
          </Text>
          <Button
            icon={<Icon name="mail" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="CONTACT"
          />
        </Card>
      </ScrollView>
    );
  }
}

export default AboutUsScreen;
