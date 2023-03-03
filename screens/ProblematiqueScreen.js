import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  TextInput,
} from "react-native";

import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";

export default function ProblematiqueScreen({ navigation, enfant }) {
  //const pour l'input list
  const [search, setSearch] = useState("");

  const [titresProblematiques, setTitresProblematiques] = useState([]);

  //Connection avec le BackEnd
  const BACKEND_ADDRESS = "https://backend-cometcall.vercel.app";

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/problematiques`)
      .then((response) => response.json())
      .then((data) => {
        setTitresProblematiques(
          data.problematiques.map((problem) => problem.titre)
        );
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  //Composant problematique
  const problematiqueView = titresProblematiques
    .filter((titre) =>
      search === null
        ? null
        : titre.toLowerCase().includes(search.toLowerCase())
    )
    .map((data, i) => {
      return (
        <Text
          style={styles.itemStyle}
          onPress={() => handleProblematique()}
          key={i}
        >
          {data}
        </Text>
      );
    });

  // Style séparateur d'éléments de liste plate
  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  // Function pour clicker sur une problematique
  const handleProblematique = (item) => {
    navigation.navigate("Reponse");
  };

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
          Quel est l'objet de votre demande pour childName ?
        </Text>
      </View>
      <View style={styles.probleme}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(value) => setSearch(value)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        {problematiqueView}
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
    // position: "relative",
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
    // padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
  },
});
