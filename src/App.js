import "./App.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpence, retrieveFromLocalStorage } from "./actions/text-slicer";
import { v4 as uuid } from "uuid";
import userActions from "./store/userSlicer";

function App() {
  const [expence, setExpence] = React.useState({
    expenceName: "",
    amount: "",
  });
  const [Edit, setEdit] = React.useState({
    edit: false,
    editID: "",
  });
  const [editedData, setEditedData] = React.useState({
    expenceName: "",
    amount: "",
  });
  const expenceDetail = useSelector((state) => state.userSlicer.userData);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addExpence({ ...expence, id: uuid() }));
    setExpence({
      expenceName: "",
      amount: "",
    });
  };

  React.useEffect(() => {
    dispatch(retrieveFromLocalStorage());
  }, [dispatch]);

  const edithandler = (e, id) => {
    e.preventDefault();
    const item = expenceDetail.filter((item) => {
      return item.id === id;
    });
    setEditedData({ expenceName: item[0].expenceName, amount: item[0].amount });
    setEdit(() => ({ editID: id, edit: !Edit.edit }));
  };

  const saveEditedFields = (e, id) => {
    e.preventDefault();
    const obj = { ...editedData, id: id };
    dispatch(userActions.editItem(obj));
    setEdit(() => ({ editID: "", edit: false }));
  };

  const deleteHandler = (e, id) => {
    e.preventDefault();
    const surence = window.confirm("Are you sure want to delete this item?");
    if (surence) {
      dispatch(userActions.deleteItem(id));
    }
  };

  return (
    <div className="App" style={{ margin: "2rem" }}>
      <form onSubmit={submitHandler}>
        <input
          value={expence.expenceName}
          onChange={(e) =>
            setExpence((pre) => ({ ...pre, expenceName: e.target.value }))
          }
          name="expenceName"
          placeholder="Expence name"
          type="text"
        />
        <input
          value={expence.amount}
          type="number"
          onChange={(e) =>
            setExpence((pre) => ({ ...pre, amount: e.target.value }))
          }
          placeholder="Amount"
        />
        <button type="submit">Submit</button>
      </form>
      {expenceDetail.length > 0 ? expenceDetail.map((item) => {
        return (
          <div key={item.id}>
            <h4>Expence Name: </h4>
            {item.expenceName}, Amount: {item.amount}
            <button onClick={(e) => edithandler(e, item.id)}>EDIT</button>
            <button onClick={(e) => deleteHandler(e, item.id)}>Delete</button>
            {Edit.edit && Edit.editID === item.id && (
              <form
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <input
                  onChange={(e) =>
                    setEditedData((pre) => ({
                      ...pre,
                      expenceName: e.target.value,
                    }))
                  }
                  value={editedData.expenceName}
                  type="text"
                />
                <input
                  onChange={(e) =>
                    setEditedData((pre) => ({ ...pre, amount: e.target.value }))
                  }
                  value={editedData.amount}
                  type="number"
                />
                <button onClick={(e) => saveEditedFields(e, item.id)}>
                  Save
                </button>
              </form>
            )}
          </div>
        );
      }) : "no item found please add some"}
    </div>
  );
}

export default App;
