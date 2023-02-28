import {
  StyleSheet,
  View,
  Image,
  Button,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { SvgXml } from "react-native-svg";
import Logo from "../assets/logoComEtCall";
import LogoSvg from "../assets/newLogo.svg";

export default function LoginScreen({ navigation }) {
  const [pwdVisible, setPwdVisible] = useState(false);

  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/Open-Sans.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <LogoSvg style={styles.logo}></LogoSvg>
      </View>
      <View style={styles.card}>
        <Text style={styles.h5}>Un contact à trouver ?</Text>
        <Text style={styles.h6}>
          Un problème à résoudre avec l’école, le collège ou le lycée de votre
          enfant ? Avec Com-et-Call, trouvez rapidement le bon contact !
        </Text>
      </View>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        selectionColor="#144272"
        outlineColor="#144272"
        activeOutlineColor="#144272"
      />
      {!pwdVisible ? (
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Password"
          secureTextEntry={true}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setPwdVisible(!pwdVisible)}
            />
          }
          selectionColor="#144272"
          activeUnderlineColor="#144272"
          activeOutlineColor="#144272"
        />
      ) : (
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Password"
          inputMode="text"
          secureTextEntry={false}
          right={
            <TextInput.Icon
              icon="eye-off-outline"
              onPress={() => setPwdVisible(!pwdVisible)}
            />
          }
          selectionColor="#144272"
          activeUnderlineColor="#144272"
          activeOutlineColor="#144272"
        />
      )}
      <TouchableOpacity
        style={styles.cntButton}
        onPress={() => navigation.navigate("DrawerNavigator")}
      >
        <Text style={styles.cntText}>S'inscrire</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.h5Black}>Déjà inscrit ?</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate("DrawerNavigator")}
        >
          <Text style={styles.cntText}>Connexion</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingTop: 300,
  },
  card: {
    backgroundColor: "#144272",
    borderRadius: 12,
    width: "80%",
    padding: 15,
  },
  h5: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  h6: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  h5Black: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: 100,
    fontSize: 24,
    color: "black",
    textAlign: "center",
  },
  input: {
    width: "70%",
    marginTop: 15,
  },
  cntButton: {
    width: "90%",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    marginTop: 30,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 30,
    shadowRadius: 2,
  },
  signInButton: {
    width: "50%",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 30,
    shadowRadius: 2,
  },
  cntText: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 20,
    color: "#144272",
    textAlign: "center",
  },
  logoContainer: {
    marginTop: -350,
    marginBottom: 20,
    width: 150,
    height: 100,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    margin: -500,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    marginTop: 50,
  },
});
