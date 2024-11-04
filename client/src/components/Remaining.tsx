import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Budget from "./Budget/Budget";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
  const remaining = budget - totalExpenses;

  const alertType = remaining < 0 ? "alert-danger" : "alert-success";

  useEffect(() => {
    if (remaining < 0) {
      window.alert("Warning: Budget exceeded!");
    }
  }, [remaining]);

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${remaining}</span>
    </div>
  );
};

export default Remaining;
