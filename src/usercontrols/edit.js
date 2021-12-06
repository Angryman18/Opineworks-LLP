import React from "react";

const EditForm = () => {
  const [Edit, setEdit] = React.useState({
    edit: false,
    editID: "",
  });
  const [editData, setEditData] = React.useState({
    expenceName: "",
    amount: "",
  });

  const edithandler = (e, id) => {
    e.preventDefault();
    const item = expenceDetail.filter((item) => {
      return item.id === id;
    });
    setEditData({ expenceName: item[0].expenceName, amount: item[0].amount });
    setEdit(() => ({ editID: id, edit: !Edit.edit }));
  };

  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <input value={editData.expenceName} type="text" />
      <input value={editData.amount} type="number" />
      <button>Save</button>
    </form>
  );
};

export default EditForm;
