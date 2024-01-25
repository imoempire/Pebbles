import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { text_S } from "../../Constants/Extra";
import { Colors } from "../../Constants/Colors";
import FormInput from "../../Components/Inputs/FormInput";
import { KeyboardAvoiderScrollView } from "@good-react-native/keyboard-avoider";
import LongButton from "../../Components/Buttons/LongButton";
import {
  FORGOT_PASSWORD_SCREEN,
  SIGNUP_SCREEN,
  TERMS_SCREEN,
} from "../../Constants/Screen_Routes";
import useRouter from "../../Hooks/useRouter";
import OAuth from "./Components/OAuth";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useAuthenticator from "../../Hooks/useAuth";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  UserCredential,
  signInWithCredential,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { app } from "../../Configs/firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

const SignIn = () => {
  const { handleNavigator } = useRouter();
  const { loginUser } = useAuthenticator();

  // STATES
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [correctPasswordError, setCorrectPasswordError] = useState<string>("");
  const [correctPassword, setCorrectPassword] = useState<boolean>(false);

  // FORM HANDLERS
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const auth = getAuth(app);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "545644307339-mf1tjjn7sa5k4an8ia23gser7dutlbbn.apps.googleusercontent.com",
    androidClientId:
      "545644307339-cle0eaetqg0ghe8oguhobe43n5i0kbep.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const handleNavigation = (data: FieldValues) => {
    try {
      setIsLoading(true);
      let email = data.email;
      let password = data.password;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setIsLoading(false);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setCorrectPasswordError(errorMessage);
          setCorrectPassword(true);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
    // loginUser("isaac@gmail.com", "ghshs")
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleForgotPasswordNavigation = () => {
    handleNavigator(FORGOT_PASSWORD_SCREEN);
  };

  const handleSignInNavigation = () => {
    handleNavigator(SIGNUP_SCREEN);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.Greeting}>
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: wp(6),
          }}
        >
          Welcome Back
        </Text>
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: text_S,
          }}
        >
          Let's get you into your account
        </Text>
      </View>
      <View style={{ flex: 0.2, justifyContent: "center" }}>
        <OAuth promptAsync={promptAsync} />
      </View>
      <View style={styles.Content}>
        {correctPassword && (
          <Text style={{ color: "red" }}>{correctPasswordError}</Text>
        )}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Your email is required",
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Email Address"
              placeholder="Enter your email"
              onChange={(text: string) => onChange(text)}
              error={errors?.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Your password is required",
          }}
          render={({ field: { onChange, value } }) => (
            <PasswordInput
              label="Password"
              placeholder="Enter password"
              onChange={(text: string) => onChange(text)}
              error={errors?.password?.message}
            />
          )}
        />
        <View>
          <Text
            style={{
              color: Colors.p_black,
              fontSize: 16,
              textAlign: "right",
              fontFamily: "Regular",
            }}
            onPress={handleForgotPasswordNavigation}
          >
            Forgot your password?
          </Text>
        </View>
        <View style={{ gap: 5 }}>
          <LongButton
            loading={isLoading}
            press={handleSubmit(handleNavigation)}
            title="Sign In"
          />
          <Text
            style={{
              color: Colors.p_black,
              fontSize: 18,
              textAlign: "center",
              fontFamily: "Regular",
            }}
          >
            Don't have an account?{" "}
            <Text
              onPress={handleSignInNavigation}
              style={{ color: Colors.p_black, fontFamily: "Bold" }}
            >
              Get Started
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.p_white,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  Greeting: {
    flex: 0.15,
    justifyContent: "center",
  },
  Content: {
    flex: 1,
    // justifyContent: "center",
    top: 20,
    gap: 25,
  },
  Button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});
