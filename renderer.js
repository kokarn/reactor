const mainForm = document.querySelector('form');

mainForm.addEventListener('submit', (event) => {
    event.preventDefault();   // stop the form from submitting
    window.electronAPI.setUid(document.querySelector('[name="uid"]').value);
});