const roleInput = document.getElementById('role');
const joinCodeField = document.getElementById('joinCodeField');

joinCodeField.style.display = 'none';

roleInput.addEventListener('change', () => {
    if(roleInput.value !== 'admin') {
        joinCodeField.style.display = 'block';
    } else {
        joinCodeField.style.display = 'none';
    }
});