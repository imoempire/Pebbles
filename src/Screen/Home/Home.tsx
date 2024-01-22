import {
  PixelRatio,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../Constants/Colors";
import HomeHeader from "../../Components/Headers/HomeHeader";
import { blurhash, text_S } from "../../Constants/Extra";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import useFetcher from "../../Hooks/useFetcher";
import SvgExample from "../../Components/Arrow";
import EmptyRoutes from "../../Components/EmptyRoutes";
import RenderItem from "./Components/RenderItem";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export type RouteItem = {
  id: number;
  time: string;
  name: string;
  location: string;
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
};

export const routes: RouteItem[] = [
  {
    id: 1,
    time: "2024-01-16T17:34:00",
    name: "Retreat road trip",
    location: "Ashiaman",
    origin: {
      latitude: 5.686548,
      longitude: -0.170637,
    },
    destination: {
      latitude: 5.688342,
      longitude: -0.167839,
    },
  },
  {
    id: 5,
    time: "2024-01-16T17:34:00",
    name: "Retreat road trip",
    location: "Ashiaman",
    origin: {
      latitude: 5.649202,
      longitude: -0.210032,
    },
    destination: {
      latitude: 5.670053,
      longitude: -0.203755,
    },
  },
  {
    id: 2,
    time: "2024-01-15T10:15:00",
    name: "City exploration",
    location: "Downtown",
    origin: {
      latitude: -0.242266,
      longitude: -0.226506,
    },
    destination: {
      latitude: 5.622392,
      longitude: -0.242266,
    },
  },
  {
    id: 3,
    time: "2024-01-14T14:45:00",
    name: "Mountain hike",
    location: "Mountain Range",
    origin: {
      latitude: 5.686452,
      longitude: -0.171559,
    },
    destination: {
      latitude: 5.710905,
      longitude: -0.1935,
    },
  },
];

export type Section = {
  time: string;
  data: RouteItem[];
};

const Home = ({ navigation }: { navigation: any }) => {
  // const { getAllUsers } = useFetcher();
  // useEffect(() => {
  //   const getAllUser = async () => {
  //     const users = await getAllUsers();
  //     console.log(users, "my");
  //   };
  //   getAllUser();

  //   return () => {
  //     getAllUser();
  //   };
  // }, []);
  const [data, setData] = useState<Section[]>([]);

  useEffect(() => {
    const dataByTime: Section[] = routes.reduce((acc, route) => {
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

    setData(dataByTime);
  }, []);

  let size = 180;
  if (PixelRatio.get() <= 2) {
    size = 140;
  }

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <HomeHeader navigation={navigation} />
      </View>
      <View style={styles.Content}>
        <View style={styles.Greeting}>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: wp(9),
              // lineHeight: 50,
              textAlignVertical: "top",
            }}
          >
            Pebbles
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 18,
              textAlignVertical: "bottom",
              lineHeight: 50,
              color: "#E0E0E0",
              top: 7,
              marginLeft: 5,
            }}
          >
            Dec 25, 2023
          </Text>
        </View>
        <View style={styles.Routes}>
          {routes.length === 0 && <EmptyRoutes />}
          {routes.length !== 0 && (
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
        <SafeAreaView style={styles.BottomBtn}>
          <TouchableOpacity style={[styles.Btn, styles.shadowColor]}>
            <FontAwesome name="circle" size={24} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.p_white,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  Header: {
    flex: 0.15,
  },
  Content: {
    flex: 1.5,
  },
  Greeting: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
  },
  Routes: {
    flex: 1,
    paddingTop: 10,
  },
  image: {
    alignItems: "center",
    width: wp(70),
  },
  BottomBtn: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  Btn: {
    width: wp(18),
    height: wp(18),
    backgroundColor: Colors.p_color,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  shadowColor: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  header: {
    fontSize: 14,
    fontFamily: "Medium",
    color: "#D8D8D8",
    marginBottom: 10,
  },
});
