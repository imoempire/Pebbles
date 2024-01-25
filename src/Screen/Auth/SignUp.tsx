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
import { SIGNIN_SCREEN, TERMS_SCREEN } from "../../Constants/Screen_Routes";
import useRouter from "../../Hooks/useRouter";
import OAuth from "./Components/OAuth";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import useAuthenticator from "../../Hooks/useAuth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Controller, FieldValues, useForm } from "react-hook-form";
import {
  GoogleAuthProvider,
  UserCredential,
  signInWithCredential,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { app } from "../../Configs/firebaseConfig";
import { FirebaseError } from "firebase/app";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

// import { appAuth } from "../../Configs/firebaseConfig";

// useEffect(() => {
//   const getAllUser = async () => {
//     const users = await getAllUsers();
//     console.log(users, "my usersss");
//   };
//   getAllUser();
// }, []);

const SignUp = () => {
  // HOOKS
  const auth = getAuth(app);
  const { handleNavigator } = useRouter();
  // const { getAllUsers } = useFetcher();
  // const { createUser } = useAuthenticator();

  // STATES
  const [correctPassword, setCorrectPassword] = useState<boolean>(false);
  const [correctPasswordError, setCorrectPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState(null);

  // FORM HANDLERS
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

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

  const handleGoggleSignIn = () => {
    // signInWithPopup(auth, provider)
    //   .then((result: UserCredential) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential?.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //   })
    //   .catch((error: FirebaseError) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error?.customData?.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
  };

  const handleNavigation = (data: FieldValues) => {
    try {
      setIsLoading(true);
      let name = data.name;
      let email = data.email;
      let password = data.password;
      let passwordConfirmation = data.confirmpassword;
      if (password.length <= 5) {
        setCorrectPasswordError("Password must be at least 6 characters");
        setCorrectPassword(true);
        return;
      }
      if (data.password !== data.confirmpassword) {
        setCorrectPasswordError("Password & ConfirmPassword must be same");
        setCorrectPassword(true);
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name,
          }).then((profile) => {
            setIsLoading(false);
          });
        })
        .catch((error) => {
          setIsLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);

          setCorrectPasswordError(errorMessage);
          setCorrectPassword(true);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setCorrectPassword(false);
    }, 3000);
  }, [correctPassword]);

  const handleSignInNavigation = () => {
    handleNavigator(SIGNIN_SCREEN);
  };

  return (
    <KeyboardAwareScrollView
      scrollEnabled={true}
      scrollToOverflowEnabled={true}
      contentContainerStyle={[
        {
          flex: 1,
        },
        styles.container,
      ]}
    >
      <View style={styles.Greeting}>
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: wp(6),
          }}
        >
          Get Started
        </Text>
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: text_S,
          }}
        >
          Let's create you an account
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
          name="name"
          control={control}
          rules={{
            required: "Your full name is required",
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              onChange={(text: string) => onChange(text)}
              label="Name"
              placeholder="Enter you name"
              error={errors?.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: "An email is required",
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
            required: "a new password is required",
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
        <Controller
          name="confirmpassword"
          control={control}
          rules={{
            required: "confirm your password",
          }}
          render={({ field: { onChange, value } }) => (
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm password"
              onChange={(text: string) => onChange(text)}
              error={errors?.confirmpassword?.message}
            />
          )}
        />
        <View style={{ gap: 5 }}>
          <LongButton
            loading={isLoading}
            press={handleSubmit(handleNavigation)}
            title="Get Started"
          />
          <Text
            style={{
              color: Colors.p_black,
              fontSize: 18,
              textAlign: "center",
              fontFamily: "Regular",
            }}
          >
            Already a member?{" "}
            <Text
              onPress={handleSignInNavigation}
              style={{ color: Colors.p_black, fontFamily: "Bold" }}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.p_white,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    // justifyContent: "space-between",
    // height: "200%",
    // paddingBottom: 100,
  },
  Greeting: {
    flex: 0.15,
    justifyContent: "center",
  },
  Content: {
    flex: 1,
    top: 20,
    gap: 20,
    // height: "200%",
  },
  Button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});
