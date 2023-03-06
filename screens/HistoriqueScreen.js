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
import { useState, useRef, useCallback,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { addHistorique,removeHistorique, setHistorique } from "../reducers/historique";
import { FlatList, ActivityIndicator } from "react-native";

export default function HistoriqueScreen({ navigation }) {
  const dispatch = useDispatch();
  const  historique = useSelector(
    (state) => state.historique.value)

  const user =  useSelector((state) => state.user.value);
  const BACKEND_ADDRESS = "https://backend-cometcall.vercel.app";
  const [isLoading, setIsLoading] = useState(false);
  {
    useEffect(() => {
      
      fetch(`${BACKEND_ADDRESS}/users/getHistorique/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
         if (data.result){
          setIsLoading(false);
          dispatch(setHistorique(data.historique))

         }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);



    return (
      
      <SafeAreaView>
        <View>
        <Text style={styles.textButton}>{"historique"}</Text>
          <TextInput
            onChangeText={(value) => dispatch(setHistorique(value))}
            value={historique}
          />
          <Button title="Save" onPress={() => dispatch(addHistorique(historique))} />
          <Button title="Delete" onPress={() => dispatch(removeHistorique(historique))} />
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={"historiques"}
              renderItem={({ item }) => <Text>{item.value} - {item.prenom} - {item.problematique}</Text>}
            />
          )}
        </View>
      </SafeAreaView>
    );}}

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      },
    });
    