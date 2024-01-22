import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { RouteItem, routes } from "../Home";
import { Colors } from "../../../Constants/Colors";
import Constants from "expo-constants";
import { useIsFocused } from "@react-navigation/native";
import MapBox from "./Map";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { text_S } from "../../../Constants/Extra";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "../../../../env";
import useRouter from "../../../Hooks/useRouter";
import EditNameModal from "../../../Components/Modal/ChangeRouteName";
import DeleteRouteModal from "../../../Components/Modal/DeleteRouteModal";
import { getDistance, getPreciseDistance } from "geolib";

const LOCATION_TASK_NAME = "background-location-task";

const RouteDetails = ({ route }: { route: any }) => {
  const { items } = route.params;
  // HOOKS
  const { width, height } = Dimensions.get("window");
  const isFocused = useIsFocused();
  const { goBack } = useRouter();

  const [myCurrentLocation, setMyCurrentLocation] = useState<any>(null);
  const [locationError, setLocationError] = useState<any>(null);
  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocationError("Location permission denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        // console.log(location, "sssjjsjjsjsjsj");

        setMyCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.error("Error requesting location permission:", error);
      }
    };

    getLocation();
  }, [isFocused]);

  //   STATES
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  // ROUTES STATES
  const [aRoute, setRoute] = useState<RouteItem>(items);
  const [origin, setOrigin] = useState<LatLng | null>();
  const [destination, setDestination] = useState<LatLng | null>();
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  // CONDITIONA STATES
  const [isBottomSheetVisible, setBottomSheetVisible] =
    useState<boolean>(false);
  const [showDirections, setShowDirections] = useState<boolean>(false);
  const [showUser, setshowUser] = useState<boolean>(false);
  const [showdelete, setShowdelete] = useState<boolean>(false);

  const mapRef = useRef<MapView>(null);

  // MODAL HANDLING
  const openBottomSheet = () => setBottomSheetVisible(true);
  const closeBottomSheet = () => setBottomSheetVisible(false);
  const openDeleteModal = () => setShowdelete(true);
  const closeDeleteModal = () => setShowdelete(false);

  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = (args: any) => {
    if (args) {
      const hours = args.duration;
      const minutes = Math.ceil(hours);
      setDistance(args.distance);
      setDuration(minutes);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };

  const showMe = () => {
    setshowUser(true);
  };

  // const onPlaceSelected = (
  //   details: GooglePlaceDetail | null,
  //   flag: "origin" | "destination"
  // ) => {
  //   const set = flag === "origin" ? setOrigin : setDestination;
  //   const position = {
  //     latitude: details?.geometry.location.lat || 0,
  //     longitude: details?.geometry.location.lng || 0,
  //   };

  //   set(position);
  //   moveTo(position);
  //   traceRoute();
  // };

  function toRadians(degrees: number) {
    return (degrees * Math.PI) / 180;
  }

  function calculateHaversineDistance(
    coord1: { latitude: number; longitude: number },
    coord2: { latitude: number; longitude: number }
  ) {
    // console.log(coord1, coord2);

    const Raduis = 6371;
    const LatDistance = toRadians(coord2?.latitude - coord1?.latitude);
    const LonDistance = toRadians(coord2?.longitude - coord1?.longitude);

    const a =
      Math.sin(LatDistance / 2) * Math.sin(LatDistance / 2) +
      Math.cos(toRadians(coord1?.latitude)) *
        Math.cos(toRadians(coord2?.latitude)) *
        Math.sin(LonDistance / 2) *
        Math.sin(LonDistance / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = Raduis * c; // Distance in kilometers

    return distance + distance;
  }

  useEffect(() => {
    const myOrigin = {
      latitude: aRoute?.origin?.latitude,
      longitude: aRoute?.origin?.longitude,
    };
    const myDestination = {
      latitude: aRoute?.destination?.latitude,
      longitude: aRoute?.destination?.longitude,
    };

    const UserDistanc = calculateHaversineDistance(myOrigin, myDestination);
    let UserDistance = 0;
    if (myOrigin && myCurrentLocation) {
      console.log(
        getPreciseDistance(myOrigin, myDestination),
        "hhhh",
        myDestination,
        myOrigin
      );
      UserDistance = getDistance(myOrigin, myDestination) * 2;
    }

    const position1 = {
      latitude: aRoute?.origin.latitude || 0,
      longitude: aRoute?.origin.longitude || 0,
      latitudeDelta: UserDistanc,
      longitudeDelta: UserDistanc,
    };
    const position = {
      latitude: aRoute?.destination.latitude || 0,
      longitude: aRoute?.destination.longitude || 0,
      latitudeDelta: UserDistanc,
      longitudeDelta: UserDistanc,
    };

    console.log("UserDistance", "position", position, "position1", UserDistanc);

    setOrigin(position1);
    setDestination(position);
  }, [isFocused, aRoute]);

  useEffect(() => {
    if (origin && destination) {
      moveTo(origin);
      moveTo(destination);
      traceRoute();
    }
  }, [isFocused, origin, destination, showDirections]);

  const drawerItems: {
    id: number;
    navigationRoute: string;
    iconname: string;
  }[] = [
    {
      id: 2,
      navigationRoute: "",
      iconname: "share",
    },
    {
      id: 3,
      navigationRoute: "",
      iconname: "remove-red-eye",
    },
    {
      id: 4,
      navigationRoute: "",
      iconname: "delete",
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={myCurrentLocation}
        provider={PROVIDER_GOOGLE}
        showsCompass={true}
        showsUserLocation={showUser}
        rotateEnabled={true}
        followsUserLocation
      >
        {showDirections && origin && (
          <Marker coordinate={origin} title="Origin">
            <View
              style={{
                backgroundColor: "#00AA72",
                borderRadius: 50,
                padding: 2,
              }}
            >
              <FontAwesome name="dot-circle-o" size={20} color="white" />
            </View>
          </Marker>
        )}
        {showDirections && destination && (
          <Marker coordinate={destination} title="Destination">
            <View
              style={{
                backgroundColor: "#EF3C3C",
                borderRadius: 50,
                padding: 2,
              }}
            >
              <MaterialIcons name="location-on" size={20} color="white" />
            </View>
          </Marker>
        )}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#000000"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>
      <TouchableOpacity
        onPress={() => {
          goBack();
        }}
        style={styles.BackContainer}
      >
        <MaterialIcons
          style={{ left: 5 }}
          name="arrow-back-ios"
          size={25}
          color="black"
        />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <View style={styles.Greeting}>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: 25,
            }}
          >
            Emma Phillips
          </Text>
          <TouchableOpacity
            onPress={openBottomSheet}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <MaterialIcons name="edit" size={18} color="black" />
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: text_S,
              }}
            >
              Change Name
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 32,
            fontFamily: "Regular",
            color: "#A0A0A0",
          }}
        >
          {distance} kilometers in {duration} hours
        </Text>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 30,
          }}
        >
          {drawerItems.map((drawerItem) => {
            let pressFun: () => void;
            if (drawerItem.id == 3) {
              pressFun = showMe;
            } else if (drawerItem.id == 4) {
              pressFun = openDeleteModal;
            } else {
              pressFun = () => console.log("Share");
            }
            return (
              <TouchableOpacity
                onPress={() => pressFun()}
                key={drawerItem.id}
                style={{
                  backgroundColor:
                    drawerItem.id === 3 ? Colors.p_color : "transparent",
                  padding: 20,
                  borderRadius: 50,
                }}
              >
                <MaterialIcons
                  //  @ts-ignore
                  name={drawerItem.iconname}
                  size={25}
                  color={
                    drawerItem.iconname !== "delete"
                      ? drawerItem.iconname === "share"
                        ? "black"
                        : "white"
                      : "red"
                  }
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <EditNameModal
        isVisible={isBottomSheetVisible}
        closeModal={closeBottomSheet}
      />
      <DeleteRouteModal isVisible={showdelete} closeModal={closeDeleteModal} />
    </View>
  );
};

export default RouteDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.p_white,
    // paddingTop: Constants.statusBarHeight,
    // paddingHorizontal: 20,
    // justifyContent: "space-between",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    position: "absolute",
    width: "100%",
    height: "30%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    bottom: 0,
  },
  BackContainer: {
    position: "absolute",
    backgroundColor: "white",
    width: wp(11),
    height: wp(11),
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 20,
    // marginHorizontal: 10,
    left: 20,
    top: Constants.statusBarHeight,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  Greeting: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});

// >
//             <View
//               style={{
//                 backgroundColor: "#00AA72",
//                 borderRadius: 50,
//                 padding: 2,
//               }}
//             >
//               <FontAwesome name="dot-circle-o" size={20} color="white" />
//             </View>
//           </Marker>
// >
//             <View
//               style={{
//                 backgroundColor: "#EF3C3C",
//                 borderRadius: 1,
//                 padding: 5,
//               }}
//             >
//               <MaterialIcons name="location-on" size={20} color="white" />
//             </View>
//           </Marker>
