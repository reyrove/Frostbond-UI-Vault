// JavaScript to open and close the burger menu
function openMenu() {
  document.getElementById('burgerMenu').style.display = 'block';
}

function closeMenu() {
  document.getElementById('burgerMenu').style.display = 'none';
}

// Add event listener to close the menu when clicking outside of it
document.addEventListener('click', function(event) {
  const menu = document.getElementById('burgerMenu');
  const burgerIcon = document.querySelector('.burger-menu');

  if (!menu.contains(event.target) && event.target !== burgerIcon) {
      closeMenu();
  }
});