import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NavHeader = () => {
  return (
    <View style={styles.container}>
      <Text>NavHeader</Text>
    </View>
  );
};

export default NavHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
