import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    email: null,
    nom: null,
    prenom: null,
    //tel: null,
    photoURI: null,
    enfants: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.prenom = action.payload.prenom;
      state.value.nom = action.payload.nom;
      state.value.photoURI = action.payload.photoURI;
      //state.value.tel = action.payload.tel;
      state.value.enfants = action.payload.enfants;
    },

    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.prenom = null;
      state.value.nom = null;
      state.value.enfants = [];
      state.value.photoURI = null;
      //state.value.tel = null;
    },

    update: (state, action) => {
      state.value.prenom = action.payload.prenom;
      state.value.nom = action.payload.nom;
      state.value.tel = action.payload.tel;
      state.value.mdp = action.payload.mdp;
    },

    updatePhoto: (state, action) => {
      state.value.photoURI = action.payload;
    },

    addEnfant: (state, action) => {
      state.value.enfants.push(action.payload);
    },
    removeEnfant: (state, action) => {
      state.value.enfants = state.value.enfants.filter(
        (enfant) => enfant._id != action.payload
      );
    },
    updatePrenomEnfant: (state, action) => {
      state.value.enfants = state.value.enfants.map((enfant) => {
        if (enfant._id == action.payload._id) {
          enfant.prenom = action.payload.prenom;
        }
        return enfant;
      });
    },
    updateEtablissementEnfant: (state, action) => {
      state.value.enfants = state.value.enfants.map((enfant) => {
        if (enfant._id == action.payload._id) {
          enfant.etablissement = action.payload.etablissement;
        }
        return enfant;
      });
    },

    updatePhotoEnfant: (state, action) => {
      state.value.enfants = state.value.enfants.map((enfant) => {
        if (enfant._id == action.payload._id) {
          enfant.photURI = action.payload.photoURI;
        }
        return enfant;
      });
    },
  },
});

export const {
  login,
  logout,
  update,
  addEnfant,
  removeEnfant,
  updatePrenomEnfant,
  updateEtablissementEnfant,
  updatePhoto,
  updatePhotoEnfant,
} = userSlice.actions;
export default userSlice.reducer;
