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

  // affichage des questions
  let component = FAQ.map((data, i) => {
    let questions = data.question;
    let reponses = data.reponse;
    return (
      <View key={i}>
        <View style={styles.questions}>
          <Text style={styles.questionsText}>{questions}</Text>
        </View>
        <Text style={styles.reponse}>{reponses}</Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.TextIntro}>
        <Text style={styles.text}>Vous avez une autre question ? </Text>
        <Text style={styles.text}>
          Consulter les questions les plus fréquement posées.
        </Text>
      </View>
      <View style={styles.composant}>{component}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    paddingLeft: 10,
    paddingRight: 10,

    paddingTop: 60,
  },

  composant: {
    // backgroundColor: "brown",
    flexWrap: "wrap",
    height: "100%",
  },

  TextIntro: {
    // height: " 10%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 40,
  },

  text: {
    fontWeight: "500",
    fontSize: 15,
    color: "#144272",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    justifyContent: "flex-start",
  },

  questions: {
    backgroundColor: "rgb(12, 123, 147)",
    padding: 5,
    borderRadius: 15,
  },

  questionsText: {
    fontFamily: "OpenSans",
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },

  reponse: {
    fontFamily: "OpenSans",
    fontSize: 15,
    padding: 8,
    color: "black",
    marginBottom: 10,
    marginLeft: 10,
  },
});
