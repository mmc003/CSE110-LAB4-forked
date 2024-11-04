import { Request, Response } from "express";
import { budget, expenses } from "./constants";
import { createExpenseEndpoints } from "./expenses/expense-endpoints";
import { getBudget, updateBudget } from "./budget/budget-utils";

const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Root endpoint to get test if the server is running
app.get("/", (req: Request, res: Response) => {
  res.send({ "data": "Hello, TypeScript Express!" });
  res.status(200);
});

createExpenseEndpoints(app, expenses);
app.get("/budget", (req: Request, res: Response) => {
  getBudget(res, budget);
});
app.put("/budget", (req: Request, res: Response) => {
  updateBudget(res, req.body, budget);
});