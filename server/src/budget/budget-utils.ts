import { Response } from "express";

// Function to get the budget
export function getBudget(res: Response, budget: { amount: number }) {
  res.status(200).send({ data: budget.amount });
}

// Function to update the budget
export function updateBudget(
  res: Response,
  body: any,
  budget: { amount: number }
) {
    if (typeof body.amount === 'number' && body.amount >= 0) {
      budget.amount = body.amount;
      res.status(200).send({ data: budget.amount });
    } else {
      res.status(400).send({ error: 'Invalid budget amount' });
    }
}
