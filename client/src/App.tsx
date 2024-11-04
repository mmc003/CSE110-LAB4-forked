import "bootstrap/dist/css/bootstrap.min.css";
import { MyBudgetTracker } from "./views/MyBudgetTracker";
import { AppProvider } from "./context/AppContext"; // Import the context provider

const App = () => {
  return (
    <AppProvider>
      <MyBudgetTracker />
    </AppProvider>
  );
};

export default App;
