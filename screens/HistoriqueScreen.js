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
    return (
      <View key={i} style={styles.viewstyles}>
        <Text style={styles.monMessageStyle}>
          {maphistorique.enfant.prenom}
        </Text>
        <Text style={styles.monMessageStyle}>
          {problematiques &&
          problematiques.find(
            (problematique) => problematique._id == maphistorique.problematique
          )
            ? problematiques.find(
                (problematique) =>
                  problematique._id == maphistorique.problematique
              ).titre
            : null}
        </Text>
        <MaterialIcons
          style={styles.deleteIcon}
          name="delete-forever"
          size={24}
          color="black"
          onPress={() => deleteHistorique(maphistorique._id)}
        />
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.H6text}>Vos dernieres recherche!</Text>
        {historiqueDisplay}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  monMessageStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  viewstyles: {
    backgroundColor: "rgb(12, 123, 147)",
    height: 60,
    width: "auto",
    borderRadius: 80,
    marginBottom: 10,
    marginTop: 10,
  },
  H6text: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  deleteIcon: {
    alignItems: "flex-end",
  },
});
