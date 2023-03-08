//A partir de API Id de l'etablissement, on retourne le code Commune
async function getCommuneById(IdEtablissement) {
  let codeCommune = "-1";
  const reponse = await fetch(
    `https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-annuaire-education&q=&refine.identifiant_de_l_etablissement=${IdEtablissement}`
  );
  const data = await reponse.json();
  if (data.nhits >= 1) {
    codeCommune = data.records[0].fields.code_commune;
  }
  return codeCommune;
}

// A partir de l'organisme on recupere le contact de tout les etablissements publics
async function getContactByOrganisme(codeCommune, typeOrganisme) {
  let contacts = {
    nom: null,
    adresses: [],
    telephone: null,
    email: null,
    url: null,
  };
  const reponse = await fetch(
    `https://etablissements-publics.api.gouv.fr/v3/communes/${codeCommune}/${typeOrganisme}`
  );
  const data = await reponse.json();
  if (data.features.length > 0) {
    contacts = {
      nom: data.features[0].properties.nom,
      adresses: data.features[0].properties.adresses,
      telephone: data.features[0].properties.telephone,
      email: data.features[0].properties.email,
      url: data.features[0].properties.url,
    };
  }
  return contacts;
}

// A partir de l'ecole on recupere le contact de l'ecole
async function getContactByEtablissement(IdEtablissement) {
  let contacts = {
    nom: null,
    adresses: [],
    telephone: null,
    email: null,
    url: null,
  };
  const reponse = await fetch(
    `https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-annuaire-education&q=&refine.identifiant_de_l_etablissement=${IdEtablissement}`
  );
  const data = await reponse.json();
  if (data.nhits >= 1) {
    contacts = {
      nom: data.records[0].fields.nom_etablissement,
      adresses: [
        {
          lignes: [data.records[0].fields.adresse_1],
          codePostal: data.records[0].fields.code_postal,
          commune: data.records[0].fields.nom_commune,
        },
      ],
      telephone: data.records[0].fields.telephone,
      email: data.records[0].fields.mail,
      url: "",
    };
  }
  return contacts;
}

// A partir du code commune, du tableau Organime et de l'Id etablissement de l'API , on recupere le tableau d'objet de mes organismes avec tout les contacts
async function getOrganismes(
  codeCommune,
  tableauOrganisme,
  IdApiEtablissement
) {
  let contacts = [];
  for (let organisme of tableauOrganisme) {
    if (
      organisme === "Lycée" ||
      organisme === "Collège" ||
      organisme === "Ecole"
    ) {
      contacts.push(await getContactByEtablissement(IdApiEtablissement));
    } else {
      contacts.push(await getContactByOrganisme(codeCommune, organisme));
    }
  }
  return contacts;
}
//test
// async function asyncCall() {
//   const code = await getCommuneById("0120311Y");
//   const contacts = await getContactByOrganisme(code, "mairie");
//   const contactEcole = await getContactByEtablissement("0120311Y");
//   const contactOrganisme = await getOrganismes(
//     "12299",
//     ["mairie", "commissariat_police", "gendarmerie"],
//     "0120311Y"
//   );
//   console.log(contactOrganisme);
// }

// asyncCall();
module.exports = { getOrganismes, getCommuneById };
