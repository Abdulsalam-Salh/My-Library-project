let users = JSON.parse(localStorage.getItem('users')) || [];
let editIndex = null;

const form = document.getElementById('contactForm');
const nameInput = document.getElementById('fullName');
const emailInput = document.getElementById('gmail');
const subjectInput = document.getElementById('subject');
const userList = document.getElementById('infoList');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');

// Initial render
renderUsers();

// Add or edit user
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const subject = subjectInput.value.trim();
  
  if (!name || !email || !message || !subject) return;

  const user = { name, email, message, subject };

  if (editIndex === null) {
    // Add new user
    users.push(user);
  } else {
    // Edit existing user
    users[editIndex] = user;
    editIndex = null;
    submitBtn.textContent = 'Send request';
    submitBtn.classList.remove('update-btn');
    submitBtn.classList.add('add-btn');
    alert("Request submitted successfully!");
  }

  // Clear form
  nameInput.value = '';
  emailInput.value = '';
  messageInput.value = '';
  subjectInput.value = '';
  
  // Save and update display
  saveToLocalStorage();
  renderUsers();
});

// Display users
function renderUsers() {
  // Clear the list FIRST
  userList.innerHTML = '';
  
  users.forEach((user, index) => {
    const li = document.createElement('li');

    const info = document.createElement('span');
    info.innerHTML = `<strong> Name: ${user.name}</strong><br>${user.email} <br> <b>Subject:</b> ${user.subject} <br> <b>Message:</b> ${user.message}`;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit';
    editBtn.type = 'button'; // Important: prevent form submission
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent any bubbling issues
      editUser(index);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete';
    deleteBtn.type = 'button'; // Important: prevent form submission
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent any bubbling issues
      deleteUser(index);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(info);
    li.appendChild(actions);

    userList.appendChild(li);
  });
}

// Edit user
function editUser(index) {
  console.log('Editing user at index:', index); // Debug log
  console.log('User data:', users[index]); // Debug log
  
  // Populate form with user data
  nameInput.value = users[index].name;
  emailInput.value = users[index].email;
  messageInput.value = users[index].message;
  subjectInput.value = users[index].subject;
  
  // Set edit mode
  editIndex = index;

  // Update button
  submitBtn.textContent = '🔄 Update';
  submitBtn.classList.remove('add-btn');
  submitBtn.classList.add('update-btn');
  
  // Focus on the form
  nameInput.focus();
}

// Delete user
function deleteUser(index) {
  if (confirm('Are you sure you want to delete this user?')) {
    // Remove user from array
    users.splice(index, 1);
    
    // Reset edit mode if we're deleting the user being edited
    if (editIndex === index) {
      editIndex = null;
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
      subjectInput.value = '';
      submitBtn.classList.remove('update-btn');
      submitBtn.classList.add('add-btn');
    } else if (editIndex > index) {
      // Adjust editIndex if we deleted a user before the one being edited
      editIndex--;
    }
    
    // Save and update display
    saveToLocalStorage();
    renderUsers();
  }
}

// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem('users', JSON.stringify(users));
}