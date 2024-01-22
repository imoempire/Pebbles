import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../Constants/Colors";
import Constants from "expo-constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NavHeader from "../../Components/Headers/NavHeader";
import { text_S } from "../../Constants/Extra";
import FormInput from "../../Components/Inputs/FormInput";
import LongButton from "../../Components/Buttons/LongButton";
import useRouter from "../../Hooks/useRouter";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import BottomSheet from "../../Components/Modal/BottomSheet";
import { HOME_SCREEN } from "../../Constants/Screen_Routes";

const ForgetPassword = () => {
  // HOOKS
  const { handleNavigator } = useRouter();

  // STATES
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const openBottomSheet = () => setBottomSheetVisible(true);
  const closeBottomSheet = () => setBottomSheetVisible(false);

  const handleNavigation = () => {
    setEmailSent(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      closeBottomSheet();
    handleNavigator(HOME_SCREEN);
    }, 1000);
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <NavHeader />
      </View>
      <View style={styles.Content}>
        <View style={styles.Greeting}>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: wp(6),
            }}
          >
            Forgot password
          </Text>
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: text_S,
            }}
          >
            We'll send you a link to reset it
          </Text>
        </View>
        <View style={styles.Form}>
          {!emailSent && (
            <FormInput label="Email Address" placeholder="Enter your email" />
          )}
          {emailSent && (
            <>
              <PasswordInput label="Password" placeholder="Enter password" />
              <PasswordInput
                label="Confirm Password"
                placeholder="Enter password"
              />
            </>
          )}
          <LongButton
            press={handleNavigation}
            title={emailSent ? "Reset Password" : "Send Link"}
          />
        </View>
      </View>
      <BottomSheet isVisible={isLoading} closeModal={closeBottomSheet} />
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
  Header: {
    flex: 0.1,
  },
  Content: {
    flex: 2,
  },
  Greeting: {
    flex: 0.15,
  },
  Form: {
    flex: 1,
    gap: 20,
  },
});
