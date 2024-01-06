const feedbackFormStateKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

// Функція для збереження стану у локальне сховище
function saveStateToLocalStorage() {
  const { email, message } = form;
  localStorage.setItem(feedbackFormStateKey, JSON.stringify({
    email: email.value.trim(),
    message: message.value.trim(),
  }));
}

// Функція для завантаження збереженого стану з локального сховища
function loadStateFromLocalStorage() {
  const savedState = JSON.parse(localStorage.getItem(feedbackFormStateKey) || '{}');
  form.email.value = savedState.email || '';  // Якщо savedState.email === undefined, тоді використовується пустий рядок
  form.message.value = savedState.message || '';
}

// Функція для обробки події submit форми
function handleFormSubmit(event) {
  event.preventDefault();

  const savedData = JSON.parse(localStorage.getItem(feedbackFormStateKey) || '{}');
  console.log(savedData);

  localStorage.removeItem(feedbackFormStateKey);
  form.reset();
}

// Додавання слухачів подій до форми
form.addEventListener('input', saveStateToLocalStorage);
form.addEventListener('submit', handleFormSubmit);

// Завантаження стану з локального сховища при завантаженні сторінки
loadStateFromLocalStorage();