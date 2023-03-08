//import react
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import react vative
import {
  StyleSheet,
  View,
  Image,
  Button,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SvgXml } from "react-native-svg";
//import expo police
import { useFonts } from "expo-font";
//import logo
import Logo from "../assets/logoComEtCall";
import LogoSvg from "../assets/newLogo.svg";
//import reducer
import { login } from "../reducers/user";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [pwdVisible, setPwdVisible] = useState(false);
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpMail, setSignUpMail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [signInPassword, setSignInPassword] = useState("");
  const [signInMail, setSignInMail] = useState("");
  const [loadingUp, setLoadingUp] = useState(false);
  const [loadingIn, setLoadingIn] = useState(false);
  const dispatch = useDispatch();

  const [emailErrorIn, setEmailErrorIn] = useState(false);
  const [emailErrorUp, setEmailErrorUp] = useState(false);
  const [identifiantErrorIn, setIdentifiantErrorIn] = useState(false);
  const [utilisateurErrorIn, setUtilisateurErrorIn] = useState(false);
  const [identifiantErrorUp, setIdentifiantErrorUp] = useState(false);
  // const [identifiantErrorUp, setidentifiantErrorUp] = useState(false);

  const userReducer = useSelector((state) => state.user.value);

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  //Le hook Google.useAuthRequest() fournit des objets de requête et de réponse. Il permet une configuration asynchrone, ce qui signifie qu'un navigateur Web mobile ne bloquera pas la demande. Il accepte également un objet d'ID client généré dans la console Google Cloud.
  const [request, response, promptAsync] = Google.useAuthRequest({
    //androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    iosClientId:
      "398197106725-noclnfgqaui62rknhvt3f2168rlak0v2.apps.googleusercontent.com",
  });

  // ne pas devoir se reconnecter => reduxPersist
  // useEffect(() => {
  //   if (userReducer.token) {
  //     navigation.navigate("DrawerNavigator", { screen: "DemandeStack" });
  //   }
  // }, []);

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);
  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  //lien avec le Backend
  const BACKEND_ADDRESS = "https://backend-cometcall.vercel.app";

  // import de la police Open-sans
  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/Open-Sans.ttf"),
  });
  if (!loaded) {
    return null;
  }

  // Grabbed from emailregex.com
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // s'inscrire
  const handleSignUp = () => {
    Keyboard.dismiss();
    if (EMAIL_REGEX.test(signUpMail)) {
      setLoadingUp(true);
      setEmailErrorUp(false);
      setIdentifiantErrorUp(false);
      fetch(`${BACKEND_ADDRESS}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: signUpPassword,
          email: signUpMail,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(
              login({
                nom: data.newUser.nom,
                prenom: data.newUser.prenom,
                password: signUpPassword,
                email: signUpMail,
                token: data.newUser.token,
                enfants: data.newUser.enfants,
                photoURI: data.newUser.photoURI,
                //tel: data.user.tel,
              })
            );
            setSignUpMail("");
            setSignUpPassword("");
            setLoadingUp(false);
            setModalVisible(false);
            navigation.navigate("DrawerNavigator");
          } else {
            setIdentifiantErrorUp(true);
            setLoadingUp(false);
          }
        });
    } else {
      setEmailErrorUp(true);
      setLoadingUp(false);
    }
  };

  //s'identifier
  const handleSignIn = () => {
    Keyboard.dismiss();
    if (EMAIL_REGEX.test(signInMail)) {
      setLoadingIn(true);
      setEmailErrorIn(false);
      setIdentifiantErrorIn(false);
      setUtilisateurErrorIn(false);

      fetch(`${BACKEND_ADDRESS}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: signInPassword,
          email: signInMail,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLoadingIn(false);
          if (data.result) {
            dispatch(
              login({
                nom: data.user.nom,
                prenom: data.user.prenom,
                password: signInPassword,
                email: signInMail,
                token: data.user.token,
                enfants: data.user.enfants,
                photoURI: data.user.photoURI,
                //tel: data.user.tel,
              })
            );
            setSignInMail("");
            setSignInPassword("");

            navigation.navigate("DrawerNavigator", { screen: "DemandeStack" });
          } else {
            if (data.code == 1) {
              setIdentifiantErrorIn(true);
            } else {
              setUtilisateurErrorIn(true);
            }
          }
        });
    } else {
      setEmailErrorIn(true);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={styles.centeredViewModal}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Email"
              selectionColor="#144272"
              outlineColor={
                emailErrorUp || identifiantErrorUp ? "red" : "#144272"
              }
              activeOutlineColor="#144272"
              keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
              autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
              autoComplete="email" // https://reactnative.dev/docs/textinput#autocomplete-android
              autoCorrect={false}
              onChangeText={(value) => setSignUpMail(value)}
              value={signUpMail}
            />
            {emailErrorUp && (
              <Text style={styles.error}>Adresse mail invalide.</Text>
            )}
            {identifiantErrorUp && (
              <Text style={styles.error}>Adresse mail déjà existante.</Text>
            )}

            <TextInput
              style={styles.input}
              mode="outlined"
              label="Password"
              inputMode="text"
              secureTextEntry={!pwdVisible}
              right={
                <TextInput.Icon
                  icon={pwdVisible ? "eye-off-outline" : "eye"}
                  onPress={() => setPwdVisible(!pwdVisible)}
                />
              }
              selectionColor="#144272"
              activeUnderlineColor="#144272"
              activeOutlineColor="#144272"
              autoCapitalize="none"
              onChangeText={(value) => setSignUpPassword(value)}
              value={signUpPassword}
            />

            <View style={styles.lastButton}>
              <TouchableOpacity
                style={styles.signUpButtonModal}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cntText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signUpButtonModal}
                onPress={() => handleSignUp()}
              >
                <Text style={styles.cntText}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
            <ActivityIndicator
              style={{ marginTop: 15 }}
              size="small"
              color="#0000ff"
              animating={loadingUp}
            />
          </View>
        </View>
      </Modal>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.firstContainer}>
          <View style={styles.logoContainer}>
            <LogoSvg style={styles.logo}></LogoSvg>
          </View>
          <View style={styles.card}>
            <Text style={styles.h5}> Un contact à trouver ?</Text>
            <Text style={styles.h6}>
              Un problème à résoudre avec l’école, le collège ou le lycée de
              votre enfant ? Avec Com-et-Call, trouvez rapidement le bon contact
              !
            </Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Email"
            selectionColor="#144272"
            outlineColor={
              emailErrorIn || utilisateurErrorIn ? "red" : "#144272"
            }
            activeOutlineColor="#144272"
            keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
            autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
            autoComplete="email" // https://reactnative.dev/docs/textinput#autocomplete-android
            autoCorrect={false}
            onChangeText={(value) => setSignInMail(value)}
            value={signInMail}
          />
          {emailErrorIn && (
            <Text style={styles.error}>Adresse mail invalide.</Text>
          )}
          {utilisateurErrorIn && (
            <Text style={styles.error}>Adresse mail introuvable</Text>
          )}
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
              outlineColor={identifiantErrorIn ? "red" : "#144272"}
              activeOutlineColor="#144272"
              autoCapitalize="none"
              onChangeText={(value) => setSignInPassword(value)}
              value={signInPassword}
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
              outlineColor={identifiantErrorIn ? "red" : "#144272"}
              autoCapitalize="none"
              onChangeText={(value) => setSignInPassword(value)}
              value={signInPassword}
            />
          )}
          {identifiantErrorIn && (
            <Text style={styles.error}>Mot de passe incorrect.</Text>
          )}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => handleSignIn()}
            >
              <Text style={styles.cntText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
          <ActivityIndicator
            style={{ marginTop: 15 }}
            size="small"
            color="#0000ff"
            animating={loadingIn}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.containerGoogle}>
            {userInfo === null ? (
              //Envoyer la demande d'authentification
              //Le crochet useAuthRequest() fournit également promptAsync() qui invite l'utilisateur à s'authentifier en ouvrant un navigateur Web.
              <Button
                title="Sign in with Google"
                disabled={!request}
                onPress={() => {
                  promptAsync();
                }}
              />
            ) : (
              <Text style={styles.text}>{userInfo.name}</Text>
            )}
          </View>
          <Text style={styles.h5Black}>Créer un compte</Text>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.cntText}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "100%",
    width: "100%",
  },

  firstContainer: {
    paddingTop: 400,
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer: {
    paddingTop: 10,
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    height: "20%",
  },

  card: {
    backgroundColor: "#144272",
    borderRadius: 12,
    width: "80%",
    padding: 15,
    height: 200,
    marginBottom: 20,
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
    fontSize: 23,
    color: "black",
    textAlign: "center",
    marginLeft: 0,
  },

  input: {
    width: "70%",
    marginTop: 15,
  },
  cntButton: {
    width: "70%",
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
    margin: 20,
    marginRight: 0,
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

  centeredViewModal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(66,71,78,0.5)",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  signUpButtonModal: {
    width: "50%",
    padding: 10,
    marginTop: 30,
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

  inputModal: {
    width: "90%",
    margin: 5,
  },
  lastButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  containerGoogle: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
