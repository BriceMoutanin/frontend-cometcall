import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useState, useRef, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import {
  addHistorique,
  removeHistorique,
  setHistorique,
} from "../reducers/historique";
import { FlatList, ActivityIndicator } from "react-native";

export default function HistoriqueScreen({ navigation }) {
  const dispatch = useDispatch();
  const historique = useSelector((state) => state.historique.value);
  console.log("HISTORIQUE", historique);

  const user = useSelector((state) => state.user.value);
  const BACKEND_ADDRESS = "https://backend-cometcall.vercel.app";
  const [isLoading, setIsLoading] = useState(false);
  const [problematiques, setProblematiques] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/users/getHistorique/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setIsLoading(false);
          dispatch(setHistorique(data.historiques));
        }
      })
      .catch((error) => {
        console.error(error);
      });
    fetch(`${BACKEND_ADDRESS}/problematiques`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setProblematiques(data.problematiques);
        }
      });
  }, []);

  function deleteHistorique(historiqueID) {
    fetch(
      `${BACKEND_ADDRESS}/users/removeHistorique/${user.token}/${historiqueID}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          dispatch(removeHistorique(historiqueID));
        }
      });
  }

  const historiqueDisplay = historique.historique.map((maphistorique, i) => {
    const problematique = problematiques.find(
      (problematique) => problematique._id == maphistorique.problematique
    );
    const newDate = new Date(Date.parse(maphistorique.date));
    return (
      <TouchableOpacity
        style={styles.viewstyles}
        onPress={() =>
          navigation.navigate("Affichage Historique", {
            enfant: maphistorique.enfant,
            problematique: problematique,
            date: maphistorique.date,
          })
        }
      >
        <View style={styles.infoContainer}>
          <Text style={styles.prenomStyle}>{maphistorique.enfant.prenom}</Text>
          <Text style={styles.probStyle}>
            {problematique ? problematique.titre : null}
          </Text>
          <Text style={styles.histStyle}>
            {(newDate.getDate() < 10
              ? "0" + newDate.getDate()
              : newDate.getDate()) +
              "/" +
              (newDate.getMonth() < 10
                ? "0" + newDate.getMonth()
                : newDate.getMonth()) +
              "/" +
              newDate.getFullYear() +
              "\n"}
            {newDate.getHours() +
              ":" +
              newDate.getMinutes() +
              ":" +
              newDate.getSeconds()}
          </Text>
        </View>
        <MaterialIcons
          style={styles.deleteIcon}
          name="delete-forever"
          size={40}
          color="rgb(12, 123, 147)"
          onPress={() => deleteHistorique(maphistorique._id)}
        />
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Text style={styles.H6text}>Vos dernieres recherches</Text>
        {historiqueDisplay}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    //position: "relative",
  },
  prenomStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#144272",
    textAlign: "left",
    width: "100%",
    marginBottom: 10,
  },
  probStyle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#144272",
    textAlign: "left",
    width: "100%",
    marginBottom: 8,
  },
  histStyle: {
    fontSize: 13,
    color: "#144272",
    textAlign: "left",
    width: "100%",
  },
  viewstyles: {
    //backgroundColor: "rgb(12, 123, 147)",
    borderColor: "#144272",
    borderWidth: 1.5,
    width: "90%",
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 10,
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  H6text: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 24,
    backgroundColor: "rgb(12, 123, 147)",
    color: "white",
    width: "100%",
    padding: 10,
    textAlign: "center",
    marginBottom: 10,
  },
  deleteIcon: {
    alignItems: "flex-end",
  },
});
