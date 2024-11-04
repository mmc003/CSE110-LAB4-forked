import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { deleteExpense } from "../../utils/expense-utils";

const ExpenseItem = ({ id, description, cost }: Expense) => {
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = () => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    deleteExpense(id);
    setExpenses(updatedExpenses);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        {description} - ${cost.toFixed(2)}
      </div>
      <button onClick={handleDeleteExpense}>X</button>
    </li>
  );
};

export default ExpenseItem;
