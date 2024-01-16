import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../../Constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { text_S } from "../../Constants/Extra";

interface Props {
  title: string;
  press?: () => void;
  disabled?: boolean;
}

const LongButton = ({ title, press, disabled = false }: Props) => {
  let size = 6;
  if (PixelRatio.get() <= 2) {
    size = 8;
  }
  return (
    <TouchableOpacity
      // disabled={disabled}
      onPress={press && press}
      activeOpacity={1}
      style={[
        styles.container,
        {
          height: hp(size),
        },
        {
          backgroundColor: disabled ? Colors.p_gray_des : Colors.p_color,
        },
      ]}
    >
      <Text
        style={{
          fontSize: text_S,
          color: Colors.p_white,
          fontFamily: "Medium",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default LongButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
});
