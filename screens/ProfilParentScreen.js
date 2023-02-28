import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { TextInput } from "react-native-paper";

export default function ProfilParentScreen({ navigation }) {
  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/Open-Sans.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const handleAdd = () => {
    navigation.navigate("ProfilEnfant");
  };
  const handleRegister = () => {
    navigation.navigate("Demande");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.parent}>
          <Text style={styles.title}>Profil Parents</Text>
          <View style={styles.ParentContainer}>
            <View style={styles.photoContainer}>
              <Image
                style={styles.image}
                source={require("../assets/avatar.png")}
              />
              <Ionicons name="add-circle" size={24} color="#144172" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Nom"
                selectionColor="#1A7B93"
                outlineColor="#1A7B93"
                activeOutlineColor="#1A7B93"
              />
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Prénom"
                selectionColor="#1A7B93"
                outlineColor="#1A7B93"
                activeOutlineColor="#1A7B93"
              />
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Téléphone"
                selectionColor="#1A7B93"
                outlineColor="#1A7B93"
                activeOutlineColor="#1A7B93"
              />
            </View>
          </View>
        </View>
        <View style={styles.enfant}>
          <Text style={styles.title}>Enfants</Text>
          <View style={styles.enfantView}>
            {/* <ScrollView style={styles.scroll}> */}
            <View style={styles.enfantContainer}>
              <View>
                <TouchableOpacity
                  style={styles.childButton}
                  activeOpacity={0.8}
                >
                  <Image
                    style={styles.childImage}
                    source={require("../assets/avatar.png")}
                  />
                  <Text style={styles.textButton}>childName</Text>
                  <Feather name="more-vertical" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.childButton}
                  activeOpacity={0.8}
                >
                  <Image
                    style={styles.childImage}
                    source={require("../assets/avatar.png")}
                  />
                  <Text style={styles.textButton}>childName</Text>
                  <Feather name="more-vertical" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.childButton}
                  activeOpacity={0.8}
                >
                  <Image
                    style={styles.childImage}
                    source={require("../assets/avatar.png")}
                  />
                  <Text style={styles.textButton}>childName</Text>
                  <Feather name="more-vertical" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.childButton}
                  activeOpacity={0.8}
                >
                  <Image
                    style={styles.childImage}
                    source={require("../assets/avatar.png")}
                  />
                  <Text style={styles.textButton}>childName</Text>
                  <Feather name="more-vertical" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.childButton}
                  activeOpacity={0.8}
                >
                  <Image
                    style={styles.childImage}
                    source={require("../assets/avatar.png")}
                  />
                  <Text style={styles.textButton}>childName</Text>
                  <Feather name="more-vertical" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.childButton}
                  activeOpacity={0.8}
                >
                  <Image
                    style={styles.childImage}
                    source={require("../assets/avatar.png")}
                  />
                  <Text style={styles.textButton}>childName</Text>
                  <Feather name="more-vertical" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            {/* </ScrollView> */}

            <View style={styles.registerInput}>
              <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
                <Ionicons name="add-circle" size={24} color="#144172" />
                <Text style={styles.textButton} onPress={() => handleAdd()}>
                  Ajouter un enfant
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.registerButton}
                activeOpacity={0.8}
              >
                <Text
                  style={styles.textButton}
                  onPress={() => handleRegister()}
                >
                  Enregistrer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
    backgroundColor: "#FFFFF",
  },

  parent: {
    width: "100%",
  },

  enfant: {
    height: "60%",
    width: "100%",
    // backgroundColor: "white",
  },

  enfantView: {
    height: "90%",
  },

  ParentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "relative",
    backgroundColor: "white",
  },

  title: {
    height: 40,
    color: "white",
    backgroundColor: "rgb(26,123,147)",
    textAlign: "center",
    padding: 10,
    fontFamily: "OpenSans",
    fontSize: 18,
  },

  photoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  image: {
    height: 90,
    width: 100,
  },

  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: 20,
  },

  input: {
    width: 200,
    margin: 12,
    margin: 7,
    fontFamily: "OpenSans",
  },

  enfantContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: 350,
    fontFamily: "OpenSans",
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

  registerInput: {
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "OpenSans",
    backgroundColor: "white",
    padding: 20,
    marginBottom: 20,
    height: 150,
    width: "100%",
  },

  registerButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
    width: 350,
    borderRadius: 10,
    backgroundColor: "white",
    fontFamily: "OpenSans",
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
  },

  childButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#F0F0F0",
    padding: 15,
    width: 300,
    borderRadius: 10,
    fontFamily: "OpenSans",
    margin: 10,
  },

  childImage: {
    height: 40,
    width: 40,
  },
});
