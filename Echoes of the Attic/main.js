// Burger menu toggling
function openMenu() {
  document.getElementById('burgerMenu').style.display = 'block';
}

function closeMenu() {
  document.getElementById('burgerMenu').style.display = 'none';
}

document.addEventListener('click', function (e) {
  const menu = document.getElementById('burgerMenu');
  const burger = document.querySelector('.burger-menu');
  if (!menu.contains(e.target) && e.target !== burger) {
    closeMenu();
  }
});

// Form submit
document.getElementById('userForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const bio = document.getElementById('bio').value;
  const profilePicture = document.getElementById('profilePicture').files[0];

  const reader = new FileReader();
  reader.onload = function (event) {
    const profileData = {
      username,
      fullname,
      email,
      bio,
      picture: event.target.result,
    };

    localStorage.setItem('userProfile', JSON.stringify(profileData));
    renderProfile(profileData);
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('userProfile').style.display = 'block';
    showSpell('happySpellMessage');
  };

  if (profilePicture) {
    reader.readAsDataURL(profilePicture);
  }
});

function renderProfile(data) {
  document.getElementById('displayUsername').textContent = `Username: ${data.username}`;
  document.getElementById('displayFullname').textContent = `Full Name: ${data.fullname}`;
  document.getElementById('displayEmail').textContent = `Email: ${data.email}`;
  document.getElementById('displayBio').textContent = `Bio: ${data.bio}`;
  document.getElementById('displayProfilePicture').src = data.picture;
}

document.getElementById('editProfile').addEventListener('click', function () {
  const data = JSON.parse(localStorage.getItem('userProfile'));
  document.getElementById('username').value = data.username;
  document.getElementById('fullname').value = data.fullname;
  document.getElementById('email').value = data.email;
  document.getElementById('bio').value = data.bio;

  document.getElementById('signupForm').style.display = 'block';
  document.getElementById('userProfile').style.display = 'none';
  document.getElementById('saveChanges').style.display = 'inline-block';
});

document.getElementById('saveChanges').addEventListener('click', function () {
  document.getElementById('userForm').dispatchEvent(new Event('submit'));
  this.style.display = 'none';
});

document.getElementById('deleteAccount').addEventListener('click', function () {
  if (confirm('Are you sure you want to delete your account?')) {
    localStorage.removeItem('userProfile');
    document.getElementById('userForm').reset();
    document.getElementById('userProfile').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
    showSpell('sadSpellMessage');
  }
});

function showSpell(id) {
  const el = document.getElementById(id);
  el.style.display = 'block';
  setTimeout(() => (el.style.display = 'none'), 5000);
}

// Auto-load profile if exists
window.onload = function () {
  const data = JSON.parse(localStorage.getItem('userProfile'));
  if (data) {
    renderProfile(data);
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('userProfile').style.display = 'block';
  }
};