const roleInput = document.getElementById('role');
const joinCodeField = document.getElementById('joinCodeField');

roleInput.addEventListener('change', () => {
    if(roleInput.value !== 'admin') {
        joinCodeField.style.display = 'block';
        joinCodeField.required = true;
    } else {
        joinCodeField.style.display = 'none';
        joinCodeField.required = false;
    }
});