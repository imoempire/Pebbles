import { SectionList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../Constants/Colors";
import Constants from "expo-constants";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
import SearchInput from "../Inputs/SearchInput";
import { AntDesign } from "@expo/vector-icons";
import useRouter from "../../Hooks/useRouter";
import { Section, routes, RouteItem } from "../../Screen/Home/Home";
import dayjs from "dayjs";
import RenderItem from "../../Screen/Home/Components/RenderItem";

const SearchRoutes = () => {
  const { goBack } = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredRoutes, setFilteredRoutes] = useState<RouteItem[]>(routes);
  const [data, setData] = useState<Section[]>([]);

  useEffect(() => {
    const dataByTime: Section[] = filteredRoutes.reduce((acc, route) => {
      const existingSection = acc.find(
        (section) => section.time === route.time
      );

      if (existingSection) {
        existingSection.data.push(route);
      } else {
        acc.push({
          time: route.time,
          data: [route],
        });
      }

      return acc;
    }, [] as Section[]);

    if (searchQuery === "") {
      return setData([]);
    }
    return setData(dataByTime);
  }, [searchQuery, filteredRoutes]);

  useEffect(() => {
    const newFilteredRoutes = routes.filter((route) =>
      route.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRoutes(newFilteredRoutes);
  }, [searchQuery]);


  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }} />
        <View style={{ flex: 2, alignItems: "center" }}>
          <Text style={{ fontFamily: "Medium", fontSize: 20 }}>Search</Text>
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <AntDesign
            onPress={() => goBack()}
            name="close"
            size={24}
            color="black"
          />
        </View>
      </View>
      <View style={{ flex: 0.1, justifyContent: "center" }}>
        <SearchInput
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <View style={styles.Routes}>
        {routes?.length === 0 && (
          <>
            <Text>No results found</Text>
          </>
        )}
        {routes?.length !== 0 && (
          <>
            <SectionList
              sections={data}
              keyExtractor={(item, index) => item.id.toString() + index}
              renderItem={({ item }) => <RenderItem items={item} />}
              renderSectionHeader={({ section: { time } }) => {
                let man = dayjs(time).fromNow();
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.header}>{time}</Text>
                    <Text style={styles.header}>{man}</Text>
                  </View>
                );
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default SearchRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.p_white,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  Routes: {
    flex: 1,
    top: 15,
  },
  header: {
    fontSize: 14,
    fontFamily: "Medium",
    color: "#D8D8D8",
    marginBottom: 10,
  },
});
