import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { AppContext } from "../../context/AppContext";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseTotal from "./ExpenseTotal";
import { Expense } from "../../types/types";

// Mock context wrapper component
import { ReactNode } from "react";

const MockProvider = ({ children, initialExpenses = [], initialBudget = 2000 }: { children: ReactNode, initialExpenses?: any[], initialBudget?: number }) => {
  const [expenses, setExpenses] = React.useState(initialExpenses);
  const [budget, setBudget] = React.useState(initialBudget);
  
  return (
    <AppContext.Provider value={{ expenses, setExpenses, budget, setBudget }}>
      {children}
    </AppContext.Provider>
  );
};

// Component wrapper that includes all necessary expense components
const ExpenseManager = () => {
  return (
    <>
      <AddExpenseForm />
      <ExpenseList />
      <ExpenseTotal />
    </>
  );
};

describe("Create Expense", () => {
  test("adds a new expense to the list", () => {
    render(
      <MockProvider>
        <ExpenseManager />
      </MockProvider>
    );

    // Fill out the expense form
    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const submitButton = screen.getByText("Add Expense");

    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "50" } });
    fireEvent.click(submitButton);

    // Verify expense is added to the list
    expect(screen.getByText("Groceries - $50.00")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $50")).toBeInTheDocument();
  });

  test("adds multiple expenses and updates total", () => {
    render(
      <MockProvider>
        <ExpenseManager />
      </MockProvider>
    );

    // Add first expense
    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const submitButton = screen.getByText("Add Expense");

    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "50" } });
    fireEvent.click(submitButton);

    // Add second expense
    fireEvent.change(nameInput, { target: { value: "Gas" } });
    fireEvent.change(costInput, { target: { value: "30" } });
    fireEvent.click(submitButton);

    // Verify both expenses are in the list
    expect(screen.getByText("Groceries - $50.00")).toBeInTheDocument();
    expect(screen.getByText("Gas - $30.00")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $80")).toBeInTheDocument();
  });
});

describe("Delete Expense", () => {
  const initialExpenses = [
    { id: "1", name: "Groceries", cost: 50 },
    { id: "2", name: "Gas", cost: 30 }
  ];

  test("removes an expense from the list", () => {
    render(
      <MockProvider initialExpenses={initialExpenses}>
        <ExpenseManager />
      </MockProvider>
    );

    // Get all delete buttons
    const deleteButtons = screen.getAllByText("X");
    
    // Delete first expense
    fireEvent.click(deleteButtons[0]);

    // Verify expense is removed
    expect(screen.queryByText("Groceries - $50.00")).not.toBeInTheDocument();
    expect(screen.getByText("Gas - $30.00")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $30")).toBeInTheDocument();
  });

  test("maintains remaining expenses after deletion", () => {
    const moreExpenses = [
      { id: "1", name: "Groceries", cost: 50 },
      { id: "2", name: "Gas", cost: 30 },
      { id: "3", name: "Rent", cost: 1000 }
    ];

    render(
      <MockProvider initialExpenses={moreExpenses}>
        <ExpenseManager />
      </MockProvider>
    );

    // Delete middle expense
    const deleteButtons = screen.getAllByText("X");
    fireEvent.click(deleteButtons[1]);

    // Verify correct expenses remain
    expect(screen.getByText("Groceries - $50.00")).toBeInTheDocument();
    expect(screen.queryByText("Gas - $30.00")).not.toBeInTheDocument();
    expect(screen.getByText("Rent - $1000.00")).toBeInTheDocument();
    expect(screen.getByText("Spent so far: $1050")).toBeInTheDocument();
  });
});