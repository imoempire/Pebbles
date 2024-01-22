import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
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
import PasswordInput from "../../Components/Inputs/PasswordInput";
import useAuthenticator from "../../Hooks/useAuth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useFetcher from "../../Hooks/useFetcher";

const SignUp = () => {
  const { handleNavigator } = useRouter();
  const { createUser } = useAuthenticator();

  const { getAllUsers } = useFetcher();

  useEffect(() => {
    const getAllUser = async () => {
      const users = await getAllUsers();
      console.log(users, 'my usersss');
      
    };
    getAllUser();

    // return () => {
    //   getAllUser();
    // };
  }, []);

  const handleNavigation = () => {
    /* ---------- */
    createUser("isaac", "ghshs", "isaac@gmail.com")
      .then((item) => {
        console.log(item)
        // handleNavigator(TERMS_SCREEN);
      })
      .catch((error) => {
        console.log(error);
      });
    /* ---------- */
  };

  const handleSignInNavigation = () => {
    handleNavigator(SIGNIN_SCREEN);
  };

  return (
    <KeyboardAwareScrollView
      // automaticallyAdjustKeyboardInsets={true}
      // iosHideBehavior="stay"
      scrollEnabled={true}
      scrollToOverflowEnabled={true}
      // scrollsToTop={true}
      // bounces={false}
      // scrollsToTop
      contentContainerStyle={[
        {
          flex: 1,
        },
        styles.container,
      ]}
    >
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
        <FormInput label="Name" placeholder="Enter you name" />
        <FormInput label="Email Address" placeholder="Enter your email" />
        <PasswordInput label="Password" placeholder="Enter password" />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm password"
        />

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
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.p_white,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    // justifyContent: "space-between",
    // height: "200%",
    // paddingBottom: 100,
  },
  Greeting: {
    flex: 0.15,
    justifyContent: "center",
  },
  Content: {
    flex: 1,
    top: 20,
    gap: 25,
    // height: "200%",
  },
  Button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});
