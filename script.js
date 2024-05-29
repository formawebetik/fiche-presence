const users = {
    'hassan': 'password725',
    'siddiq': 'password456',
    'kamel': 'password789',
    'Formatrice': 'password546'
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    if (users[username] && users[username] === password) {
        document.getElementById('loginForm').classList.add('d-none');
        document.getElementById('attendanceApp').classList.remove('d-none');
        loginError.textContent = '';
    } else {
        loginError.textContent = 'Identifiant ou mot de passe incorrect';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Example data to initialize
    const initialData = [
        { name: 'Élève 1', phone: '0123456789', email: 'eleve1@example.com' },
        { name: 'Élève 2', phone: '0987654321', email: 'eleve2@example.com' },
    ];

    initialData.forEach(student => addRow(student));
});

function addRow(student = { name: '', phone: '', email: '' }) {
    const table = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const phoneCell = newRow.insertCell(1);
    const emailCell = newRow.insertCell(2);
    nameCell.innerHTML = `<input type="text" class="form-control" value="${student.name}">`;
    phoneCell.innerHTML = `<input type="text" class="form-control" value="${student.phone}">`;
    emailCell.innerHTML = `<input type="text" class="form-control" value="${student.email}">`;

    for (let i = 3; i < 11; i++) {
        const cell = newRow.insertCell(i);
        cell.innerHTML = `
            <select class="form-control select-presence">
                <option value="Présent">Présent</option>
                <option value="Absent">Absent</option>
            </select>
        `;
    }
}
