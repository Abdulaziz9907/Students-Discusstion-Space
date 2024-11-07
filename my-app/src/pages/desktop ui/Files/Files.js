document.querySelectorAll('.copy-link-btn').forEach(button => {
    button.addEventListener('click', () => {
        navigator.clipboard.writeText("Link copied!"); 
        alert("Link copied to clipboard!");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const downloadButtons = document.querySelectorAll('.download-btn');
    const popup = document.getElementById('popup');

    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            popup.style.display = 'block';
            
            setTimeout(() => {
                popup.style.display = 'none';
            }, 3000);
        });
    });
});
document.getElementsByClassName('upload-btn')[0].addEventListener('click', function() {
    window.location.href = 'Upload.html'; 
});