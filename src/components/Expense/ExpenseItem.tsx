import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

const ExpenseItem = ({ id, name, cost }: Expense) => {
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = () => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        {name} - ${cost.toFixed(2)}
      </div>
      <button onClick={handleDeleteExpense}>X</button>
    </li>
  );
};

export default ExpenseItem;
