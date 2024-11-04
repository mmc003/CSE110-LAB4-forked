import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Remaining from './Remaining';
import { AppContext } from '../context/AppContext';

// Mock window.alert
window.alert = jest.fn();

test('budget equals expenses plus remaining', () => {
    const budget = 1000;
    const expenses = [
        { id: "1", description: "Expense 1", cost: 250 },
        { id: "2", description: "Expense 2", cost: 150 }
    ];
    const totalExpenses = 400;
    const remaining = 600;

    // Create mock context value
    const contextValue = {
        budget,
        expenses,
        dispatch: jest.fn(),
        setExpenses: jest.fn(),
        setBudget: jest.fn()
    };

    // Render component with mocked context
    const { container } = render(
        <AppContext.Provider value={contextValue}>
            <Remaining />
        </AppContext.Provider>
    );

    // Get the remaining value from the rendered component
    const remainingValue = Number(container.textContent?.match(/\d+/)?.[0]);

    // Assertions
    expect(remainingValue).toBe(remaining);
    expect(budget).toBe(totalExpenses + remaining);
    const exceededContextValue = {
        budget: 300,
        expenses: [
            { id: "1", description: "Expense 1", cost: 400 }
        ],
        dispatch: jest.fn(),
        setExpenses: jest.fn(),
        setBudget: jest.fn()
    };

    render(
        <AppContext.Provider value={exceededContextValue}>
            <Remaining />
        </AppContext.Provider>
    );

    expect(window.alert).toHaveBeenCalledWith('Warning: Budget exceeded!');
});

test('budget equals remaining plus total expenses', () => {
    const budget = 2000;
    const expenses = [
        { id: "1", description: "Rent", cost: 800 },
        { id: "2", description: "Utilities", cost: 200 },
        { id: "3", description: "Groceries", cost: 400 }
    ];
    
    const contextValue = {
        budget,
        expenses,
        dispatch: jest.fn(),
        setExpenses: jest.fn(),
        setBudget: jest.fn()
    };

    const { container } = render(
        <AppContext.Provider value={contextValue}>
            <Remaining />
        </AppContext.Provider>
    );

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.cost, 0);
    const remainingValue = Number(container.textContent?.match(/\d+/)?.[0]);
    
    expect(budget).toBe(remainingValue + totalExpenses);
    expect(remainingValue).toBe(budget - totalExpenses);
});