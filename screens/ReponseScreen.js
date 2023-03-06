import { StyleSheet, View, Image, Button, Text } from "react-native";

export default function ReponseScreen({ route, navigation }) {
  const { enfant, problematique } = route.params;
  return (
    <View style={styles.container}>
      <Text>Reponse</Text>
    </View>
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
