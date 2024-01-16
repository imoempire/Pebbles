import { useNavigation } from "@react-navigation/native";
import { HOME_SCREEN } from "../Constants/Screen_Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function useRouter() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNavigator = (name: string | any, param?: any) => {
    navigation.navigate(name, param);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const goHome = () => {
    navigation.navigate(HOME_SCREEN);
  };

  return {
    goBack,
    handleNavigator,
    goHome,
  };
}
