const feedbackFormStateKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

function saveStateToLocalStorage() {
  const { email, message } = form;
  localStorage.setItem(feedbackFormStateKey, JSON.stringify({
    email: email.value.trim(),
    message: message.value.trim(),
  }));
}

function loadStateFromLocalStorage() {
  const savedState = JSON.parse(localStorage.getItem(feedbackFormStateKey) || '{}');
  form.email.value = savedState.email || '';
  form.message.value = savedState.message || '';
}

function isFormValid() {
  const { email, message } = form;
  const emailIsValid = email.checkValidity();
  const messageIsValid = message.checkValidity();
  return emailIsValid && messageIsValid;
}

function handleFormSubmit(event) {
  event.preventDefault();

  // Перевірка, що всі поля коректні
  if (isFormValid()) {
    const savedData = JSON.parse(localStorage.getItem(feedbackFormStateKey) || '{}');
    console.log(savedData);

    localStorage.removeItem(feedbackFormStateKey);
    form.reset();
  } else {
    alert('Please fill in all required fields with valid data.');
  }
}

form.addEventListener('input', saveStateToLocalStorage);
form.addEventListener('submit', handleFormSubmit);

loadStateFromLocalStorage();