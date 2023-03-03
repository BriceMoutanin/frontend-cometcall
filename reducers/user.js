import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, email: null, nom: null, prenom: null , enfants:[]},
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
    },

    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.prenom = null;
      state.value.nom = null;
    },

    update: (state, action) => {
      
      state.value.prenom = action.payload.prenom;
      state.value.nom = action.payload.nom;
      state.value.tel = action.payload.tel;
    },
    saveEnfant: (state, action) => {
      state.value.enfants.push(action.payload);
    }
  },
});

export const { login, logout,update,saveEnfant } = userSlice.actions;
export default userSlice.reducer;
