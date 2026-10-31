window.onload = load;

async function load() {
    let res = await fetch('/api/transactions');
    let data = await res.json();

    let list = document.getElementById("list");
    let balance = 0;

    list.innerHTML = "";

    data.forEach(t => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${t.title} - ₹${t.amount} (${t.type})
            <button onclick="del(${t.id})">Delete</button>
        `;

        list.appendChild(li);

        if (t.type.toLowerCase() === "income") {
            balance += t.amount;
        } else {
            balance -= t.amount;
        }
    });

    document.getElementById("balance").innerText = balance;
}

async function add() {
    let title = document.getElementById("title").value.trim();
    let amount = parseFloat(document.getElementById("amount").value);
    let type = document.getElementById("type").value;

    if (!title || isNaN(amount)) {
        alert("Enter valid data!");
        return;
    }

    await fetch('/api/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, amount, type })
    });

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";

    load();
}

async function del(id) {
    await fetch('/api/delete/' + id, { method: 'DELETE' });
    load();
}

function goDashboard() {
    window.location.href = "dashboard.html";
}