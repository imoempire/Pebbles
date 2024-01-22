import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import FormInput from "../Inputs/FormInput";
import { text_S } from "../../Constants/Extra";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LongButton from "../Buttons/LongButton";
import DisabledFormInput from "../Inputs/DisabledInput";
import { KeyboardAvoiderView } from "@good-react-native/keyboard-avoider";

interface Props {
  isVisible?: boolean;
  closeModal?: () => void;
}

const EditNameModal = ({ isVisible, closeModal }: Props) => {
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
      <KeyboardAvoiderView style={styles.content}>
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
              Change Name
            </Text>
          </View>
          <View style={{ gap: 20 }}>
            <FormInput label="Name" placeholder="Enter new name" />
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
      </KeyboardAvoiderView>
    </Modal>
  );
};

export default EditNameModal;

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
    paddingBottom: 20,
    // justifyContent: "center",
    // alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  Greeting: {
    flex: 0.15,
    justifyContent: "center",
  },
});
