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
      <View style={styles.question}>
        <Text style={styles.title}>
          Pour qui souhaitez-vous prendre contact?
        </Text>
      </View>

      <ScrollView style={styles.scroll}>
        <View>
          {user.enfants.map((enfant, index) => (
            <TouchableOpacity
              key={index}
              style={styles.childButton}
              activeOpacity={0.8}
              onPress={() => {
                const selectedEnfant = enfant;
                navigation.navigate("Problematique", {
                  navigation,
                  selectedEnfant,
                });
              }}
            >
              <Image
                style={styles.childImage}
                source={require("../assets/avatar.png")}
              />
              <Text style={styles.textButton}>{enfant.prenom}</Text>
              <Feather name="more-vertical" size={24} color="black" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    margin: 20,
  },

  childImage: {
    height: 60,
    width: 60,
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
  textButton: {
    fontSize: 20,
    paddingLeft: 40,
    fontFamily: "OpenSans",
  },
});
