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
import {
  FORGOT_PASSWORD_SCREEN,
  SIGNUP_SCREEN,
  TERMS_SCREEN,
} from "../../Constants/Screen_Routes";
import useRouter from "../../Hooks/useRouter";
import OAuth from "./Components/OAuth";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useAuthenticator from "../../Hooks/useAuth";

const SignIn = () => {
  const { handleNavigator } = useRouter();
  const { loginUser } = useAuthenticator();

  const handleNavigation = () => {
    loginUser("isaac@gmail.com", "ghshs")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleForgotPasswordNavigation = () => {
    handleNavigator(FORGOT_PASSWORD_SCREEN);
  };

  const handleSignInNavigation = () => {
    handleNavigator(SIGNUP_SCREEN);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.Greeting}>
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: wp(6),
          }}
        >
          Welcome Back
        </Text>
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: text_S,
          }}
        >
          Let's get you into your account
        </Text>
      </View>
      <View style={{ flex: 0.2, justifyContent: "center" }}>
        <OAuth />
      </View>
      <View style={styles.Content}>
        <FormInput label="Email Address" placeholder="Enter password" />
        <PasswordInput label="Password" placeholder="Enter password" />
        <View>
          <Text
            style={{
              color: Colors.p_black,
              fontSize: 16,
              textAlign: "right",
              fontFamily: "Regular",
            }}
            onPress={handleForgotPasswordNavigation}
          >
            Forgot your password?
          </Text>
        </View>
        <View style={{ gap: 5 }}>
          <LongButton press={handleNavigation} title="Sign In" />
          <Text
            style={{
              color: Colors.p_black,
              fontSize: 18,
              textAlign: "center",
              fontFamily: "Regular",
            }}
          >
            Don't have an account?{" "}
            <Text
              onPress={handleSignInNavigation}
              style={{ color: Colors.p_black, fontFamily: "Bold" }}
            >
              Get Started
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;

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
