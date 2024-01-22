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

const RootStack = createNativeStackNavigator<RootStackParamList>();

let screenOption: object = {
  headerShown: false,
  gestureDirection: "horizontal",
  animation: "slide_from_right",
};

const AuthNavigation = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        options={screenOption}
        name={ONBOARD_SCREEN}
        component={Onboading}
      />
      <RootStack.Screen
        options={screenOption}
        name={SIGNIN_SCREEN}
        component={SignIn}
      />
      <RootStack.Screen
        options={screenOption}
        name={SIGNUP_SCREEN}
        component={SignUp}
      />
      <RootStack.Screen
        options={screenOption}
        name={FORGOT_PASSWORD_SCREEN}
        component={ForgetPassword}
      />
      <RootStack.Screen
        options={screenOption}
        name={TERMS_SCREEN}
        component={Terms}
      />
    </RootStack.Navigator>
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
  const { getUserLoggedInStatus } = useFetcher();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user } = (await getUserLoggedInStatus("imouser")) as {
          user: { loggedIn: number | any };
        };
        console.log(user, "usessßrss");

        // Update the loggedIn state based on the fetched data
        if (user === null) {
          setLoggedIn(false);
        }
        setLoggedIn(user?.loggedIn === 1 ? true : false);
      } catch (error) {
        console.error("Error fetching user loggedIn status:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <NavigationContainer>
      {!loggedIn ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigatorContainer;
