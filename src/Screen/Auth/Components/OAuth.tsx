import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../../../Constants/Extra";

const OAuth = ({ promptAsync }: { promptAsync?: () => void }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ width: wp(15), height: wp(15) }}
        onPress={() => promptAsync?.()}
      >
        <Image
          style={styles.image}
          source={require("../../../../assets/google.png")}
          placeholder={blurhash}
          contentFit="contain"
          // transition={1000}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ width: wp(15), height: wp(15) }}>
        <Image
          style={styles.image}
          source={require("../../../../assets/fb.png")}
          placeholder={blurhash}
          contentFit="contain"
          // transition={1000}
        />
      </TouchableOpacity>
    </View>
  );
};

export default OAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    // backgroundColor: 'red'
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
