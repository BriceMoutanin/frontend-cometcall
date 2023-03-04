import { StyleSheet, View, SafeAreaView, Text, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";

import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";

export default function ProblematiqueScreen({ route, navigation }) {
  //const pour l'input list
  const [search, setSearch] = useState("");
  const { selectedEnfant } = route.params;

  const [problematiques, setProblematiques] = useState([]);

  //Connection avec le BackEnd
  const BACKEND_ADDRESS = "https://backend-cometcall.vercel.app";

  useEffect(() => {
    console.log(selectedEnfant);
    fetch(`${BACKEND_ADDRESS}/problematiques`)
      .then((response) => response.json())
      .then((data) => {
        setProblematiques(
          data.problematiques.filter(
            (problem) =>
              problem.typeEtablissement === selectedEnfant.etablissement.type
          )
        );
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  //Composant problematique
  const problematiqueView = problematiques
    .filter((problematique) =>
      search === null
        ? null
        : problematique.titre.toLowerCase().includes(search.toLowerCase())
    )
    .map((problematique, i) => {
      return (
        <Text
          style={styles.itemStyle}
          onPress={() =>
            navigation.navigate("Reponse", {
              navigation,
              selectedEnfant,
              problematique,
            })
          }
          key={i}
        >
          {problematique.titre}
        </Text>
      );
    });

  problematiqueView.push(
    <Text
      style={styles.itemStyle}
      onPress={() =>
        navigation.navigate("Autre", {
          navigation,
          selectedEnfant,
        })
      }
      key={-1}
    >
      Autre
    </Text>
  );

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/Open-Sans.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.text}>
          Quel est l'objet de votre demande pour {selectedEnfant.prenom} ?
        </Text>
      </View>

      <TextInput
        style={styles.textInputStyle}
        mode="outlined"
        label="Barre de recherche"
        selectionColor="#1A7B93"
        outlineColor="#1A7B93"
        onChangeText={(value) => setSearch(value)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Barre de recherche"
      />

      <ScrollView style={styles.scroll}>
        <View style={styles.probleme}>{problematiqueView}</View>
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
    width: "100%",
    backgroundColor: "white",
  },
  question: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    backgroundColor: "white",
    height: "20%",
  },

  probleme: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    position: "center",
    width: "100%",
    backgroundColor: "white",
    height: "80%",
  },

  valideButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: 350,
    borderRadius: 30,
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 30,
    shadowRadius: 2,
  },

  input: {
    width: "80%",
    marginTop: 15,
    valideButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      width: 350,
      borderRadius: 20,
      backgroundColor: "white",
      shadowColor: "gray",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 30,
      shadowRadius: 2,
    },
  },
  text: {
    fontFamily: "OpenSans",
    fontSize: 16,
  },
  itemStyle: {
    fontFamily: "OpenSans",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#144272",
    width: " 70%",
    margin: 3,
    padding: 10,
    textAlign: "center",
  },
  textInputStyle: {
    height: 50,
    paddingLeft: 10,
    width: "70%",
    margin: 5,
    backgroundColor: "#FFFFFF",
    color: "#1A7B93",
  },
  scroll: {
    width: "100%",
  },
  descrition: {
    width: "100%",
    color: "black",
  },
});
