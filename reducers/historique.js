import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:{
  historique: [],
}
};

const historiqueSlice = createSlice({
  name: "historique",
  initialState,
  reducers: {
    addHistorique: (state, action) => {
      console.log('ACTION',action.payload)
      state.value.historique.push(action.payload);
    },
    removeHistorique: (state, action) => {
      state.value.historique = state.value.historique.filter((item) => item._id != action.payload);
      console.log(action.payload)
    },
    setHistorique: (state, action) => {
      state.value.historique = action.payload;
    },
  },
});

export const { addHistorique, removeHistorique, setHistorique } =
  historiqueSlice.actions;

export default historiqueSlice.reducer;
