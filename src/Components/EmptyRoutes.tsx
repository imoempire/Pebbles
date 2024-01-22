import { PixelRatio, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { blurhash } from "../Constants/Extra";
import SvgExample from "./Arrow";
const EmptyRoutes = () => {
  let size = 180;
  if (PixelRatio.get() <= 2) {
    size = 140;
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        style={[
          styles.image,
          {
            flex: 2,
          },
        ]}
        source={require("../../assets/nort.png")}
        placeholder={blurhash}
        contentFit="contain"
        // transition={1000}
      />
      <Text
        style={{
          flex: 0.3,
          fontFamily: "Regular",
          fontSize: 20,
        }}
      >
        No routes recorded... yet
      </Text>
      <View style={{}}>
        <SvgExample width={100} height={size} />
      </View>
    </View>
  );
};

export default EmptyRoutes;

const styles = StyleSheet.create({
  image: {
    alignItems: "center",
    width: wp(70),
  },
});
