document.addEventListener("DOMContentLoaded", function () {
    const downloadButtons = document.querySelectorAll('.copy-link-btn');
    const popup = document.getElementById('popup2');

    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            popup.style.display = 'block';
            
            setTimeout(() => {
                popup.style.display = 'none';
            }, 3000);
        });
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