// Function to save income and expenses to localStorage
function saveData() {
  const income = document.getElementById("income").value;
  const expenseNames = document.querySelectorAll(".expense-name");
  const expenseAmounts = document.querySelectorAll(".expense");

  const expenses = [];
  expenseNames.forEach((nameInput, index) => {
    const amountInput = expenseAmounts[index];
    expenses.push({
      name: nameInput.value,
      amount: amountInput.value,
    });
  });

  localStorage.setItem("income", income);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Function to load data from localStorage
function loadData() {
  const savedIncome = localStorage.getItem("income");
  const savedExpenses = localStorage.getItem("expenses");

  if (savedIncome) {
    document.getElementById("income").value = savedIncome;
  }

  if (savedExpenses) {
    const expenses = JSON.parse(savedExpenses);
    const expensesContainer = document.getElementById("expenses-container");

    // Clear any existing expense inputs
    expensesContainer.innerHTML = "";

    expenses.forEach((expense) => {
      const newExpense = document.createElement("div");
      newExpense.classList.add("expense-item", "flex", "space-x-4", "mb-2");
      newExpense.innerHTML = `
                <input type="text" name="expenseName[]" class="expense-name w-2/3 p-2 border border-gray-600 rounded-md bg-gray-700 text-white" placeholder="Expense Name" value="${expense.name}">
                <input type="number" name="expenseAmount[]" class="expense w-1/3 p-2 border border-gray-600 rounded-md bg-gray-700 text-white" placeholder="Amount" step="0.01" value="${expense.amount}">
                <button type="button" class="remove-expense bg-red-500 text-white px-4 py-2 rounded-md">Remove</button>
            `;

      expensesContainer.appendChild(newExpense);

      newExpense
        .querySelector(".remove-expense")
        .addEventListener("click", function () {
          newExpense.remove();
          saveData(); // Save the updated data after removing an expense
        });
    });
  }
}

// Add expense button logic
document.getElementById("add-expense").addEventListener("click", function () {
  const expensesContainer = document.getElementById("expenses-container");

  const newExpense = document.createElement("div");
  newExpense.classList.add("expense-item", "flex", "space-x-4", "mb-2");
  newExpense.innerHTML = `
            <input type="text" name="expenseName[]" class="expense-name w-2/3 p-2 border border-gray-300 rounded-md" placeholder="Expense Name">
            <input type="number" name="expenseAmount[]" class="expense w-1/3 p-2 border border-gray-300 rounded-md" placeholder="Amount" step="0.01">
            <button type="button" class="remove-expense bg-red-500 text-white px-4 py-2 rounded-md">Remove</button>
        `;

  expensesContainer.appendChild(newExpense);

  newExpense
    .querySelector(".remove-expense")
    .addEventListener("click", function () {
      newExpense.remove();
      saveData(); // Save the updated data after removing an expense
    });

  saveData(); // Save data whenever a new expense is added
});

// Form submission logic
document.getElementById("calc-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const income = parseFloat(document.getElementById("income").value);
  const expenseInputs = document.querySelectorAll(".expense");

  let totalExpenses = 0;

  expenseInputs.forEach((expenseInput) => {
    const expenseValue = parseFloat(expenseInput.value);
    if (!isNaN(expenseValue)) {
      totalExpenses += expenseValue;
    }
  });

  if (!isNaN(income)) {
    const remaining = income - totalExpenses;
    document.getElementById("result").textContent = `$${remaining.toFixed(2)}`;
    saveData(); // Save the updated income and expenses to localStorage
  } else {
    document.getElementById("result").textContent =
      "Please enter valid income and expenses";
  }
});

// Load saved data when the page loads
window.addEventListener("load", loadData);
