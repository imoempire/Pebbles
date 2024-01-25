import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Colors } from "../../../Constants/Colors";
import { slides } from "../../../../utils/slides";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { addUser, changeUser } from "../../../State/Slices/user";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
const { width, height } = Dimensions.get("window");
import {
  GoogleAuthProvider,
  signInWithCredential,
  getAuth,
} from "firebase/auth";
import { app } from "../../../Configs/firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";
import { doc, setDoc, getFirestore } from "firebase/firestore";
// import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

interface slideItem {
  image: any;
  title: string;
  subtitle: string;
}

const Slide = ({ item }: { item: slideItem }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        width,
      }}
    >
      <Text style={{ fontSize: 50, color: Colors.p_color, fontFamily: "Bold" }}>
        Pebbles
      </Text>
      <View
        style={{
          flex: 1,
          width: width - 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={item?.image}
          style={{ height: "90%", width: "100%", resizeMode: "contain" }}
        />
      </View>
      <View style={{ flex: 0.4 }}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({ navigation }: { navigation: any }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = useRef<any>();
  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const auth = getAuth(app);
  const db = getFirestore(app);
  const dispatch = useDispatch();

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
      signInWithCredential(auth, credential).then(async (user: any) => {
        let data = user?._tokenResponse;
        let sessionId = Date.now();
        let profile = {
          displayName: data?.displayName,
          email: data?.email,
          fullName: data?.fullName,
          signUpDate: sessionId,
        };
        if (data) {
          await setDoc(doc(db, "users", data?.localId), {
            displayName: data?.displayName,
            email: data?.email,
            fullName: data?.fullName,
            signUpDate: sessionId,
          })
            .then(async () => {
              console.log("Google Account");
              dispatch(addUser(profile));
              dispatch(changeUser());
              await AsyncStorage.setItem("isAppFirstLaunched", "false");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
  }, [response]);

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.2,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        {/* Indicator container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: Colors.p_color,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{ height: 50 }}>
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
                  source={require("../../../../assets/onboarding/gg.png")}
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
            </View>
          ) : (
            <View style={{ flexDirection: "column" }}>
              {/* <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: "#ffffff",
                    borderWidth: 1,
                    backgroundColor: "transparent",
                  },
                ]}
                onPress={skip}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "#ffffff",
                  }}
                >
                  SKIP
                </Text>
              </TouchableOpacity> */}
              {/* <View style={{ width: 15 }} /> */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={[
                  styles.btn,
                  { flexDirection: "row", gap: 5, borderRadius: 40 },
                ]}
              >
                <Text
                  style={{
                    fontFamily: "Medium",
                    fontSize: 15,
                    color: "white",
                  }}
                >
                  NEXT
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* <StatusBar backgroundColor={Colors.p_color} /> */}
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: Colors.p_color,
    fontSize: 13,
    marginTop: 10,
    maxWidth: "70%",
    textAlign: "center",
    lineHeight: 23,
  },
  title: {
    color: Colors.p_color,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    height: 4,
    width: 10,
    backgroundColor: "gray",
    marginHorizontal: 3,
    borderRadius: 2,
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
export default OnboardingScreen;
