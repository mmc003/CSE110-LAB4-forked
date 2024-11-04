import { useContext, useState , useEffect} from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  useEffect(() => {
    loadBudget();
  }, []);

  const loadBudget = async () => {
    try {
      const fetchedBudget = await fetchBudget();
      setBudget(fetchedBudget);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    setBudget(newBudget); 
    setIsEditing(false);
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <form onSubmit={handleSaveClick}>
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(Number(e.target.value))}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <span>Budget: ${budget}</span>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Budget;
