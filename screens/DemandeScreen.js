import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";
import Animated from "react-native-reanimated";
import { SlideInLeft, FlipInYRight } from "react-native-reanimated";

const AnimatedViewPager = Animated.createAnimatedComponent(View);

export default function DemandeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  console.log(user);

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/Open-Sans.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.h5}>Pour qui souhaitez-vous prendre contact ?</Text>
      </View>
      <View style={styles.enfantsContainer}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            {user.enfants.map((enfant, index) => (
              <AnimatedViewPager
                key={index}
                entering={SlideInLeft.delay(250 * index).duration(800)}
                style={{ width: "100%" }}
              >
                <TouchableOpacity
                  style={styles.childButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("Problematique", {
                      enfant,
                    });
                  }}
                >
                  <Image
                    style={styles.childImage}
                    source={
                      enfant.photoURI
                        ? { uri: enfant.photoURI }
                        : require("../assets/avatar.png")
                    }
                  />
                  <Text style={styles.textButton}>{enfant.prenom}</Text>
                </TouchableOpacity>
              </AnimatedViewPager>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "white",
  },

  question: {
    height: "20%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
  },
  childContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: 310,
    backgroundColor: "white",
    height: "80%",
    width: "100%",
  },

  title: {
    height: 40,
    color: "black",
    textAlign: "center",
    padding: 10,
    fontFamily: "OpenSans",
    fontSize: 18,
  },

  childButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#F0F0F0",
    padding: 10,
    width: "80%",
    borderRadius: 10,
    marginBottom: 20,
  },

  childImage: {
    width: 50,
    height: 50,
    borderRadius: 75,
    borderRadius: 75,
    borderRadius: 75,
  },
  textButton: {
    fontSize: 20,
    paddingLeft: 40,
    fontFamily: "OpenSans",
  },

  scroll: {
    width: "100%",
    height: "100%",
  },
  enfantsContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontSize: 20,
    paddingLeft: 40,
    fontFamily: "OpenSans",
  },
  card: {
    backgroundColor: "#144272",
    borderRadius: 12,
    width: "90%",
    padding: 15,
    paddingBottom: 0,
    paddingTop: 5,
    marginBottom: 50,
    marginTop: 50,
  },
  h5: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
});
