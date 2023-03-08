import { StyleSheet, View, Image, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FAQScreen({ navigation }) {
  let FAQ = [
    { question: "Comment on fait des cookies?", reponse: "Avec du chocolat" },
    {
      question: "Quelles sont les meilleures madeleines?",
      reponse: "Les Bijoux evidement!",
    },
    {
      question: "Fera-t-il beau demain? ",
      reponse: "Vous n'êtes pas dans la bonne appli!!",
    },
  ];

  let component = FAQ.map((data, i) => {
    let questions = data.question;

    let reponses = data.reponse;

    return (
      <View key={i} style={styles.photoContainer}>
        <Text style={styles.questions}>{questions}</Text>
        <Text style={styles.reponse}>{reponses}</Text>
      </View>
    );
  });

  return <SafeAreaView>{component}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  photoContainer: {
    backgroundColor: "yellow",
  },
  questions: {
    backgroundColor: "green",
  },
  reponse: {
    backgroundColor: "pink",
  },
});
