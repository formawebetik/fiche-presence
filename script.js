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
        loadPreferences(username);
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

function updateTableTitle() {
    const title = document.getElementById('tableTitle').value;
    document.getElementById('dynamicTitle').textContent = title;
}

function changeTableColor() {
    const color = document.getElementById('colorPicker').value;
    document.getElementById('attendanceTable').style.backgroundColor = color;
    savePreferences();
}

function savePreferences() {
    const username = document.getElementById('username').value;
    const preferences = {
        title: document.getElementById('tableTitle').value,
        color: document.getElementById('colorPicker').value,
        columnWidths: Array.from(document.querySelectorAll('#attendanceTable th')).map(th => th.style.width)
    };
    localStorage.setItem(`preferences_${username}`, JSON.stringify(preferences));
}

function loadPreferences(username) {
    const preferences = JSON.parse(localStorage.getItem(`preferences_${username}`));
    if (preferences) {
        document.getElementById('tableTitle').value = preferences.title;
        document.getElementById('colorPicker').value = preferences.color;
        document.getElementById('dynamicTitle').textContent = preferences.title;
        document.getElementById('attendanceTable').style.backgroundColor = preferences.color;
        const headers = document.querySelectorAll('#attendanceTable th');
        preferences.columnWidths.forEach((width, index) => {
            headers[index].style.width = width;
        });
    }
}

document.querySelectorAll('#attendanceTable th').forEach((th, index) => {
    th.addEventListener('input', () => savePreferences());
});
