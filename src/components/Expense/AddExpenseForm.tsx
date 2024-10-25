import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext"; 
import { Expense } from "../../types/types"; 

const AddExpenseForm = () => {
  const { expenses, setExpenses } = useContext(AppContext);

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newExpense: Expense = {
      id: (expenses.length + 1).toString(), 
      name,
      cost: parseFloat(cost), 
    };

    setExpenses([...expenses, newExpense]);

    setName("");
    setCost("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            type="number"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-4">
            Add Expense
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
