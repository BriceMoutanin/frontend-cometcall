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

export default function ReponseHistScreen({ route, navigation }) {
  const { enfant, problematique, date } = route.params;
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

  const contactsDisplay = contacts ? (
    contacts.map((contact, index) => {
      if (contact.nom) {
        return (
          <Animated.View
            entering={SlideInLeft.delay(800).duration(1000)}
            style={styles.card}
            key={index}
          >
            <Text style={styles.h5}>
              {index + 1}
              {") "}
              {contact.nom}
            </Text>
            {contact.telephone && (
              <Text
                style={styles.h6}
                onPress={() => onPressMobileNumberClick(contact.telephone)}
              >
                {contact.telephone}
              </Text>
            )}
            {contact.email && (
              <Text
                style={styles.h6}
                onPress={() => onPressEmailClick(contact.email)}
              >
                {contact.email}
              </Text>
            )}
            {contact.url && (
              <Text
                style={styles.h6}
                onPress={() => onPressURLClick(contact.url)}
              >
                {contact.url}
              </Text>
            )}
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
        <Text style={styles.titre}>{problematique.titre}</Text>
        <Text style={styles.description}>
          {problematique.description.replaceAll("votre enfant", enfant.prenom)}
        </Text>
        <Text style={styles.description}>
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
    paddingTop: 30,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#144272",
    borderRadius: 12,
    width: "80%",
    padding: 15,
    marginTop: 40,
    paddingBottom: 20,
  },
  titre: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 30,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    textAlign: "center",
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
});
