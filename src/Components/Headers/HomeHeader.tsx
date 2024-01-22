import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SEARCH_ROUTE } from "../../Constants/Screen_Routes";
import useAuthenticator from "../../Hooks/useAuth";
import useRouter from "../../Hooks/useRouter";

const HomeHeader = ({ navigation }: { navigation: any }) => {
  const { handleNavigator } = useRouter();

  const handleOpenDrawer = (nav: string) => {
    if (nav === "search") {
      return handleNavigator(SEARCH_ROUTE);
    }
    return navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <Entypo
        onPress={() => handleOpenDrawer("menu")}
        name="menu"
        size={30}
        color="black"
      />
      <FontAwesome
        onPress={() => handleOpenDrawer("search")}
        name="search"
        size={20}
        color="black"
      />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
});
