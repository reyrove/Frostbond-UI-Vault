// scripts.js

document.getElementById('search-bar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
            item.parentElement.style.display = 'block';
        } else {
            item.parentElement.style.display = 'none';
        }
    });
});

function filterContent(type) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        if (type === 'all' || section.classList.contains(type)) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}


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