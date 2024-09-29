document.getElementById("add-expense").addEventListener("click", function () {
  const expensesContainer = document.getElementById("expenses-container");

  const newExpense = document.createElement("div");
  newExpense.classList.add("expense-item", "flex", "space-x-4", "mb-2");
  newExpense.innerHTML = `
        <input type="text" name="expenseName[]" class="expense-name w-2/3 p-2 border border-gray-300 rounded-md" placeholder="Expense Name">
        <input type="number" name="expenseAmount[]" class="expense w-1/3 p-2 border border-gray-300 rounded-md" placeholder="Amount">
        <button type="button" class="remove-expense bg-red-500 text-white px-4 py-2 rounded-md">Remove</button>
    `;

  expensesContainer.appendChild(newExpense);

  newExpense
    .querySelector(".remove-expense")
    .addEventListener("click", function () {
      newExpense.remove();
    });
});

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
  } else {
    document.getElementById("result").textContent =
      "Please enter valid income and expenses";
  }
});
