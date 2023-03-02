import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../reducers/user";
import { StyleSheet, View, Image, SafeAreaView, Text, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";



  
export default function ProfilParentScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [updateNom, setupdateNom] = useState(user.nom);
  const [updatePrenom, setupdatePrenom] = useState(user.prenom);
  const [updateTel, setupdateTel] = useState(user.tel);
  
  const BACKEND_ADDRESS = "https://backend-cometcall.vercel.app";
  

  const parentUpdate = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/users/updateParentByToken/${user.token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: updateNom,
          prenom: updatePrenom,
          tel:updateTel,
        }),
      });

      const data = await response.json();
      if (data.result) {
        dispatch(
          update({
            nom:updateNom,
            prenom:updatePrenom,
            tel: updateTel,
          }
          )
        );
  
        navigation.navigate("DrawerNavigator");
        }
      }
     catch (err) {
      console.log("Erreur lors de la modification des informations du parent: ", err);
    }
  };



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
    navigation.navigate("DemandeStack");
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
                onChangeText={(value)=>setupdateNom(value)}
                value={updateNom}
              />
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Prénom"
                selectionColor="#1A7B93"
                outlineColor="#1A7B93"
                activeOutlineColor="#1A7B93"
                onChangeText={(value)=>setupdatePrenom(value)}
                value={updatePrenom}
              />
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Téléphone"
                selectionColor="#1A7B93"
                outlineColor="#1A7B93"
                activeOutlineColor="#1A7B93"
                onChangeText={(value)=>setupdateTel(value)}
                value={updateTel}
              />
            </View>
          </View>
        </View>
        <View style={styles.enfant}>
          <Text style={styles.title}>Enfants</Text>
          <View style={styles.enfantView}>
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
                  onPress={() => parentUpdate()}
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
