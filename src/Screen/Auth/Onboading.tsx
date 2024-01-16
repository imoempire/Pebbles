import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../Constants/Colors";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { blurhash, text_S } from "../../Constants/Extra";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LongButton from "../../Components/Buttons/LongButton";
import useRouter from "../../Hooks/useRouter";
import { SIGNUP_SCREEN } from "../../Constants/Screen_Routes";

const Onboading = () => {
  const { handleNavigator } = useRouter();

  const handleNavigattion = () => {
    handleNavigator(SIGNUP_SCREEN);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.Greeting}>
        <Image
          style={styles.image}
          source={require("../../../assets/logo.png")}
          placeholder={blurhash}
          contentFit="contain"
          transition={1000}
        />
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: wp(15),
            textAlign: "center",
          }}
        >
          Pebbles
        </Text>
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: text_S,
            textAlign: "center",
          }}
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing{"\n"}elitr, sed diam
          nonumy eirmod tempor invidunt ut{"\n"}labore et dolore magna aliquyam
          erat,
        </Text>
      </View>
      <SafeAreaView style={styles.Button}>
        <LongButton press={handleNavigattion} title="Get Started" />
      </SafeAreaView>
    </View>
  );
};

export default Onboading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.p_white,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  Greeting: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  image: {
    flex: 0.2,
    width: wp(35),
  },
  Button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});
