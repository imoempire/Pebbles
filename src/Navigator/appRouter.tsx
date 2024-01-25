import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboading from "../Screen/Auth/Onboading";
import {
  ONBOARD_SCREEN,
  FORGOT_PASSWORD_SCREEN,
  SIGNIN_SCREEN,
  SIGNUP_SCREEN,
  HOME_SCREEN,
  TERMS_SCREEN,
  MAIN_APP,
  SEARCH_ROUTE,
  ROUTE_DETAIL,
  SHARED_ROUTES,
  NEW_ONBOARD_SCREEN,
} from "../Constants/Screen_Routes";
import Home from "../Screen/Home/Home";
import SignUp from "../Screen/Auth/SignUp";
import SignIn from "../Screen/Auth/SignIn";
import ForgetPassword from "../Screen/Auth/ForgetPassword";
import Terms from "../Screen/Auth/SubScreens/Terms";
import useFetcher from "../Hooks/useFetcher";
import MyDrawer from "./Drawer";
import SearchRoutes from "../Components/Modal/SearchRoutes";
import RouteDetails from "../Screen/Home/Routes/RouteDetails";
import SharedRoutes from "../Screen/Home/Routes/SharedRoutes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Text, View } from "react-native";
import OnboardingScreen from "../Screen/Auth/Onboarding/Onboard";
import { useSelector } from "react-redux";

const RootStack = createNativeStackNavigator<RootStackParamList>();

let screenOption: object = {
  headerShown: false,
  gestureDirection: "horizontal",
  animation: "slide_from_right",
};

const AuthNavigation2 = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        options={screenOption}
        name={NEW_ONBOARD_SCREEN}
        component={OnboardingScreen}
      />
    </RootStack.Navigator>
  );
};

const AuthNavigation = () => {
  const { newUser, profile } = useSelector((state: any) => state.user);

  return (
    <>
      {newUser ? (
        <AuthNavigation2 />
      ) : (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen
            options={screenOption}
            name={ONBOARD_SCREEN}
            component={Onboading}
          />
          {/* <RootStack.Screen
            options={screenOption}
            name={SIGNIN_SCREEN}
            component={SignIn}
          /> */}
          {/* <RootStack.Screen
            options={screenOption}
            name={SIGNUP_SCREEN}
            component={SignUp}
          /> */}
          {/* <RootStack.Screen
            options={screenOption}
            name={FORGOT_PASSWORD_SCREEN}
            component={ForgetPassword}
          />
          <RootStack.Screen
            options={screenOption}
            name={TERMS_SCREEN}
            component={Terms}
          /> */}
        </RootStack.Navigator>
      )}
    </>
  );
};

const AppNavigation = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        options={screenOption}
        name={MAIN_APP}
        component={MyDrawer}
      />
      <RootStack.Screen
        options={screenOption}
        name={ROUTE_DETAIL}
        component={RouteDetails}
      />
      <RootStack.Screen
        options={screenOption}
        name={SHARED_ROUTES}
        component={SharedRoutes}
      />
      <RootStack.Group screenOptions={{ presentation: "fullScreenModal" }}>
        <RootStack.Screen
          options={{
            headerShown: false,
            animationTypeForReplace: "push",
            gestureDirection: "vertical",
            animation: "slide_from_bottom",
          }}
          name={SEARCH_ROUTE}
          component={SearchRoutes}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

const AppNavigatorContainer = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const checkAuth = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      if (userData) {
        setLoggedIn(true);
      }
    } catch (error) {
      // @ts-ignore
      alert(error?.message);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        return setLoggedIn(true);
      } else {
        setLoggedIn(false);
        await AsyncStorage.setItem("@user", "");
      }
    });
    return () => unsub();
  }, [user]);

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
        <Text>Loading....</Text>
      </View>
    );

  return (
    <NavigationContainer>
      {loggedIn ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigatorContainer;
