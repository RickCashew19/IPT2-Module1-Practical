// ========================================
// Data Management
// ========================================

// Initialize or retrieve data from localStorage
function initializeData() {
    if (!localStorage.getItem('subjects')) {
        localStorage.setItem('subjects', JSON.stringify([]));
    }
    if (!localStorage.getItem('students')) {
        localStorage.setItem('students', JSON.stringify([]));
    }
}

// Get all subjects
function getSubjects() {
    return JSON.parse(localStorage.getItem('subjects')) || [];
}

// Get all students
function getStudents() {
    return JSON.parse(localStorage.getItem('students')) || [];
}

// Save subjects to localStorage
function saveSubjects(subjects) {
    localStorage.setItem('subjects', JSON.stringify(subjects));
}

// Save students to localStorage
function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

// ========================================
// Subject Management
// ========================================

// Add a new subject
function addSubject() {
    const subjectCode = document.getElementById('subjectCode').value.trim();
    const subjectName = document.getElementById('subjectName').value.trim();
    const units = document.getElementById('units').value.trim();

    // Validation
    if (!subjectCode || !subjectName || !units) {
        alert('Please fill in all fields');
        return;
    }

    // Check if subject code already exists
    const subjects = getSubjects();
    if (subjects.some(s => s.code === subjectCode)) {
        alert('Subject code already exists');
        return;
    }

    // Create new subject object
    const newSubject = {
        id: Date.now(),
        code: subjectCode,
        name: subjectName,
        units: parseInt(units)
    };

    // Add to array and save
    subjects.push(newSubject);
    saveSubjects(subjects);

    // Clear form
    clearSubjectForm();

    // Refresh table
    displaySubjects();
}

// Delete a subject
function deleteSubject(id) {
    if (confirm('Are you sure you want to delete this subject?')) {
        let subjects = getSubjects();
        subjects = subjects.filter(s => s.id !== id);
        saveSubjects(subjects);
        displaySubjects();
    }
}

// Edit a subject
function editSubject(id) {
    const subjects = getSubjects();
    const subject = subjects.find(s => s.id === id);

    if (subject) {
        document.getElementById('subjectCode').value = subject.code;
        document.getElementById('subjectName').value = subject.name;
        document.getElementById('units').value = subject.units;

        // Change button to Update
        const addBtn = document.getElementById('addSubject');
        addBtn.textContent = 'Update Subject';
        addBtn.onclick = function() {
            updateSubject(id);
        };

        // Scroll to form
        document.querySelector('form').scrollIntoView({ behavior: 'smooth' });
    }
}

// Update a subject
function updateSubject(id) {
    const subjectCode = document.getElementById('subjectCode').value.trim();
    const subjectName = document.getElementById('subjectName').value.trim();
    const units = document.getElementById('units').value.trim();

    if (!subjectCode || !subjectName || !units) {
        alert('Please fill in all fields');
        return;
    }

    let subjects = getSubjects();
    const subjectIndex = subjects.findIndex(s => s.id === id);

    if (subjectIndex !== -1) {
        subjects[subjectIndex] = {
            id: id,
            code: subjectCode,
            name: subjectName,
            units: parseInt(units)
        };
        saveSubjects(subjects);
        clearSubjectForm();
        resetSubjectButton();
        displaySubjects();
    }
}

// Clear subject form
function clearSubjectForm() {
    document.getElementById('subjectCode').value = '';
    document.getElementById('subjectName').value = '';
    document.getElementById('units').value = '';
}

// Reset subject button to Add mode
function resetSubjectButton() {
    const addBtn = document.getElementById('addSubject');
    addBtn.textContent = 'Add Subject';
    addBtn.onclick = addSubject;
}

// Display subjects in table
function displaySubjects() {
    const subjects = getSubjects();
    const tableBody = document.getElementById('table-content');

    if (!tableBody) return;

    tableBody.innerHTML = '';

    subjects.forEach(subject => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.code}</td>
            <td>${subject.name}</td>
            <td>${subject.units}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editSubject(${subject.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteSubject(${subject.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// ========================================
// Student Management
// ========================================

// Add a new student
function addStudent() {
    const idNumber = document.getElementById('idNumber').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const middleName = document.getElementById('middleName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();

    // Validation
    if (!idNumber || !firstName || !lastName) {
        alert('Please fill in all required fields (ID Number, First Name, Last Name)');
        return;
    }

    // Check if ID already exists
    const students = getStudents();
    if (students.some(s => s.id === idNumber)) {
        alert('Student ID already exists');
        return;
    }

    // Create new student object
    const newStudent = {
        id: idNumber,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        timestamp: Date.now()
    };

    // Add to array and save
    students.push(newStudent);
    saveStudents(students);

    // Clear form
    clearStudentForm();

    // Refresh table
    displayStudents();
}

// Delete a student
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        let students = getStudents();
        students = students.filter(s => s.id !== id);
        saveStudents(students);
        displayStudents();
    }
}

// Edit a student
function editStudent(id) {
    const students = getStudents();
    const student = students.find(s => s.id === id);

    if (student) {
        document.getElementById('idNumber').value = student.id;
        document.getElementById('idNumber').disabled = true; // Prevent ID change
        document.getElementById('firstName').value = student.firstName;
        document.getElementById('middleName').value = student.middleName;
        document.getElementById('lastName').value = student.lastName;

        // Change button to Update
        const addBtn = document.getElementById('addStudentButton');
        addBtn.textContent = 'Update Student';
        addBtn.onclick = function() {
            updateStudent(id);
        };

        // Scroll to form
        document.querySelector('form').scrollIntoView({ behavior: 'smooth' });
    }
}

// Update a student
function updateStudent(id) {
    const firstName = document.getElementById('firstName').value.trim();
    const middleName = document.getElementById('middleName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();

    if (!firstName || !lastName) {
        alert('Please fill in all required fields');
        return;
    }

    let students = getStudents();
    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex !== -1) {
        students[studentIndex] = {
            id: id,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            timestamp: students[studentIndex].timestamp
        };
        saveStudents(students);
        clearStudentForm();
        resetStudentButton();
        displayStudents();
    }
}

// Clear student form
function clearStudentForm() {
    document.getElementById('idNumber').value = '';
    document.getElementById('idNumber').disabled = false;
    document.getElementById('firstName').value = '';
    document.getElementById('middleName').value = '';
    document.getElementById('lastName').value = '';
}

// Reset student button to Add mode
function resetStudentButton() {
    const addBtn = document.getElementById('addStudentButton');
    addBtn.textContent = 'Add Student';
    addBtn.onclick = addStudent;
}

// Display students in table
function displayStudents() {
    const students = getStudents();
    const tableBody = document.getElementById('table-content');

    if (!tableBody) return;

    tableBody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        [student.id, student.firstName, student.middleName, student.lastName].forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value || '';
            row.appendChild(cell);
        });

        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'btn btn-warning btn-sm mr-1';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editStudent(student.id));

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteStudent(student.id));

        actionsCell.append(editButton, deleteButton);
        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });
}

// ========================================
// Page Initialization
// ========================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeData();

    // Subject page initialization
    const subjectForm = document.getElementById('subjectForm');
    if (subjectForm) {
        const addSubjectBtn = document.getElementById('addSubject');
        addSubjectBtn.onclick = addSubject;
        displaySubjects();
    }

    // Student page initialization
    const studentForm = document.getElementById('studentForm');
    if (studentForm) {
        const addStudentBtn = document.getElementById('addStudentButton');
        addStudentBtn.onclick = addStudent;
        displayStudents();
    }
});
