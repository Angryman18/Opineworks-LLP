import Input from "./UI/input";
import Button from "./UI/button";
import Table from "./Components/Table";
import Heading from "./Components/Heading";

import React from "react";
import { useDispatch } from "react-redux";
import { addExpence, retrieveFromLocalStorage } from "./actions/text-slicer";
import { v4 as uuid } from "uuid";

function App() {
  const [expence, setExpence] = React.useState({
    expenceName: "",
    amount: "",
  });
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      expence.expenceName.trim().length === 0 ||
      expence.amount.trim().length === 0
    ) {
      return;
    }
    dispatch(addExpence({ ...expence, id: uuid() }));
    setExpence({
      expenceName: "",
      amount: "",
    });
  };

  React.useEffect(() => {
    dispatch(retrieveFromLocalStorage());
  }, [dispatch]);

  return (
    <div className="text-center mt-10">
      <Heading text="Expence Register" />
      <form
        className="flex flex-col justify-center items-center sm:flex-row"
        onSubmit={submitHandler}
      >
        <Input
          value={expence.expenceName}
          onChange={(e) =>
            setExpence((pre) => ({ ...pre, expenceName: e.target.value }))
          }
          name="expenceName"
          placeholder="Expence name"
          type="text"
        />
        <Input
          value={expence.amount}
          type="number"
          onChange={(e) =>
            setExpence((pre) => ({ ...pre, amount: e.target.value }))
          }
          placeholder="Amount"
        />
        <Button text="Submit" type="submit" />
      </form>
      <Heading className="antialiased text-2xl font-bold text-gray-600" text="List of Expences" />
      <Table />
    </div>
  );
}

export default App;
