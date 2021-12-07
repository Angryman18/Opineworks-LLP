import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
};

const userSlicer = createSlice({
  name: "userSlicer",
  initialState,
  reducers: {
    addItem(state, actions) {
      state.userData.unshift(actions.payload);
      localStorage.setItem("expence", JSON.stringify(state.userData));
    },
    editItem(state, actions) {
      const stateCopy = state.userData;
      const getIndex = stateCopy.findIndex(
        (item) => item.id === actions.payload.id
      );
      const newItem = {
        expenceName: actions.payload.expenceName,
        amount: actions.payload.amount,
        id: actions.payload.id,
      };
      stateCopy[getIndex] = newItem;
      state.userData = stateCopy;
      localStorage.setItem("expence", JSON.stringify(state.userData));
    },
    deleteItem(state, actions) {
      const stateCopy = state.userData
      const newState = stateCopy.filter((item) => {
        return item.id !== actions.payload;
      });
      state.userData = newState
      localStorage.setItem('expence', JSON.stringify(state.userData))
    },
    retrieveItems(state, actions) {
      state.userData = actions.payload;
    },
  },
});

export const userReducer = userSlicer.reducer;

const userActions = userSlicer.actions;
export default userActions;
