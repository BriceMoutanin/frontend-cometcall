import { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Button,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { getOrganismes, getCommuneById } from "../modules/fetchModules";
import { useState } from "react";
import Animated from "react-native-reanimated";
import { SlideInLeft, FlipInYRight } from "react-native-reanimated";
import { Linking } from "react-native";
import { useCallback } from "react";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function ReponseScreen({ route, navigation }) {
  const { enfant, problematique } = route.params;
  const [contacts, setContacts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const codeCommune = await getCommuneById(enfant.etablissement.IDAPI);
      console.log(codeCommune);
      const fetchedContacts = await getOrganismes(
        codeCommune,
        problematique.organismes,
        enfant.etablissement.IDAPI
      );
      setContacts(fetchedContacts);
      setIsLoading(false);
    })();
  }, []);

  const onPressMobileNumberClick = async (number) => {
    let phoneNumber = "";
    if (number) {
      if (Platform.OS === "android") {
        phoneNumber = `tel:${number.replaceAll(" ", "").replaceAll(".", "")}`;
      } else {
        phoneNumber = `telprompt:${number
          .replaceAll(" ", "")
          .replaceAll(".", "")}`;
      }
      const reponse = await Linking.openURL(phoneNumber);
      console.log(reponse);
    }
  };

  const onPressEmailClick = async (email) => {
    let emailToClick = "";
    if (email) {
      if (Platform.OS === "android") {
        emailToClick = `mailto:${email.replaceAll(" ", "")}`;
      } else {
        emailToClick = `mailto:${email.replaceAll(" ", "")}`;
      }
      const reponse = await Linking.openURL(emailToClick);
      console.log(reponse);
    }
  };

  const onPressURLClick = async (URL) => {
    if (URL) {
      const reponse = await Linking.openURL(URL);
      console.log(reponse);
    }
  };

  const onPressAddressClick = async (coordinates) => {
    let coordinatesToClick = "";
    if (coordinates) {
      if (Platform.OS === "android") {
        //coordinatesToClick = `geo:${coordinates[0]},${coordinates[1]}`;
        coordinatesToClick = `geo:0,0?q=${"Repere"}(${coordinates[0]},${
          coordinates[1]
        })`;
      } else {
        //coordinatesToClick = `http://maps.apple.com/?ll=${coordinates[0]},${coordinates[1]}`;
        coordinatesToClick = `maps:0,0?q=${"Repere"}@${coordinates[0]},${
          coordinates[1]
        }`;
      }
      const reponse = await Linking.openURL(coordinatesToClick);
      console.log(reponse);
    }
  };

  const contactsDisplay = contacts ? (
    contacts.map((contact, index) => {
      if (contact.nom) {
        return (
          <Animated.View
            entering={SlideInLeft.delay(800).duration(1000)}
            key={index}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  backgroundColor: "#144272",
                  width: "100%",
                  paddingBottom: 5,
                  paddingTop: 5,
                }}
              >
                <Text style={styles.name}>{contact.nom}</Text>
              </View>
              <View style={styles.infosContainer}>
                {contact.telephone && (
                  <View style={styles.row}>
                    <Foundation
                      style={styles.icon}
                      name="telephone"
                      size={20}
                      color="black"
                    />
                    <Text
                      style={styles.tel}
                      onPress={() =>
                        onPressMobileNumberClick(contact.telephone)
                      }
                    >
                      {contact.telephone}
                    </Text>
                  </View>
                )}
                {contact.email && (
                  <View style={styles.row}>
                    <Entypo
                      style={styles.icon}
                      name="email"
                      size={20}
                      color="black"
                    />
                    <Text
                      style={styles.mail}
                      onPress={() => onPressEmailClick(contact.email)}
                    >
                      {contact.email}
                    </Text>
                  </View>
                )}

                {contact.adresses && (
                  <View style={styles.row}>
                    <FontAwesome5
                      style={styles.icon}
                      name="address-card"
                      size={20}
                      color="black"
                    />
                    <Text
                      style={styles.adress}
                      onPress={() =>
                        onPressAddressClick(contact.adresses[0].coordinates)
                      }
                    >
                      {contact.adresses[0].lignes +
                        "\n" +
                        contact.adresses[0].codePostal +
                        " " +
                        contact.adresses[0].commune}
                    </Text>
                  </View>
                )}

                {contact.url && (
                  <View style={styles.row}>
                    <AntDesign
                      style={styles.icon}
                      name="link"
                      size={20}
                      color="black"
                    />
                    <Text
                      onPress={() => onPressURLClick(contact.url)}
                      style={styles.lien}
                    >
                      {contact.url}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </Animated.View>
        );
      } else {
        return null;
      }
    })
  ) : (
    <Animated.View
      entering={SlideInLeft.delay(800).duration(1000)}
      style={styles.card}
    >
      <Text>Aucun résultat</Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Button title="Retour" onPress={() => navigation.goBack()}></Button>
        </View>
        <Text style={styles.titre}>{problematique.titre}</Text>
        <Text style={styles.description}>
          {problematique.description.replaceAll("votre enfant", enfant.prenom)}
        </Text>
        <Text style={styles.voici}>
          Voici, dans l'ordre, la liste des organismes à contacter :
        </Text>
        {isLoading ? (
          <ActivityIndicator
            key={-1}
            style={{ marginTop: 15 }}
            size="small"
            color="#0000ff"
            animating={isLoading}
          />
        ) : (
          contactsDisplay
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#144272",
    borderRadius: 12,
    width: "90%",
    padding: 15,
    marginTop: 40,
    paddingBottom: 20,
  },
  titre: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 20,
    color: "#144272",
    textAlign: "center",
    marginBottom: 10,
  },
  voici: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 14,
    color: "rgb(12, 123, 147)",
    width: "100%",
    marginTop: 10,
    marginBottom: 20,

    textAlign: "center",
  },
  description: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 15,
    color: "black",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
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
    marginTop: 10,
    marginBottom: 10,
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

  name: {
    alignItems: "center",
    fontFamily: "OpenSans",
    color: "white",
    fontSize: 15,
    fontFamily: "OpenSans",
    textAlign: "center",
  },

  tel: {
    alignItems: "center",
    fontFamily: "OpenSans",
    fontSize: 12,
    margin: 5,
    width: "80%",
  },

  mail: {
    alignItems: "center",
    fontFamily: "OpenSans",
    fontSize: 12,
    margin: 5,
    width: "80%",
  },

  adress: {
    alignItems: "center",
    fontFamily: "OpenSans",
    fontSize: 12,
    margin: 5,
    width: "80%",
  },
  lien: {
    alignItems: "center",
    fontFamily: "OpenSans",
    color: "#144272",
    fontSize: 12,
    margin: 5,
    width: "80%",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  icon: {
    width: "12%",
  },

  infosContainer: {
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#144272",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    //margin: 5,
    width: " 100%",
    padding: 10,
    marginBottom: 15,
  },
});
