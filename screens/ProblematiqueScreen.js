import {
  StyleSheet,
  View,
  SafeAreaView,
  AutocompleteDropdown,
  Text,
  Image,
  Button,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useFonts } from "expo-font";

export default function ProblematiqueScreen({ navigation, enfant }) {
  const problematiques = ["Harcelement", "Cantine", "Travaux", "Vol", "Greve"];
  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/Open-Sans.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.text}>
          Quel est l'objet de votre demande pour childName ?
        </Text>
      </View>
      <View style={styles.probleme}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="problematique"
          selectionColor="#144272"
          outlineColor="#144272"
          activeOutlineColor="#144272"
        />
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
    width: "100%",
    backgroundColor: "white",
  },
  question: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    backgroundColor: "white",
    height: "20%",
  },

  probleme: {
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    width: "100%",
    backgroundColor: "white",
    height: "80%",
    valideButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      width: 350,
      borderRadius: 30,
      backgroundColor: "white",
      shadowColor: "gray",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 30,
      shadowRadius: 2,
    },
  },
  input: {
    width: "80%",
    marginTop: 15,
    valideButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      width: 350,
      borderRadius: 20,
      backgroundColor: "white",
      shadowColor: "gray",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 30,
      shadowRadius: 2,
    },
  },
  text: {
    fontFamily: "OpenSans",
    fontSize: "16px",
  },
});
