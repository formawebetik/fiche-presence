const users = {
    'hassan': 'H@5san45',
    'siddiq': '5iddiq45',
    'kamel': 'K@mel45',
    'formatrice': 'F0rm@trice45'
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    if (users[username] && users[username] === password) {
        document.getElementById('loginForm').classList.add('d-none');
        document.getElementById('attendanceApp').classList.remove('d-none');
        loginError.textContent = '';
        $('#attendanceTable').resizableColumns();
    } else {
        loginError.textContent = 'Identifiant ou mot de passe incorrect';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const initialData = [
        { name: 'Élève 1', phone: '0123456789', email: 'eleve1@example.com' },
        { name: 'Élève 2', phone: '0987654321', email: 'eleve2@example.com' },
    ];

    initialData.forEach(student => addRow(student));

    document.getElementById('tableTitle').addEventListener('input', (event) => {
        document.getElementById('dynamicTitle').text
