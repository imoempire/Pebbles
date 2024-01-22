import { PixelRatio, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../Constants/Colors";
import { KeyboardAvoiderScrollView } from "@good-react-native/keyboard-avoider";

interface Props {
  placeholder?: string;
  label?: string;
  t_Width?: number;
  value?: string;
}

const DisabledFormInput = ({
  placeholder = "Enter here",
  label = "label",
  t_Width = 40,
  value,
}: Props) => {
  const [activeColor, setActiveColor] = useState(Colors.p_gray_light);
  let textSize = 15;
  let position = textSize - 2;
  if (PixelRatio.get() <= 2) {
    textSize = textSize + 5;
    position = 15;
  }

  return (
    <View
      style={[
        styles.container,
        { borderColor: "#A0A0A0", backgroundColor: "#0000001F" },
      ]}
    >
      <Text
        style={{
          position: "absolute",
          top: -position,
          left: 12,
          fontSize: textSize,
          fontFamily: "Regular",
          backgroundColor: "white",
          height: 20,
          color:
            activeColor === Colors.p_gray_light
              ? Colors.p_gray_dark
              : activeColor,
        }}
      >
        {label}
      </Text>
      <TextInput
        editable={false}
        value={value}
        onFocus={() => setActiveColor(Colors.p_Blue_light)}
        onBlur={() => setActiveColor(Colors.p_gray_light)}
        style={{
          paddingHorizontal: 12,
          height: "90%",
          width: "100%",
          fontSize: 20,
          fontFamily: "Regular",
          color: "#000000BC",
        }}
        placeholder={placeholder}
      />
    </View>
  );
};

export default DisabledFormInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    height: 53,
    borderRadius: 4,
    justifyContent: "center",
  },
});
