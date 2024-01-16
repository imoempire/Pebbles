import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Constants from "expo-constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { text_S } from "../../Constants/Extra";
import { Colors } from "../../Constants/Colors";
import FormInput from "../../Components/Inputs/FormInput";
import { KeyboardAvoiderScrollView } from "@good-react-native/keyboard-avoider";
import LongButton from "../../Components/Buttons/LongButton";
import { SIGNIN_SCREEN, TERMS_SCREEN } from "../../Constants/Screen_Routes";
import useRouter from "../../Hooks/useRouter";
import OAuth from "./Components/OAuth";

const SignUp = () => {
  const { handleNavigator } = useRouter();

  const handleNavigation = () => {
    handleNavigator(TERMS_SCREEN);
  };

  const handleSignInNavigation = () => {
    handleNavigator(SIGNIN_SCREEN);
  };

  return (
    <KeyboardAvoiderScrollView contentContainerStyle={styles.container}>
      <View style={styles.Greeting}>
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: wp(6),
          }}
        >
          Get Started
        </Text>
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: text_S,
          }}
        >
          Let's create you an account
        </Text>
      </View>
      <View style={{ flex: 0.2, justifyContent: "center" }}>
        <OAuth />
      </View>
      <View style={styles.Content}>
        <FormInput label="Name" placeholder="Enter password" />
        <FormInput label="Email Address" placeholder="Enter password" />
        <FormInput label="Password" placeholder="Enter password" />
        <FormInput label="Confirm Password" placeholder="Enter password" />
        
        <View style={{ gap: 5 }}>
          <LongButton press={handleNavigation} title="Get Started" />
          <Text
            style={{
              color: Colors.p_black,
              fontSize: 18,
              textAlign: "center",
              fontFamily: "Regular",
            }}
          >
            Already a member?{" "}
            <Text
              onPress={handleSignInNavigation}
              style={{ color: Colors.p_black, fontFamily: "Bold" }}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoiderScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.p_white,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  Greeting: {
    flex: 0.15,
    justifyContent: "center",
  },
  Content: {
    flex: 1,
    // justifyContent: "center",
    top: 20,
    gap: 25,
  },
  Button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});
