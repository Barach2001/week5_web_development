// SpendWise: JavaScript foundation for budget and expense tracking.

// Variables store the application's budget and expense data.
let budgetAmount = 0;
const expenses = [];

// Collect the starting budget and one optional expense using browser prompts.
function collectInitialData() {
  const budgetInput = prompt("Welcome to SpendWise! Enter your monthly budget in KSh:");

  if (budgetInput === null || budgetInput.trim() === "") {
    console.log("No starting budget entered. You can still use the expense form.");
    return;
  }

  const parsedBudget = Number(budgetInput);
  if (Number.isFinite(parsedBudget) && parsedBudget >= 0) {
    budgetAmount = parsedBudget;
  } else {
    alert("Please enter a valid non-negative number for your budget.");
    return collectInitialData();
  }

  const expenseNameInput = prompt("Enter your first expense name (or leave blank to skip):");
  if (expenseNameInput && expenseNameInput.trim() !== "") {
    const expenseAmountInput = prompt("Enter the amount for " + expenseNameInput.trim() + " in KSh:");
    const parsedExpense = Number(expenseAmountInput);

    if (expenseAmountInput !== null && expenseAmountInput.trim() !== "" &&
        Number.isFinite(parsedExpense) && parsedExpense > 0) {
      expenses.push({
        name: expenseNameInput.trim(),
        amount: parsedExpense
      });
    } else if (expenseAmountInput !== null) {
      alert("That expense amount was not valid. You can add it using the form.");
    }
  }
}

// Reusable function: add all expense amounts together.
function calculateTotalExpenses() {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

// Reusable function: subtract expenses from the budget.
function calculateRemainingBalance() {
  return budgetAmount - calculateTotalExpenses();
}

// Format amounts consistently as Kenyan shillings.
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES"
  }).format(amount);
}

// Update the page and print clearly labelled results in the browser console.
function displaySummary() {
  const totalExpenses = calculateTotalExpenses();
  const remainingBalance = calculateRemainingBalance();

  document.getElementById("budgetDisplay").textContent = formatCurrency(budgetAmount);
  document.getElementById("expensesDisplay").textContent = formatCurrency(totalExpenses);
  document.getElementById("balanceDisplay").textContent = formatCurrency(remainingBalance);

  console.clear();
  console.log("===== SpendWise Budget Summary =====");
  console.log("Monthly budget:", formatCurrency(budgetAmount));
  console.log("Total expenses:", formatCurrency(totalExpenses));
  console.log("Remaining balance:", formatCurrency(remainingBalance));
  console.log("Number of expenses:", expenses.length);
  console.log("Expense details:", expenses);
  console.log("====================================");

  renderExpenses();
}

// Show each expense in the Recent Expenses list.
function renderExpenses() {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";

  if (expenses.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-state";
    emptyItem.textContent = "No expenses added yet. Your spending will appear here.";
    expenseList.appendChild(emptyItem);
    return;
  }

  expenses.forEach((expense) => {
    const item = document.createElement("li");
    item.className = "expense-item";

    const details = document.createElement("div");
    const name = document.createElement("strong");
    const label = document.createElement("small");
    name.textContent = expense.name;
    label.textContent = "Expense";
    details.append(name, label);

    const amount = document.createElement("span");
    amount.className = "expense-amount";
    amount.textContent = "-" + formatCurrency(expense.amount);

    item.append(details, amount);
    expenseList.appendChild(item);
  });
}

// Read form input, validate it, save the expense, and recalculate the budget.
function handleExpenseSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById("expenseName");
  const amountInput = document.getElementById("expenseAmount");
  const formMessage = document.getElementById("formMessage");
  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);

  if (!name || !Number.isFinite(amount) || amount <= 0) {
    formMessage.textContent = "Enter an expense name and an amount greater than zero.";
    return;
  }

  expenses.push({ name: name, amount: amount });
  formMessage.textContent = name + " was added successfully.";
  document.getElementById("expenseForm").reset();
  displaySummary();
}

// Run the application after the HTML document has loaded.
function startSpendWise() {
  collectInitialData();
  document.getElementById("expenseForm").addEventListener("submit", handleExpenseSubmit);
  displaySummary();
}

document.addEventListener("DOMContentLoaded", startSpendWise);