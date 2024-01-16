import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../Constants/Colors";
import Constants from "expo-constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ForgetPassword = () => {
  return (
    <View style={styles.container}>
      <Text>ForgetPassword</Text>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.p_white,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
});
