import React from "react";
import Button from "../UI/button";
import Input from "../UI/input";
import { useSelector, useDispatch } from "react-redux";
import userActions from "../store/userSlicer";

const TableData = ({ expenceName, amount, id, serial }) => {
  const [Edit, setEdit] = React.useState({
    edit: false,
    editID: "",
    editedData: { expenceName: "", amount: "" },
  });
  const dispatch = useDispatch();
  const expenceDetail = useSelector((state) => state.userSlicer.userData);
  const editHandler = (e, id) => {
    e.preventDefault();
    setEdit(!Edit);
    const item = expenceDetail.filter((item) => {
      return item.id === id;
    });
    setEdit({
      editID: id,
      edit: !Edit.edit,
      editedData: { expenceName: item[0].expenceName, amount: item[0].amount },
    });
  };

  const deleteHandler = (e, id) => {
    e.preventDefault();
    const surence = window.confirm("Are you sure want to delete this item?");
    if (surence) {
      dispatch(userActions.deleteItem(id));
    }
  };

  const saveEditedData = (e, id) => {
    e.preventDefault();
    const { editedData } = Edit;
    if (
      editedData.expenceName.trim().length === 0 ||
      editedData.amount.trim().length === 0
    ) {
      return;
    }
    const obj = { ...Edit.editedData, id: id };
    dispatch(userActions.editItem(obj));
    setEdit({ edit: false, editID: "", editedData: {} });
  };
  return (
    <>
      <tbody className="text-sm border-b border-gray-300 md:text-base text-left">
        <tr className="h-14">
          <td className="w-10 text-center">{serial}</td>
          <td className="p-2">{expenceName}</td>
          <td className="p-2">₹{amount}</td>
          <td className="p-2">
            {!Edit.edit && (
              <>
                <Button
                  className="m-1 text-sm bg-blue-600 px-3 py-1 text-white rounded-md hover:bg-blue-900"
                  text="Edit"
                  onClick={(e) => editHandler(e, id)}
                ></Button>
                <Button
                  className="m-1 text-sm bg-red-700 px-3 py-1 text-white rounded-md hover:bg-blue-900"
                  text="Delete"
                  onClick={(e) => deleteHandler(e, id)}
                ></Button>
              </>
            )}
          </td>
        </tr>
        {Edit.edit && Edit.editID === id && (
          <tr className="text-center">
            <td colSpan="4">
              <Input
                type="text"
                onChange={(e) =>
                  setEdit((pre) => ({
                    ...pre,
                    editedData: {
                      ...pre.editedData,
                      expenceName: e.target.value,
                    },
                  }))
                }
                value={Edit.editedData.expenceName}
              />
              <Input
                step="0.1"
                type="number"
                onChange={(e) =>
                  setEdit((pre) => ({
                    ...pre,
                    editedData: {
                      ...pre.editedData,
                      amount: e.target.value,
                    },
                  }))
                }
                value={Edit.editedData.amount}
              />
              <div className="block mx-auto my-2">
                <Button
                  onClick={(e) => saveEditedData(e, id)}
                  className="m-1 text-sm border-2 border-transparent bg-green-600 px-3 py-1 text-white rounded-md hover:bg-green-700"
                  text="Save"
                />
                <Button
                  onClick={(e) => setEdit((pre) => ({ ...pre, edit: false }))}
                  className="m-1 text-sm border-2 border-blue-600 text-blue bg-gray-100 px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white"
                  text="Cancel"
                />
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default TableData;
