import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(
  req: Request,
  res: Response,
  expenses: Expense[]
) {
  const { id, cost, description } = req.body;

  if (!description || !id || !cost) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  const newExpense: Expense = {
    id: id,
    description,
    cost,
  };

  expenses.push(newExpense);
  res.status(201).send(newExpense);
}

export function deleteExpense(
  req: Request,
  res: Response,
  expenses: Expense[]
) {
  const { id } = req.params;

  // Find the index of the expense with the given ID
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index !== -1) {
    // Remove the expense from the array
    expenses.splice(index, 1);

    // Send a response indicating successful deletion
    res.status(200).json({ message: "Expense deleted successfully" });
  } else {
    // If no expense with the given ID is found, send a 404 error
    res.status(404).json({ error: "Expense not found" });
  }
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
  res.status(200).send({ data: expenses });
}
