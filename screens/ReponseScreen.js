import { useEffect } from "react";
import { StyleSheet, View, Image, Button, Text } from "react-native";
import { getOrganismes, getCommuneById } from "../modules/fetchModules";
import { useState } from "react";

export default function ReponseScreen({ route, navigation }) {
  const { enfant, problematique } = route.params;
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    (async () => {
      const codeCommune = await getCommuneById(enfant.etablissement.IDAPI);
      console.log(codeCommune);
      const fetchedContacts = await getOrganismes(
        codeCommune,
        problematique.organismes,
        enfant.etablissement.IDAPI
      );
      setContacts(fetchedContacts);
    })();
  }, []);

  const contactsDisplay = contacts ? (
    contacts.map((contact, index) => {
      return <Text key={index}>{contact.nom}</Text>;
    })
  ) : (
    <Text>Aucun résultat</Text>
  );

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text>{enfant.prenom}</Text>
      <Text>{problematique.titre}</Text>
      {contactsDisplay}
=======
      <Text>Re</Text>
>>>>>>> inversion
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
