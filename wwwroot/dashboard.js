window.onload = loadDashboard;

let chart = null;

async function loadDashboard() {
    try {
        let res = await fetch('/api/transactions');
        let data = await res.json();

        console.log("DATA:", data);

        let income = 0;
        let expense = 0;

        data.forEach(t => {
            if (t.type.toLowerCase() === "income") {
                income += t.amount;
            } else {
                expense += t.amount;
            }
        });

        document.getElementById("income").innerText = income;
        document.getElementById("expense").innerText = expense;
        document.getElementById("balance").innerText = income - expense;

        loadChart(income, expense);

    } catch (err) {
        console.error("ERROR:", err);
    }
}

function loadChart(income, expense) {
    const canvas = document.getElementById("myChart");

    if (!canvas) {
        console.error("Canvas not found");
        return;
    }

    const ctx = canvas.getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Income', 'Expense'],
            datasets: [{
                data: [income || 1, expense || 1],
                backgroundColor: ['#38a169', '#e53e3e']
            }]
        },
        options: {
            responsive: true
        }
    });
}

function goBack() {
    window.location.href = "index.html";
}