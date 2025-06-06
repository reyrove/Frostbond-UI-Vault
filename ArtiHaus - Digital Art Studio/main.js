// Burger Menu Toggle Functions
function openMenu() {
    document.getElementById('burgerMenu').style.display = 'block';
}
function closeMenu() {
    document.getElementById('burgerMenu').style.display = 'none';
}

// Auto-close sidebar on outside click
document.addEventListener('click', function(event) {
    const menu = document.getElementById('burgerMenu');
    const icon = document.querySelector('.burger-menu');
    if (!menu.contains(event.target) && event.target !== icon) {
        closeMenu();
    }
});