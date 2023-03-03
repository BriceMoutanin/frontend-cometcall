import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEnfant } from "../reducers/user";

export default function ProfilEnfantScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [etablissements, setEtablissements] = useState([]);
  const [updatePrenom, setUpdatePrenom] = useState("");
  const [updateEtablissement, setUpdateEtablissement] = useState(null);
  const BACKEND_ADDRESS = "https://backend-cometcall.vercel.app";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const dropdownController = useRef(null);

  const searchRef = useRef(null);

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

  const handleValide = async () => {
    fetch(`${BACKEND_ADDRESS}/users/addEnfant/${user.token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prenom: updatePrenom,
        etablissement: updateEtablissement,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addEnfant(data.newEnfant));
          navigation.navigate("ProfilParent");
        }
      });
  };

  if (!loaded) {
    return null;
  }

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
          selectionColor="#144172"
          outlineColor="#144172"
          activeOutlineColor="#144172"
          onChangeText={(value) => setUpdatePrenom(value)}
          value={updatePrenom}
        />
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
          suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
          dataSet={suggestionsList}
          emptyResultText="Aucun résultat"
          textInputProps={{
            placeholder: "Rechercher un nom d'établissement",
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
            marginTop: 15,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: "#144172",
            width: "80%",
          }}
          suggestionsListTextStyle={{
            color: "white",
          }}
        />
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
          <Text style={styles.textButton}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.valideButton}
          activeOpacity={0.8}
          onPress={() => handleValide()}
        >
          <Text style={styles.textButton}>Valider</Text>
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
    flexDirection: "row",
    justifyContent: "space-around",
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
    width: "40%",
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
    fontFamily: "OpenSans",
  },
  card: {
    backgroundColor: "#144272",
    borderRadius: 12,
    width: "70%",
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
