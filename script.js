document.addEventListener('DOMContentLoaded', () => {
    const addExpenseButton = document.getElementById('add-expense');
    const expenseList = document.getElementById('expense-list');
    const filterSelect = document.getElementById('filter');
    const totalDisplay = document.querySelector('.total');

    let expenses = [];

    addExpenseButton.addEventListener('click', addExpense);
    filterSelect.addEventListener('change', filterExpenses);

    function addExpense() {
        const nameInput = document.getElementById('name');
        const amountInput = document.getElementById('amount');
        const categorySelect = document.getElementById('category');
        const dateInput = document.getElementById('date');

        const name = nameInput.value;
        const amount = parseFloat(amountInput.value);
        const category = categorySelect.value;
        const date = dateInput.value;

        if (!name || !amount || !category || !date) {
            alert('Please fill in all fields');
            return;
        }

        const expense = { name, amount, category, date };
        expenses.push(expense);
        nameInput.value = '';
        amountInput.value = '';
        categorySelect.value = '';
        dateInput.value = '';

        renderExpenses();
        updateTotal();
        updateFilterOptions();
    }

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button onclick="editExpense(${index})">Edit</button>
                    <button onclick="deleteExpense(${index})">Delete</button>
                </td>
            `;
            expenseList.appendChild(row);
        });
    }

    function updateTotal() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
    }

    function updateFilterOptions() {
        const categories = ['All', ...new Set(expenses.map(expense => expense.category))];
        filterSelect.innerHTML = categories.map(category => `<option value="${category}">${category}</option>`).join('');
    }

    function filterExpenses() {
        const filter = filterSelect.value;
        const filteredExpenses = filter === 'All' ? expenses : expenses.filter(expense => expense.category === filter);
        renderFilteredExpenses(filteredExpenses);
    }

    function renderFilteredExpenses(filteredExpenses) {
        expenseList.innerHTML = '';
        filteredExpenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button onclick="editExpense(${index})">Edit</button>
                    <button onclick="deleteExpense(${index})">Delete</button>
                </td>
            `;
            expenseList.appendChild(row);
        });
    }

    window.editExpense = function(index) {
        const expense = expenses[index];
        document.getElementById('name').value = expense.name;
        document.getElementById('amount').value = expense.amount;
        document.getElementById('category').value = expense.category;
        document.getElementById('date').value = expense.date;
        deleteExpense(index);
    }

    window.deleteExpense = function(index) {
        expenses.splice(index, 1);
        renderExpenses();
        updateTotal();
        updateFilterOptions();
    }
});
