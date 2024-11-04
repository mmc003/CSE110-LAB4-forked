import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppContext } from "../../context/AppContext";
import Budget from "./Budget";
import { Expense } from "../../types/types";
import { ReactNode, useContext, useEffect } from "react";
import React from "react";

function ExpensesSetter({ expenses }: { expenses: Expense[] }) {
  const { setExpenses } = useContext(AppContext);

  useEffect(() => {
    setExpenses(expenses);
  }, [setExpenses, expenses]);

  return null;
}

const MockProvider = ({ children, initialBudget = 1000 }: { children: ReactNode, initialBudget?: number }) => {
  const [budget, setBudget] = React.useState(initialBudget);
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  return (
    <AppContext.Provider value={{ budget, setBudget, expenses, setExpenses }}>
      {children}
    </AppContext.Provider>
  );
};


describe("View Budget", () => {
  test("renders initial budget value and edit button", () => {
    render(
      <MockProvider>
        <Budget />
      </MockProvider>
    );
    
    expect(screen.getByText("Budget: $1000")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });
});

describe("Edit Budget", () => {

  test("updates budget value when form is submitted", () => {
    render(
      <MockProvider>
        <Budget />
      </MockProvider>
    );
    
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);
    
    const budgetInput = screen.getByRole("spinbutton");
    fireEvent.change(budgetInput, { target: { value: "2000" } });
    
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    
    expect(screen.getByText("Budget: $2000")).toBeInTheDocument();
  });
});

describe("Budget Edge Cases", () => {
  test("handles negative budget values", () => {
    render(
      <MockProvider>
        <Budget />
      </MockProvider>
    );
    
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);
    
    const budgetInput = screen.getByRole("spinbutton");
    fireEvent.change(budgetInput, { target: { value: "-500" } });
    
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    
    expect(screen.getByText("Budget: $-500")).toBeInTheDocument();
  });
});

describe("Maintain Input Value", () => {
  test("maintains input value between edit sessions", () => {
    render(
      <MockProvider initialBudget={1500}>
        <Budget />
      </MockProvider>
    );
    
    fireEvent.click(screen.getByText("Edit"));
    const budgetInput = screen.getByRole("spinbutton");
    fireEvent.change(budgetInput, { target: { value: "2500" } });
    fireEvent.click(screen.getByText("Save"));
    
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByRole("spinbutton")).toHaveValue(2500);
  });
});