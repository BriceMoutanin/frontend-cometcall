import { StyleSheet, View, Image, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

export default function FAQScreen({ navigation }) {
  // const [loaded] = useFonts({
  //   OpenSans: require("../assets/fonts/Open-Sans.ttf"),
  // });

  // if (!loaded) {
  //   return null;
  // }

  let FAQ = [
    {
      question: "Que faire si votre enfant est victime de harcèlement ?",
      reponse:
        "Si votre enfant est victime de harcèlement appelez le 3020 et pour des Cyberviolences le 3018 plus d'infos sur : https://www.education.gouv.fr/non-au-harcelement/je-suis-victime-de-harcelement-323011#primaire ou https://www.education.gouv.fr/non-au-harcelement/je-suis-victime-de-harcelement-323011#collegelycee",
    },
    {
      question:
        "Que faire si des travaux devant l'établissement et l'empêche d'y accéder en toute sécurité ?",
      reponse:
        "Contacter la mairie de votre ville et le commissariat de police pour qu'ils viennent sécuriser les lieux.",
    },
    {
      question:
        "Cela fait plusieurs jours qu'un professeur de votre enfant est absent et qu'il n'est pas remplacer? ",
      reponse:
        "Contacter l'inpecteur de l'éducation nationale (INE) de l'académie dont dépend l'établissement de votre enfant.",
    },
  ];

  let component = FAQ.map((data, i) => {
    let questions = data.question;

    let reponses = data.reponse;

    return (
      <View key={i} style={styles.FAQcontainer}>
        <Text style={styles.questions}>{questions}</Text>
        <Text style={styles.reponse}>{reponses}</Text>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.intro}>
        <Text style={styles.titre}>FAQ</Text>
        <View style={styles.text}>
          <Text>Vous avez une autre question ? </Text>
          <Text>Consulter les questions les plus fréquement posées. </Text>
        </View>
      </View>
      <View style={styles.component}>{component}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "yellow",
  },
  component: {
    backgroundColor: "brown",
    height: " 90%",
  },
  FAQcontainer: {
    backgroundColor: "orange",
    height: " 10%",
  },

  intro: {
    backgroundColor: "blue",
    height: " 30%",
  },
  titre: {
    backgroundColor: "rgb(26, 123, 147)",
    fontFamily: "OpenSans",
    fontWeight: "100",
    fontSize: 30,
    color: "white",
    height: "30%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    backgroundColor: "fuchsia",
    fontFamily: "OpenSans",
    fontWeight: "100",
    fontSize: 20,
    color: "#144272",
    flexDirection: "column",

    alignItems: "center",
    padding: 10,
    height: "100%",
  },
  questions: {
    backgroundColor: "green",
  },
  reponse: {
    backgroundColor: "pink",
  },
});
