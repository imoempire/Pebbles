import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";

interface Props {
  isVisible?: boolean;
  closeModal?: () => void;
}

const BottomSheet = ({ isVisible, closeModal }: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      onBackdropPress={closeModal}
      swipeDirection={["down"]}
      onSwipeComplete={closeModal}
    >
      <View style={styles.content}>
        <LottieView
          source={require("../../../assets/loader.json")}
          autoSize
          resizeMode="cover"
          style={{ height: 200, width: 200 }}
          autoPlay
          loop={false}
          speed={1.6}
          //   colorFilters={[
          //     {
          //       keypath: "Badge",
          //       color: "#2FC816",
          //     },
          //   ]}
        />
        <Text style={{fontFamily: "Regular", fontSize: 20}}>Loading...</Text>
      </View>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  content: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});
