// Transactions Data Array
let transactions = [
    {
        id: 1,
        text: "Tamhini Ghat Trek Fuel",
        amount: 500.00,
        type: "expense"
    },
    {
        id: 2,
        text: "Tuition Payment",
        amount: 12000.00,
        type: "income"
    },
    {
        id: 3,
        text: "Hostel Rent",
        amount: 3500.00,
        type: "expense"
    },
    {
        id: 4,
        text: "Freelance Coding project",
        amount: 5000.00,
        type: "income"
    }
];

// Delete transaction by ID
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    renderDOM();
}

// Calculate total income and expense using filter and reduce
function updateTotals() {
    const income = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
        
    const expense = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    return { income, expense };
}

// Dynamic DOM rendering for transactions list and totals
function renderDOM() {
    const listEl = document.getElementById("list");
    const balanceEl = document.getElementById("balance");
    const moneyPlusEl = document.getElementById("money-plus");
    const moneyMinusEl = document.getElementById("money-minus");

    if (!listEl) return;

    // Clear UL
    listEl.innerHTML = "";

    // Map over transactions array and create list items
    transactions.forEach(transaction => {
        const li = document.createElement("li");
        const isIncome = transaction.type === "income";
        li.classList.add(isIncome ? "plus" : "minus");

        const sign = isIncome ? "+" : "-";
        
        li.innerHTML = `
            ${transaction.text}
            <span>${sign}₹${Math.abs(transaction.amount).toFixed(2)}</span>
            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
        `;
        listEl.appendChild(li);
    });

    // Calculate totals using updateTotals()
    const { income, expense } = updateTotals();
    const balance = income - expense;

    // Update values in DOM
    if (balanceEl) {
        const balanceSign = balance < 0 ? "-" : "";
        balanceEl.textContent = `${balanceSign}₹${Math.abs(balance).toFixed(2)}`;
    }
    if (moneyPlusEl) {
        moneyPlusEl.textContent = `+₹${income.toFixed(2)}`;
    }
    if (moneyMinusEl) {
        moneyMinusEl.textContent = `-₹${expense.toFixed(2)}`;
    }
}

// Initialize application on DOM load
document.addEventListener("DOMContentLoaded", () => {
    renderDOM();

    const form = document.getElementById("form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const textInput = document.getElementById("text");
            const amountInput = document.getElementById("amount");
            const typeInput = document.getElementById("type");

            if (!textInput || !amountInput || !typeInput) return;

            const text = textInput.value.trim();
            const amount = parseFloat(amountInput.value);
            const type = typeInput.value;

            if (text === "" || isNaN(amount) || type === "") return;

            const newTransaction = {
                id: Date.now(),
                text: text,
                amount: amount,
                type: type
            };

            transactions.push(newTransaction);
            renderDOM();

            // Clear the form inputs after
            form.reset();
        });
    }
});

