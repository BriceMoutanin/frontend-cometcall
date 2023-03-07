import { StyleSheet, View, Image, Button } from "react-native";
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

  let component = FAQ.map((value, i) => result);

  return (
    <SafeAreaView>
      <Text style={styles.questions}>{component.question}</Text>
      <Text style={styles.reponse}></Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
