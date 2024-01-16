import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { blurhash } from "../../../Constants/Extra";

const OAuth = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/google.png")}
        placeholder={blurhash}
        contentFit="contain"
        transition={1000}
      />
      <Image
        style={styles.image}
        source={require("../../../../assets/fb.png")}
        placeholder={blurhash}
        contentFit="contain"
        transition={1000}
      />
    </View>
  );
};

export default OAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 20
  },
  image: {
    width: wp(15),
  },
});
