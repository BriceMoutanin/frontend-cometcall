import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update, removeEnfant } from "../reducers/user";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageViewer,
} from "react-native";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useToast } from "react-native-toast-notifications";
import Animated from "react-native-reanimated";
import {
  SlideInLeft,
  FlipInYRight,
  SlideOutRight,
} from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";

export default function ProfilParentScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state.user.value);
  const [updateNom, setupdateNom] = useState(user.nom);
  const [updatePrenom, setupdatePrenom] = useState(user.prenom);
  const [updateTel, setupdateTel] = useState(user.tel);
  //const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const BACKEND_ADDRESS = "https://backend-cometcall.vercel.app";

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const parentUpdate = async () => {
    try {
      let id = toast.show("Enregistrement...", {
        placement: "bottom",
        offsetTop: 100,
      });
      const response = await fetch(
        `${BACKEND_ADDRESS}/users/updateParentByToken/${user.token}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom: updateNom,
            prenom: updatePrenom,
            tel: updateTel,
          }),
        }
      );

      const data = await response.json();
      if (data.result) {
        toast.update(id, "Informations enregistrées", {
          placement: "bottom",
          offsetTop: 100,
          type: "success",
          duration: 1000,
        });
        dispatch(
          update({
            nom: updateNom,
            prenom: updatePrenom,
            tel: updateTel,
          })
        );
      }
    } catch (err) {
      console.log(
        "Erreur lors de la modification des informations du parent: ",
        err
      );
    }
  };

  const deleteEnfant = async (enfant) => {
    try {
      let id = toast.show("Suppression...", {
        placement: "bottom",
        offsetTop: 100,
      });
      const response = await fetch(
        `${BACKEND_ADDRESS}/users/removeEnfant/${user.token}/${enfant._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.result) {
        toast.update(id, "Enfant supprimé", {
          placement: "bottom",
          offsetTop: 100,
          type: "error",
          duration: 1000,
        });
        dispatch(removeEnfant(enfant._id));
      }
    } catch (err) {
      console.log("Erreur lors de la suppression de l'enfant: ", err);
    }
  };

  const modifyEnfant = (enfant) => {
    navigation.navigate("ProfilEnfant", { enfant });
  };

  const data = [
    {
      id: 1,
      name: "Modifier",
      icon: <Feather name="edit" size={24} color="black" />,
      action: modifyEnfant,
    },
    {
      id: 2,
      name: "Supprimer",
      icon: <Feather name="trash-2" size={24} color="red" />,
      action: deleteEnfant,
    },
  ];

  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "gray",
        }}
      />
    );
  };

  const enfantsDisplay = user.enfants.map((enfant, index) => {
    return (
      <Animated.View
        key={index}
        contentContainerStyle={{ flex: 1 }}
        entering={SlideInLeft.delay(250 * index).duration(800)}
        exiting={SlideOutRight}
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={styles.childButton} activeOpacity={0.8}>
          <Image
            style={styles.childImage}
            source={require("../assets/avatar.png")}
          />
          <Text style={styles.textButton}>{enfant.prenom}</Text>
          <Menu
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MenuTrigger
              customStyles={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="more-vertical" size={24} color="black" />
            </MenuTrigger>
            <MenuOptions style={{ padding: 10 }}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                style={{}}
                ItemSeparatorComponent={ItemDivider}
                renderItem={({ item }) => (
                  <MenuOption
                    onSelect={() => item.action(enfant)}
                    customStyles={{
                      optionWrapper: {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      },
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>{item.name}</Text>
                    <Text>{item.icon}</Text>
                  </MenuOption>
                )}
              />
            </MenuOptions>
          </Menu>
        </TouchableOpacity>
      </Animated.View>
    );
  });

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/Open-Sans.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const imageSource =
    image !== null ? { uri: image } : require("../assets/avatar.png");

  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
        }}
      >
        <View style={styles.parent}>
          <Text style={styles.title}>Profil Parent</Text>
          <View style={styles.ParentContainer}>
            <View style={styles.photoContainer}>
              <Image style={styles.image} source={imageSource} />
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
                onChangeText={(value) => setupdateNom(value)}
                value={updateNom}
              />
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Prénom"
                selectionColor="#1A7B93"
                outlineColor="#1A7B93"
                activeOutlineColor="#1A7B93"
                onChangeText={(value) => setupdatePrenom(value)}
                value={updatePrenom}
              />
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Téléphone"
                selectionColor="#1A7B93"
                outlineColor="#1A7B93"
                activeOutlineColor="#1A7B93"
                onChangeText={(value) => setupdateTel(value)}
                value={updateTel}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.registerButton}
            activeOpacity={0.8}
            onPress={() => pickImageAsync()}
          >
            <Text style={styles.textButton}>Enregistrer</Text>
            <Ionicons
              name="ios-save-sharp"
              size={24}
              color="#144172"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.enfant}>
          <Text style={styles.title}>Enfants</Text>
          <View style={styles.enfantView}>
            <View style={styles.enfantContainer}>{enfantsDisplay}</View>
            <View style={styles.registerInput}>
              <TouchableOpacity
                style={styles.addButton}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("ProfilEnfant", { enfant: null })
                }
              >
                <Ionicons
                  name="add-circle"
                  size={24}
                  color="#144172"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.textButton}>Ajouter un enfant</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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

  parent: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  enfant: {
    flex: 1,
    height: "100%",
    width: "100%",
  },

  enfantView: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },

  ParentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "relative",
  },

  title: {
    height: 40,
    color: "white",
    backgroundColor: "rgb(26,123,147)",
    textAlign: "center",
    padding: 10,
    fontFamily: "OpenSans",
    fontSize: 18,
    width: "100%",
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
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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
    padding: 20,
    width: "100%",
  },

  registerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "60%",
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
    marginBottom: 20,
  },

  textButton: {
    fontSize: 20,
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
