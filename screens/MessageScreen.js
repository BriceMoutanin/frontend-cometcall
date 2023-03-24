import { StyleSheet, View } from "react-native";

export default function MessageScreen({ navigation }) {
  return <View style={styles.container}>Message</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
