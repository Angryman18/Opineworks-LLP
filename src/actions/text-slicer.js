import userActions from "../store/userSlicer";

export const addExpence = (payload) => {
  return (dispatch) => {
    dispatch(userActions.addItem(payload));
  };
};

export const retrieveFromLocalStorage = () => {
  return (dispatch) => {
    const localData = localStorage.getItem("expence") || [];
    if (localData.length === 0) {
      return;
    }
    dispatch(userActions.retrieveItems(JSON.parse(localData)));
  };
};
