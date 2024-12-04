document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById('uploadForm');
    const uploadLabel = document.getElementById('upload-label');
    const fileUpload = document.getElementById('file-upload');

    uploadForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        if (!fileUpload.files.length) {
            uploadLabel.classList.add('error');
        } else {
            uploadLabel.classList.remove('error');
            alert('File uploaded successfully!');
        }
    });

    fileUpload.addEventListener('change', function () {
        if (fileUpload.files.length) {
            uploadLabel.classList.remove('error');
            window.location.href = 'Files.html'; 
        }
    });
});
