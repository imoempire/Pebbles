import { SectionList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../Constants/Colors";
import Constants from "expo-constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NavHeader from "../../../Components/Headers/NavHeader";
import { text_S } from "../../../Constants/Extra";
import RenderItem from "../Components/RenderItem";
import dayjs from "dayjs";
import { RouteItem, Section, routes } from "../Home";

const SharedRoutes = () => {
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

    return setData(dataByTime);
  }, [filteredRoutes]);

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <NavHeader />
      </View>
      <View style={styles.Content}>
        <View style={styles.Greeting}>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: wp(6),
            }}
          >
            Received Routes
          </Text>
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: text_S,
            }}
          >
            View all routes shared with you
          </Text>
        </View>
        <View style={styles.Routes}>
          {data.length !== 0 && (
            <>
              <SectionList
                sections={data}
                keyExtractor={(item, index) => item.id.toString() + index}
                renderItem={({ item }) => <RenderItem items={item} />}
                renderSectionHeader={({ section: { time } }) => {
                  let man = dayjs(time).fromNow();
                  return (
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={styles.header}>{time}</Text>
                        <Text style={styles.header}>{man}</Text>
                      </View>
                      <View
                        style={{
                          height: 1,
                          width: "100%",
                          backgroundColor: "#F5F5F5",
                        }}
                      />
                    </View>
                  );
                }}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default SharedRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.p_white,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  Header: {
    flex: 0.1,
  },
  Content: {
    flex: 2,
  },
  Greeting: {
    flex: 0.15,
    justifyContent: "center",
  },
  Routes: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    fontSize: 14,
    fontFamily: "Medium",
    color: "#D8D8D8",
    marginBottom: 10,
  },
});
