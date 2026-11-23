# SpendWise — Personal Budget & Expense Tracker

SpendWise is a beginner-friendly personal budgeting application. It lets a user enter a monthly budget, record expenses, and view the total spent and remaining balance in the browser.

## Project files

- `index.html` — page structure, summary cards, and expense form.
- `style.css` — responsive layout, colours, typography, and component styling.
- `script.js` — budget data, prompts, calculations, reusable functions, and page updates.

## JavaScript concepts implemented

### Variables and data types

- `let budgetAmount = 0` stores the user's monthly budget. It uses `let` because the value can be updated.
- `const expenses = []` stores expense objects. The array can receive new entries while its variable reference stays constant.
- Each expense is an object with a string `name` and a numeric `amount`.
- Other variables store prompt values, converted numbers, totals, and references to HTML elements.

### How user input is collected

When the page loads, JavaScript uses `prompt()` to ask for a monthly budget and optionally one starting expense. The expense form also collects an expense name and amount. The form's submit event is handled in JavaScript, so the page does not reload when an expense is added.

### How calculations are performed

The `calculateTotalExpenses()` function uses `reduce()` to add all expense amounts. The `calculateRemainingBalance()` function subtracts the total expenses from the monthly budget:

```js
remainingBalance = budgetAmount - totalExpenses;
```

Amounts are displayed as Kenyan shillings (KES). Input values are converted to numbers and checked before being stored.

### How functions organize the code

- `collectInitialData()` asks for the starting budget and optional first expense.
- `calculateTotalExpenses()` calculates the total amount spent.
- `calculateRemainingBalance()` calculates the money remaining.
- `formatCurrency()` formats numbers as KES.
- `displaySummary()` updates the summary cards and prints labelled results in the browser console.
- `renderExpenses()` displays the saved expenses on the page.
- `handleExpenseSubmit()` validates and processes new form entries.
- `startSpendWise()` starts the application and connects the form event listener.

## How to run the project

1. Open the repository on GitHub and download the project, or clone it:
   ```bash
   git clone https://github.com/Barach2001/week5_web_development.git
   ```
2. Open the project folder.
3. Open `index.html` in a modern web browser.
4. Enter a monthly budget in the prompt. You can also enter one starting expense or skip it.
5. Add more expenses using the form.
6. Open the browser developer tools and select **Console** to see the labelled budget calculations.

## Testing checklist

- Enter a valid monthly budget.
- Skip the optional first expense.
- Add an expense with a valid name and positive amount.
- Try leaving the name blank or entering an invalid amount.
- Add several expenses and confirm the total and remaining balance update.
- Check the browser console for the labelled summary.

## Notes

This is a learning project. Data is held in JavaScript memory and is not saved to a database or retained after the page is refreshed. The project does not collect or transmit financial information.
