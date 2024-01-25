import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../../Constants/Colors";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { blurhash, text_S } from "../../Constants/Extra";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LongButton from "../../Components/Buttons/LongButton";
import useRouter from "../../Hooks/useRouter";
import { SIGNUP_SCREEN } from "../../Constants/Screen_Routes";
import { useDispatch, useSelector } from "react-redux";
import { addUser, changeUser, unChangeUser } from "../../State/Slices/user";
const { width, height } = Dimensions.get("window");
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
import { app } from "../../Configs/firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const Onboading = () => {
  const { handleNavigator } = useRouter();
  const dispatch = useDispatch();
  const handleNavigattion = () => {
    handleNavigator(SIGNUP_SCREEN);
  };

  // useEffect(() => {
  //   dispatch(unChangeUser());
  // }, []);

  const { newUser, profile } = useSelector((state: any) => state.user);
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
      signInWithCredential(auth, credential).then((user: any) => {
        let data = user?._tokenResponse;
        let profile = {
          displayName: data?.displayName,
          email: data?.email,
          fullName: data?.fullName,
        };
        dispatch(addUser(profile));
      });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <View style={styles.Greeting}>
        <View
          style={{ flex: 0.7, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/logo.png")}
            placeholder={blurhash}
            contentFit="contain"
            // transition={1000}
          />
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: wp(15),
              textAlign: "center",
            }}
          >
            Pebbles
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            width: width,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../../assets/onboarding/Login.png")}
            style={{ height: "100%", width: "100%", resizeMode: "contain" }}
          />
        </View>
      </View>
      <SafeAreaView style={styles.Button}>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor: "white",
              flexDirection: "row",
              gap: 10,
              borderColor: "#E0E0E0",
              borderRadius: 40,
              borderWidth: 2,
            },
          ]}
          onPress={() => promptAsync()}
        >
          <Image
            style={{ width: "10%", height: "50%" }}
            source={require("../../../assets/onboarding/gg.png")}
          />
          <Text
            style={{
              fontFamily: "Bold",
              color: Colors.p_color,
              fontSize: 18,
            }}
          >
            Get started with Google
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Onboading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.p_white,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  Greeting: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  image: {
    flex: 0.7,
    width: wp(35),
  },
  Button: {
    flex: 0.7,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  btn: {
    // flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.p_color,
    justifyContent: "center",
    alignItems: "center",
  },
});
