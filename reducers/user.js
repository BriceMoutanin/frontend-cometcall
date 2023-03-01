import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, email: null, nom: null, prenom: null },
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
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
