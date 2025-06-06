// Initialize comment submission and display
document.addEventListener('DOMContentLoaded', () => {
    const submitCommentButton = document.getElementById('submit-comment');
    const commentInput = document.getElementById('comment-input');
    const commentsContainer = document.getElementById('comments-container');

    // Function to add comment to the page
    function addComment(text) {
        const commentElement = document.createElement('p');
        commentElement.classList.add('comment'); // Add the 'comment' class for styling
        commentElement.textContent = text;
        commentsContainer.appendChild(commentElement);
    }

    // Event listener for submitting comments
    submitCommentButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission behavior
        const commentText = commentInput.value.trim();
        if (commentText !== '') {
            addComment(commentText);
            commentInput.value = ''; // Clear input after submission
        }
    });
});

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