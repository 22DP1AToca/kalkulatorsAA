let history = JSON.parse(localStorage.getItem('history')) || [];

document.addEventListener('DOMContentLoaded', function() {
    renderHistory();
});

// Funkcija, lai pievienotu vērtības displejam
function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

// Funkcija, lai izdzēstu displeju
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Funkcija, kas veic aprēķinu
function calculate() {
    const display = document.getElementById('display');
    try {
        const result = eval(display.value);
        const expression = display.value;
        display.value = result;
        addHistory(expression, result);
    } catch (e) {
        display.value = 'Kļūda';
    }
}

// Funkcija, kas pievieno aprēķinu vēsturei
function addHistory(expression, result) {
    history.push(expression + '=' + result);
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
}

// Funkcija, kas renderē vēsturi
function renderHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${entry} <button onclick="deleteHistory(${index})">Dzēst</button>`;
        historyList.appendChild(li);
    });
}

// Funkcija, lai dzēstu vēsturi
function clearHistory() {
    history = [];
    localStorage.removeItem('history');
    renderHistory();
}

// Funkcija, lai dzēstu konkrētu ierakstu no vēstures
function deleteHistory(index) {
    history.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
}
