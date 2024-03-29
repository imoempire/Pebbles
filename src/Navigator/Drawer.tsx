import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import Home from "../Screen/Home/Home";
import { HOME_SCREEN, SHARED_ROUTES } from "../Constants/Screen_Routes";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Feather, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { text_S } from "../Constants/Extra";
import useAuthenticator from "../Hooks/useAuth";
import useRouter from "../Hooks/useRouter";
import EditNameModal from "../Components/Modal/EditName";
import { useState } from "react";

const Drawer = createDrawerNavigator();

const drawerItems: {
  id: number;
  name: string;
  navigationRoute: string;
  iconname: string;
}[] = [
  {
    id: 2,
    name: "Shared Routes",
    navigationRoute: SHARED_ROUTES,
    iconname: "share",
  },
  {
    id: 3,
    name: "Feedback",
    navigationRoute: "",
    iconname: "access-time",
  },
  {
    id: 4,
    name: "Tell a friend",
    navigationRoute: "",
    iconname: "phone-iphone",
  },
  {
    id: 1,
    name: "Rate App",
    navigationRoute: "",
    iconname: "thumb-up",
  },
];

function CustomDrawerContent(props: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const openBottomSheet = () => setBottomSheetVisible(true);
  const closeBottomSheet = () => setBottomSheetVisible(false);

  const width = useWindowDimensions().width * 0.3;
  const { logoutUser } = useAuthenticator();
  const { handleNavigator } = useRouter();

  const handleNavigation = (route: string) => {
    handleNavigator(route);
  };

  const handleLogout = () => {
    logoutUser("imouser").then((res) => {
      console.log(res);
    });
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.HeadContainer}>
        <View style={[styles.headItemsCard]}>
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color="black"
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        </View>

        <View style={[styles.headItemsCard]}>
          <MaterialIcons
            name="power-settings-new"
            size={30}
            color="#CF6969"
            onPress={() => {
              handleLogout();
            }}
          />
        </View>
      </View>

      <View>
        <View style={styles.Greeting}>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: wp(10),
            }}
          >
            Emma Phillips
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => openBottomSheet()}
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
      </View>

      <View>
        <View style={styles.MyRoutes}>
          <View style={styles.MyRoutesCard}>
            <Text
              style={{
                fontFamily: "Medium",
                fontSize: wp(5),
              }}
            >
              1,055
            </Text>
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: wp(3),
                color: "#A0A0A0",
              }}
            >
              Routes
            </Text>
          </View>
          <View style={styles.MyRoutesCard}>
            <Text
              style={{
                fontFamily: "Medium",
                fontSize: wp(5),
              }}
            >
              20 Nov 2023
            </Text>
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: wp(3),
                color: "#A0A0A0",
              }}
            >
              Joined
            </Text>
          </View>
        </View>
      </View>

      <View style={{ gap: 30, paddingHorizontal: 20, top: 30 }}>
        {drawerItems.map((drawerItem) => (
          <TouchableOpacity
            onPress={() => handleNavigation(drawerItem.navigationRoute)}
            key={drawerItem.id}
            style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
          >
            {/* @ts-ignore */}
            <MaterialIcons name={drawerItem.iconname} size={24} color="black" />
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: wp(5),
              }}
            >
              {drawerItem.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <EditNameModal isVisible={isBottomSheetVisible} closeModal={closeBottomSheet} />
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: Dimensions.get("window").width,
        },
      }}
    >
      <Drawer.Screen name={HOME_SCREEN} component={Home} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  HeadContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headItemsCard: {
    // flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    // borderRadius: 10,
    // backgroundColor: "red",
  },
  Greeting: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: hp(20),
  },
  MyRoutes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  MyRoutesCard: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    height: hp(11),
  },
});
