import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import useRouter from "../../Hooks/useRouter";

interface Props {
  showTitle?: boolean;
}

const NavHeader = ({ showTitle = false }: Props) => {
  const {goBack} = useRouter()
  return (
    <View style={styles.container}>
      <MaterialIcons
        style={{ flex: 0.5 }}
        name="arrow-back-ios"
        size={24}
        color="black"
        onPress={()=>goBack()}
      />
      {showTitle ? (
        <Text
          style={{
            flex: 1,
            textAlign: "center",
          }}
        >
          NavHeader
        </Text>
      ) : (
        <View />
      )}
      <View style={{ flex: 0.5 }} />
    </View>
  );
};

export default NavHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
