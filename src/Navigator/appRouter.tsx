import React from "react";
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
} from "../Constants/Screen_Routes";
import Home from "../Screen/Home/Home";
import SignUp from "../Screen/Auth/SignUp";
import SignIn from "../Screen/Auth/SignIn";
import ForgetPassword from "../Screen/Auth/ForgetPassword";
import Terms from "../Screen/Auth/SubScreens/Terms";

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
      <RootStack.Screen options={screenOption} name={TERMS_SCREEN} component={Terms} />
    </RootStack.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        options={screenOption}
        name={HOME_SCREEN}
        component={Home}
      />
    </RootStack.Navigator>
  );
};

const AppNavigatorContainer = () => {
  const loggedIn = true;
  return (
    <NavigationContainer>
      {loggedIn ? <AuthNavigation /> : <AppNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigatorContainer;
