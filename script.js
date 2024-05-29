const users = {
    'hassan': {password: 'password123', role: 'admin'},
    'siddiq': {password: 'password456', role: 'user'},
    'kamel': {password: 'password789', role: 'user'},
    'formatrice': {password: 'password111', role: 'formatrice'}
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    if (users[username] && users[username].password === password) {
        document.getElementById('loginForm').classList.add('d-none');
        showUserInterface(users[username].role, username);
        loginError.textContent = '';
        loadPreferences(username);
    } else {
        loginError.textContent = 'Identifiant ou mot de passe incorrect';
    }
}

function logout() {
    document.getElementById('loginForm').classList.remove('d-none');
    document.getElementById('adminApp').classList.add('d-none');
    document.getElementById('restrictedApp').classList.add('d-none');
    document.getElementById('formatriceApp').classList.add('d-none');
}

function showUserInterface(role, username) {
    if (role === 'admin') {
        document.getElementById('adminApp').classList.remove('d-none');
        addDaysColumns('admin');
    } else if (role === 'user') {
        document.getElementById('restrictedApp').classList.remove('d-none');
        document.getElementById('restrictedUserName').textContent = username.toUpperCase();
        addDaysColumns('restricted');
    } else if (role === 'formatrice') {
        document.getElementById('formatriceApp').classList.remove('d-none');
        addDaysColumns('formatrice');
    }
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        login();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const initialData = [
        { name: 'Élève 1', phone: '0123456789', email: 'eleve1@example.com', infopreneur: 'HASSAN' },
        { name: 'Élève 2', phone: '0987654321', email: 'eleve2@example.com', infopreneur: 'SIDDIQ' },
    ];

    initialData.forEach(student => addRow(student, 'admin'));
    initialData.forEach(student => addRow(student, 'formatrice'));
    initialData.forEach(student => addRow(student, 'restricted'));
});

function addRow(student = { name: '', phone: '', email: '', infopreneur: '' }, type) {
    const tableId = type === 'admin' ? 'attendanceTable' : type === 'formatrice' ? 'formatriceTable' : 'restrictedTable';
    const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const phoneCell = newRow.insertCell(1);
    const emailCell = newRow.insertCell(2);
    const infopreneurCell = newRow.insertCell(3);

    nameCell.innerHTML = `<input type="text" class="form-control" value="${student.name}" ${type === 'restricted' ? 'readonly' : ''}>`;
    phoneCell.innerHTML = `<input type="text" class="form-control" value="${student.phone}" ${type === 'restricted' ? 'readonly' : ''}>`;
    emailCell.innerHTML = `<input type="text" class="form-control" value="${student.email}" ${type === 'restricted' ? 'readonly' : ''}>`;
    infopreneurCell.innerHTML = `
        <select class="form-control" ${type === 'restricted' ? 'disabled' : ''}>
            <option value="HASSAN" ${student.infopreneur === 'HASSAN' ? 'selected' : ''}>HASSAN</option>
            <option value="SIDDIQ" ${student.infopreneur === 'SIDDIQ' ? 'selected' : ''}>SIDDIQ</option>
            <option value="KAMEL" ${student.infopreneur === 'KAMEL' ? 'selected' : ''}>KAMEL</option>
        </select>`;

    addDaysCells(newRow, type);
}

function addDaysCells(row, type) {
    const actionsCol = type === 'admin' ? document.getElementById('actionsCol') : type === 'restricted' ? document.getElementById('actionsColRestricted') : document.getElementById('actionsColForm');
    const daysCount = actionsCol.children.length - 1; // -1 to exclude the "+" button
    for (let i = 0; i < daysCount; i++) {
        const cell = row.insertCell();
        cell.innerHTML = `
            <select class="form-control select-presence" ${type === 'restricted' ? 'disabled' : ''}>
                <option value="Présent">Présent</option>
                <option value="Absent">Absent</option>
                <option value="Retard">Retard</option>
            </select>`;
    }
}

function addDaysColumns(type) {
    const tableId = type === 'admin' ? 'attendanceTable' : type === 'restricted' ? 'restrictedTable' : 'formatriceTable';
    const table = document.getElementById(tableId);
    const headerRow = table.querySelector('thead tr');
    const actionsCol = type === 'admin' ? document.getElementById('actionsCol') : type === 'restricted' ? document.getElementById('actionsColRestricted') : document.getElementById('actionsColForm');

    for (let i = 1; i <= 8; i++) {
        const th = document.createElement('th');
        th.style.minWidth = '150px';
        th.innerHTML = `Jour ${i} <button onclick="removeColumn(this)" class="btn btn-sm btn-danger">-</button>`;
        headerRow.appendChild(th);
    }

    const addColButton = document.createElement('button');
    addColButton.textContent = '+';
    addColButton.className = 'btn btn-sm btn-add-column';
    addColButton.onclick = () => addColumn();
    actionsCol.appendChild(addColButton);
}

function removeRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function addColumn() {
    const tables = ['attendanceTable', 'formatriceTable', 'restrictedTable'];
    tables.forEach(tableId => {
        const table = document.getElementById(tableId);
        const headers = table.querySelector('thead tr');
        if (headers.cells.length < 14) {
            const headerCell = document.createElement('th');
            headerCell.style.minWidth = '150px';
            headerCell.innerHTML = `Jour ${headers.cells.length - 3} <button onclick="removeColumn(this)" class="btn btn-sm btn-danger">-</button>`;
            headers.appendChild(headerCell);

            const rows = table.querySelector('tbody').rows;
            for (let row of rows) {
                const cell = row.insertCell();
                cell.innerHTML = `
                    <select class="form-control select-presence">
                        <option value="Présent">Présent</option>
                        <option value="Absent">Absent</option>
                        <option value="Retard">Retard</option>
                    </select>
                `;
            }
        }
    });
}

function removeColumn(button) {
    const index = button.parentNode.cellIndex;
    const tables = ['attendanceTable', 'formatriceTable', 'restrictedTable'];
    tables.forEach(tableId => {
        const table = document.getElementById(tableId);
        const headers = table.querySelector('thead tr');
        headers.deleteCell(index);

        const rows = table.querySelector('tbody').rows;
        for (let row of rows) {
            row.deleteCell(index);
        }
    });
    reorderDaysColumns();
}

function reorderDaysColumns() {
    const tables = ['attendanceTable', 'formatriceTable', 'restrictedTable'];
    tables.forEach(tableId => {
        const table = document.getElementById(tableId);
        const headerRow = table.querySelector('thead tr');
        const dayHeaders = Array.from(headerRow.children).slice(5, -1); // exclude fixed columns and "+" button

        dayHeaders.forEach((th, index) => {
            th.innerHTML = `Jour ${index + 1} <button onclick="removeColumn(this)" class="btn btn-sm btn-danger">-</button>`;
        });
    });
}

function changeTableColor() {
    const color = document.getElementById('colorPicker').value;
    const tables = ['attendanceTable', 'formatriceTable', 'restrictedTable'];
    tables.forEach(tableId => {
        document.getElementById(tableId).style.backgroundColor = color;
    });
    savePreferences();
}

function savePreferences() {
    const username = document.getElementById('username').value;
    const preferences = {
        color: document.getElementById('colorPicker').value,
        columnWidths: Array.from(document.querySelectorAll('#attendanceTable th')).map(th => th.style.width)
    };
    localStorage.setItem(`preferences_${username}`, JSON.stringify(preferences));
}

function loadPreferences(username) {
    const preferences = JSON.parse(localStorage.getItem(`preferences_${username}`));
    if (preferences) {
        document.getElementById('colorPicker').value = preferences.color;
        const tables = ['attendanceTable', 'formatriceTable', 'restrictedTable'];
        tables.forEach(tableId => {
            const headers = document.querySelectorAll(`#${tableId} th`);
            preferences.columnWidths.forEach((width, index) => {
                headers[index].style.width = width;
            });
        });
        changeTableColor();
    }
}

function filterTable() {
    const filterValue = document.getElementById('filterInfopreneur').value;
    const table = document.getElementById('restrictedTable').getElementsByTagName('tbody')[0];
    for (let row of table.rows) {
        const infopreneurCell = row.cells[3].querySelector('select').value;
        if (filterValue === 'all' || infopreneurCell.includes(filterValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

function updateTableTitle() {
    const title = document.getElementById('tableTitle').value;
    document.getElementById('dynamicTitle').textContent = title;
}

function updateTableTitleForm() {
    const title = document.getElementById('tableTitleForm').value;
    document.getElementById('dynamicTitleForm').textContent = title;
}

function toggleMode() {
    const body = document.body;
    if (body.classList.contains('day-mode')) {
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
    } else {
        body.classList.remove('night-mode');
        body.classList.add('day-mode');
    }
}
