import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    historique: [],
  };
  
  export const historiqueSlice = createSlice({
    name: "historique",
    initialState,
    reducers: {
      addHistorique: (state, action) => {
        state.historique.push(action.payload);
      },
      removeHistorique: (state, action) => {
        state.historique = state.historique.filter(
          item => item._id != action.payload
        );
      },
      setHistorique: (state, action) => {
        state.historique = (action.payload);
      },
    }
  });
  export const {
    addHistorique,
    removeHistorique,
    setHistorique,
  } = historiqueSlice.actions;
  
  export default historiqueSlice.reducer;