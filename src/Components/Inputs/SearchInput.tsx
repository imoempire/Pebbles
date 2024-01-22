import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../Constants/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  value: string;
  onChangeText: (value: string) => void;
}

const SearchInput = ({ value, onChangeText }: Props) => {
  const [activeColor, setActiveColor] = useState(Colors.p_gray_light);

  return (
    <View style={[styles.inputBox, { borderColor: activeColor }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setActiveColor(Colors.p_Blue_light)}
        onBlur={() => setActiveColor(Colors.p_gray_light)}
        style={{ width: "90%", fontSize: 16, fontFamily: "Regular" }}
        placeholder={"Search Name or Location"}
      />
      <FontAwesome name="search" size={20} color="#434343" />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputBox: {
    paddingHorizontal: 12,
    height: hp(6),
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
