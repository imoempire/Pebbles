import { PixelRatio, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../Constants/Colors";
import { KeyboardAvoiderScrollView } from "@good-react-native/keyboard-avoider";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  placeholder?: string;
  label?: string;
  t_Width?: number;
}

const PasswordInput = ({
  placeholder = "Enter here",
  label = "label",
  t_Width = 40,
}: Props) => {
  const [activeColor, setActiveColor] = useState(Colors.p_gray_light);
  let textSize = 15;
  let position = textSize - 2;
  if (PixelRatio.get() <= 2) {
    textSize = textSize + 5;
    position = 15;
  }

  return (
    <View style={[styles.container, { borderColor: activeColor }]}>
      <Text
        style={{
          position: "absolute",
          top: -position,
          left: 12,
          fontSize: textSize,
          fontFamily: "Regular",
          backgroundColor: "white",
          height: 25,
          color:
            activeColor === Colors.p_gray_light
              ? Colors.p_gray_dark
              : activeColor,
        }}
      >
        {label}
      </Text>
      <TextInput
        onFocus={() => setActiveColor(Colors.p_Blue_light)}
        onBlur={() => setActiveColor(Colors.p_gray_light)}
        style={{ paddingHorizontal: 12, height: "70%",  width: "80%" }}
        placeholder={placeholder}
        secureTextEntry={true}
      />
      <MaterialCommunityIcons
        style={{ paddingHorizontal: 12 }}
        name="eye"
        size={24}
        color="black"
      />
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    height: 53,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
