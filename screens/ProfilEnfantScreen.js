import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";

export default function ProfilEnfantScreen({ navigation }) {
  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/Open-Sans.ttf"),
  });

  if (!loaded) {
    return null;
  }
  const handleValide = () => {
    navigation.navigate("ProfilParent");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profilEnfant}>
        <Text style={styles.h6}>Profil Enfant</Text>
      </View>
      <View style={styles.photoContainer}>
        <Image style={styles.image} source={require("../assets/avatar.png")} />
        <Ionicons name="add-circle" size={24} color="#144172" />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Prénom de l'enfant"
          selectionColor="#1A7B93"
          outlineColor="#1A7B93"
          activeOutlineColor="#1A7B93"
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Ecole de l'enfant"
          selectionColor="#1A7B93"
          outlineColor="#1A7B93"
          activeOutlineColor="#1A7B93"
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Classe de l'enfant"
          selectionColor="#1A7B93"
          outlineColor="#1A7B93"
          activeOutlineColor="#1A7B93"
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.valideButton} activeOpacity={0.8}>
          <Text style={styles.textButton} onPress={() => handleValide()}>
            Valider
          </Text>
          <AntDesign name="arrowright" size={24} color="black" />
        </TouchableOpacity>
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
    height: "100%",
  },

  profilEnfant: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "white",
    width: "100%",
    height: "10%",
  },

  photoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "relative",
    backgroundColor: "white",
    width: "100%",
    height: "30%",
  },

  inputContainer: {
    alignItems: "center",
    position: "relative",
    backgroundColor: "white",
    width: "100%",
    height: "50%",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "white",
    width: "100%",
    height: "10%",
  },

  h6: {
    fontSize: 20,
    fontFamily: "OpenSans",
    // fontWeight: "bold",
  },

  image: {
    height: 150,
    width: 160,
  },

  input: {
    width: 200,
    margin: 12,
    margin: 7,
    fontFamily: "OpenSans",
  },
  valideButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: 350,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 30,
    shadowRadius: 2,
  },
  textButton: {
    fontSize: 20,
    paddingLeft: 40,
    fontFamily: "OpenSans",
    paddingRight: 100,
    paddingLeft: 120,
  },
});
