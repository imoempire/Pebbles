import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { RouteItem } from "../Home";
import dayjs from "dayjs";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ROUTE_DETAIL } from "../../../Constants/Screen_Routes";
import useRouter from "../../../Hooks/useRouter";

interface Props {
  items: RouteItem;
}

const RenderItem = ({ items }: Props) => {
  const { handleNavigator } = useRouter();
  let time = dayjs(items?.time).format("HH:mm");
  //   let size = 180;
  //   if (PixelRatio.get() <= 2) {
  //     size = 140;
  //   }
  const handleNavigation = (id: number) => {
    handleNavigator(ROUTE_DETAIL, { items: items });
  };
  
  return (
    <TouchableOpacity
      onPress={() => handleNavigation(items.id)}
      style={styles.container}
    >
      <View>
      <Text style={{ fontFamily: "Medium", color: "#A0A0A0", fontSize: wp(6) }}>
        {time}
      </Text>
      </View>
      <View
        style={{
          flex: 0.7,
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{ fontFamily: "Medium", color: "#000000", fontSize: wp(6) }}
        >
          {items.name}
        </Text>
        <Text
          style={{ fontFamily: "Medium", color: "#A0A0A0", fontSize: wp(4) }}
        >
          {items.location}
        </Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Feather name="chevron-right" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
});
