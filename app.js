// Transactions Data Array
const transactions = [
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

// Placeholder renderDOM function to be implemented in future tasks
function renderDOM() {
    console.log("renderDOM called with current transactions:", transactions);
}

// Initialize application on DOM load
document.addEventListener("DOMContentLoaded", () => {
    renderDOM();
});
