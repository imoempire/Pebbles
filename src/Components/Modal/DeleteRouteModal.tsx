import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LongButton from "../Buttons/LongButton";

interface Props {
  isVisible?: boolean;
  closeModal?: () => void;
}

const DeleteRouteModal = ({ isVisible, closeModal }: Props) => {
  const handleChangeName = (name: string) => {
    console.log(name);
  };
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      onBackdropPress={closeModal}
      swipeDirection={["down"]}
      onSwipeComplete={closeModal}
    >
      <View style={styles.content}>
        <View style={{ gap: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <AntDesign
              onPress={() => closeModal?.()}
              name="close"
              size={24}
              color="black"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: wp(6),
                textAlign: "center",
              }}
            >
              Rename Route
            </Text>
          </View>
          <View style={{ gap: 20 }}>
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod
            </Text>
            <View style={{ gap: 5 }}>
              <LongButton
                press={() => handleChangeName("shs")}
                title="Yes, Save it"
              />
                <LongButton
                variant={"outlined"}
                press={() => handleChangeName("shs")}
                title="No, Don't Save it"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteRouteModal;

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
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});
