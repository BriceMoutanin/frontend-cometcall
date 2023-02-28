import {
  StyleSheet,
  View,
  SafeAreaView,
  AutocompleteDropdown,
  Text,
  Image,
  Button,
} from "react-native";

export default function ProblematiqueScreen({ navigation }) {
  const problematiques = ["Harcelement", "Cantine", "Travaux", "Vol", "Greve"];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.text}>
          Quel est l'objet de votre demande pour childName ?
        </Text>
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
  },
});
