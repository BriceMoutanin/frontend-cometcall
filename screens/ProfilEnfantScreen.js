import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageViewer,
} from "react-native";
import { TextInput } from "react-native-paper";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useToast } from "react-native-toast-notifications";

import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
//icons+ font
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
//react
import { useState, useRef, useCallback } from "react";
//reducer
import { useSelector, useDispatch } from "react-redux";
import {
  addEnfant,
  updatePrenomEnfant,
  updateEtablissementEnfant,
  updatePhotoEnfant,
} from "../reducers/user";
// expo
import * as ImagePicker from "expo-image-picker";

export default function ProfilEnfantScreen({ route, navigation }) {
  const { enfant } = route.params;
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [etablissements, setEtablissements] = useState([]);
  const [updatePrenom, setUpdatePrenom] = useState(enfant ? enfant.prenom : "");
  const [updateEtablissement, setUpdateEtablissement] = useState(
    enfant ? enfant.etablissement : null
  );
  const [updatePhoto, setUpdatePhoto] = useState(
    enfant ? enfant.photoURI : null
  );
  const BACKEND_ADDRESS = "https://backend-cometcall.vercel.app";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const dropdownController = useRef(null);

  const searchRef = useRef(null);

  //choisir une image du télèphone avec demande de permission
  const pickImageEnfantAsync = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(permission);
    if (permission.status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
      // s'il y a bien une image alors on l'enregistre en BDD dans enfant
      if (!result.canceled) {
        if (enfant) {
          fetch(
            `${BACKEND_ADDRESS}/users/updatePhotoEnfant/${user.token}/${enfant._id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                photoURI: result.assets[0].uri,
              }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.result) {
                setUpdatePhoto(result.assets[0].uri);
                dispatch(
                  updatePhotoEnfant({
                    _id: enfant._id,
                    photoURI: result.assets[0].uri,
                  })
                );
              } else {
                alert("Erreur lors de l'enregistrement de la photo");
              }
            });
        } else {
          setUpdatePhoto(result.assets[0].uri);
        }
      } else {
        alert("You did not select any image.");
      }
    }
  };
  // prendre une photo avec son telephone, en demander la permission d'acceder a la camera du telephone
  const shootImageEnfantAsync = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    console.log(permission);
    if (permission.status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });
      //s'il y a bien une photo on l'enregistre dans la BDD enfant
      if (!result.canceled) {
        if (enfant) {
          fetch(
            `${BACKEND_ADDRESS}/users/updatePhotoEnfant/${user.token}/${enfant._id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                photoURI: result.assets[0].uri,
              }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.result) {
                setUpdatePhoto(result.assets[0].uri);
                dispatch(
                  updatePhotoEnfant({
                    _id: enfant._id,
                    photoURI: result.assets[0].uri,
                  })
                );
              } else {
                alert("Erreur lors de l'enregistrement de la photo");
              }
            });
        } else {
          setUpdatePhoto(result.assets[0].uri);
        }
      } else {
        alert("You did not shoot any photo.");
      }
    }
  };
  // suprimer  ou modifie une photo de l'appli et de la BDD
  const deleteImageEnfantAsync = async () => {
    if (enfant) {
      fetch(
        `${BACKEND_ADDRESS}/users/updatePhotoEnfant/${user.token}/${enfant._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            photoURI: null,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setUpdatePhoto(null);
            dispatch(updatePhotoEnfant({ _id: enfant._id, photoURI: null }));
          } else {
            alert("Erreur lors de l'enregistrement de la photo");
          }
        });
    } else {
      setUpdatePhoto(null);
    }
  };

  // popup de la photo enfant
  const dataPhotoEnfant = [
    {
      id: 1,
      name: "Choisir une photo",
      icon: <Feather name="image" size={24} color="black" />,
      action: pickImageEnfantAsync,
    },
    {
      id: 2,
      name: "Prendre une photo",
      icon: <Feather name="camera" size={24} color="red" />,
      action: shootImageEnfantAsync,
    },
    {
      id: 3,
      name: "Supprimer la photo",
      icon: <Feather name="trash-2" size={24} color="red" />,
      action: deleteImageEnfantAsync,
    },
  ];

  //recherche de l'etablissement de l'enfant + enregistrement
  const getSuggestions = useCallback(async (q) => {
    const filterToken = q.toLowerCase();
    console.log("getSuggestions", q);
    if (typeof q !== "string" || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    const response = await fetch(
      `https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-annuaire-education&q=${q}&sort=code_postal`
    );
    const data = await response.json();
    const items = data.records;
    if (
      data !== null &&
      data !== undefined &&
      items !== null &&
      items !== undefined &&
      items.length !== 0
    ) {
      const suggestions = items.map((item, i) => ({
        id: item.recordid,
        title:
          item.fields.nom_etablissement + " (" + item.fields.nom_commune + ")",
        etablissement: {
          type: item.fields.type_etablissement,
          nom: item.fields.nom_etablissement,
          IDAPI: item.fields.identifiant_de_l_etablissement,
        },
      }));
      setSuggestionsList(suggestions);
    }
    setLoading(false);
  }, []);
  ``;
  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/Open-Sans.ttf"),
  });

  // modifier le prenom de l'enfant dans bdd par l'id
  const modifyPrenomEnfant = () => {
    console.log(enfant);
    let id = toast.show("Enregistrement prénom...", {
      placement: "bottom",
      offsetTop: 100,
    });
    fetch(
      `${BACKEND_ADDRESS}/users/updatePrenomEnfant/${user.token}/${enfant._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: updatePrenom,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            updatePrenomEnfant({
              _id: enfant._id,
              prenom: updatePrenom,
            })
          );
          toast.update(id, "Prénom enregistré", {
            placement: "bottom",
            offsetTop: 100,
            type: "success",
            duration: 1000,
          });
        }
      });
  };

  //modifier l'ecole de l'enfant par l'id de l'enfant
  const modifyEtablissementEnfant = () => {
    let id = toast.show("Enregistrement établissement...", {
      placement: "bottom",
      offsetTop: 100,
    });
    fetch(
      `${BACKEND_ADDRESS}/users/updateEtablissementEnfant/${user.token}/${enfant._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          etablissement: updateEtablissement,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            updateEtablissementEnfant({
              _id: enfant._id,
              etablissement: updateEtablissement,
            })
          );
          toast.update(id, "Etablissement enregistré", {
            placement: "bottom",
            offsetTop: 100,
            type: "success",
            duration: 1000,
          });
        }
      });
  };

  // au click sur validé ajoute et enregistre le prenom la photo et l'etablissement
  const handleValide = async () => {
    let id = toast.show("Ajout de l'enfant...", {
      placement: "bottom",
      offsetTop: 100,
      duration: 1000,
    });
    fetch(`${BACKEND_ADDRESS}/users/addEnfant/${user.token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prenom: updatePrenom,
        etablissement: updateEtablissement,
        photoURI: updatePhoto,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          toast.update(id, "Enfant ajouté", {
            placement: "bottom",
            offsetTop: 100,
            type: "success",
            duration: 1000,
          });
          dispatch(addEnfant(data.newEnfant));
          navigation.navigate("ProfilParent");
        }
      });
  };

  if (!loaded) {
    return null;
  }

  // constante qui contient soit la photo de l'enfant soit l'avatar
  const imageSource =
    updatePhoto !== null
      ? { uri: updatePhoto }
      : require("../assets/Avatar.Appli.jpeg");

  //style de la separation des ecole dans la liste deroulante
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profilEnfant}>
        {enfant ? (
          <Text style={styles.h6Black}>Modification de {updatePrenom}</Text>
        ) : (
          <Text style={styles.h6Black}>Ajout d'un enfant</Text>
        )}
      </View>
      <View style={styles.photoContainer}>
        <Image style={styles.image} source={imageSource} />
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
            <Ionicons name="add-circle" size={24} color="#144172" />
          </MenuTrigger>
          <MenuOptions style={{ padding: 10 }}>
            <FlatList
              data={dataPhotoEnfant}
              keyExtractor={(item) => item.id}
              style={{}}
              ItemSeparatorComponent={ItemDivider}
              renderItem={({ item }) => (
                <MenuOption
                  onSelect={() => item.action()}
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
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Prénom de l'enfant"
          selectionColor="#144172"
          outlineColor="#144172"
          activeOutlineColor="#144172"
          onChangeText={(value) => setUpdatePrenom(value)}
          value={updatePrenom}
        />
        {enfant && (
          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={() => modifyPrenomEnfant()}
          >
            <Text style={styles.textButton}>Enregistrer prénom</Text>
            <Ionicons name="ios-save-sharp" size={24} color="#144172" />
          </TouchableOpacity>
        )}

        <AutocompleteDropdown
          direction={Platform.select({ ios: "up", android: "up" })}
          ref={searchRef}
          controller={(controller) => {
            dropdownController.current = controller;
          }}
          clearOnFocus={false}
          closeOnBlur={false}
          closeOnSubmit={false}
          useFilter={false}
          loading={loading}
          showClear={true}
          debounce={600}
          onClear={onClearPress}
          onChangeText={getSuggestions}
          onSelectItem={(item) => {
            if (item) {
              console.log(item);
              setSelectedItem(item.id);
              setUpdateEtablissement(item.etablissement);
            }
          }}
          suggestionsListMaxHeight={Dimensions.get("window").height * 0.3}
          dataSet={suggestionsList}
          emptyResultText="Aucun résultat"
          textInputProps={{
            placeholder: enfant
              ? enfant.etablissement.nom
              : "Ajouter un établissement",
            autoCorrect: false,
            autoCapitalize: "none",
            height: "fit",
          }}
          inputContainerStyle={{
            borderWidth: 2,
            borderColor: "#144172",
            backgroundColor: "white",
            selectionColor: "#144172",
            outlineColor: "#144172",
            activeOutlineColor: "#144172",
            width: "80%",
            marginTop: 50,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: "#144172",
            width: "80%",
          }}
          suggestionsListTextStyle={{
            color: "white",
          }}
        />
        {enfant && (
          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={() => modifyEtablissementEnfant()}
          >
            <Text style={styles.textButton}>Enregistrer établissement</Text>
            <Ionicons name="ios-save-sharp" size={24} color="#144172" />
          </TouchableOpacity>
        )}
        <View style={styles.card}>
          <Text style={styles.h6}>
            Remarque : Pour plus de précision, renseignez également le code
            postal dans votre recherche.
          </Text>
          <Text style={styles.h6}>
            Exemple de recherche : "70001 Lycée Jean Moulin"
          </Text>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.valideButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("ProfilParent")}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={styles.textButton}>Retour</Text>
        </TouchableOpacity>
        {!enfant && (
          <TouchableOpacity
            style={styles.valideButton}
            activeOpacity={0.8}
            onPress={() => handleValide()}
          >
            <Text style={styles.textButton}>Valider</Text>
            <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>
        )}
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
    width: "100%",
  },

  photoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "relative",
    backgroundColor: "white",
    width: "100%",
    height: "20%",
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
    flexDirection: "row",
    justifyContent: "space-around",
    position: "relative",
    width: "100%",
    marginTop: 100,
  },

  h6Black: {
    fontSize: 20,
    fontFamily: "OpenSans",
    fontWeight: "bold",
    color: "black",
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 75,
    borderRadius: 75,
    borderRadius: 75,
  },

  input: {
    width: "80%",
    margin: 12,
    margin: 7,
    fontFamily: "OpenSans",
  },
  valideButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    //width: "40%",
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
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    width: "80%",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 30,
    shadowRadius: 2,
    marginTop: 10,
  },
  textButton: {
    fontSize: 20,
    fontFamily: "OpenSans",
  },
  card: {
    backgroundColor: "#144272",
    borderRadius: 12,
    width: "90%",
    padding: 15,
    marginTop: 10,
  },
  h6: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
});
