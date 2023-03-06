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
  const historique = useSelector((state) => state.historique.historique);
  console.log(historique)

  const user = useSelector((state) => state.user.value);
  const BACKEND_ADDRESS = "https://backend-cometcall.vercel.app";
  const [isLoading, setIsLoading] = useState(false);
  {
    useEffect(() => {
      fetch(`${BACKEND_ADDRESS}/users/getHistorique/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setIsLoading(false);
            //dispatch(setHistorique(data.historiques));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    return (
      <SafeAreaView>
        {
          historique.map((maphistorique, i) => {
            <Text style={styles.H6text}>Vos dernieres recherche!</Text>
           return <View key={i} style={styles.viewstyles}>
            
              <Text style={styles.monMessageStyle}>{maphistorique.prenom}</Text>
              <Text style={styles.monMessageStyle}>{maphistorique.problematique}</Text>
            </View>
            })
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  monMessageStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    
  },
  viewstyles: {
    backgroundColor: 'rgb(12, 123, 147)',
    height: 60,
    width: "auto",
    borderRadius: 80,
    marginBottom: 10,
    marginTop:10,
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
});
