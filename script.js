const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const historyContainer = document.getElementById('history');

let history = [];

// Function to calculate expression
function calculate(expr) {
  try {
    return eval(expr);
  } catch (e) {
    return 'Error';
  }
}

// Update display & history
function updateDisplay(value, addToHistory = false) {
  display.value = value;
  if (addToHistory && value !== 'Error') {
    history.unshift(value);
    renderHistory();
  }
}

// Render history panel
function renderHistory() {
  historyContainer.innerHTML = '';
  history.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    div.addEventListener('click', () => display.value = item);
    historyContainer.appendChild(div);
  });
}

// Button click handling
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    if (action === '=') {
      const result = calculate(display.value);
      updateDisplay(result, true);
    } else if (action === 'C') {
      display.value = '';
    } else if (action === 'back') {
      display.value = display.value.slice(0, -1);
    } else {
      display.value += action;
    }
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const allowedKeys = '0123456789+-*/().';
  if (allowedKeys.includes(e.key)) {
    display.value += e.key;
  } else if (e.key === 'Enter') {
    updateDisplay(calculate(display.value), true);
  } else if (e.key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (e.key.toLowerCase() === 'c') {
    display.value = '';
  }
});

// ---------- THEME TOGGLE ----------
const toggleThemeBtn = document.getElementById('toggleTheme');

toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleThemeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});
