document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".submit-btn").addEventListener("click", validatePost);
});

function validatePost() {
    const postText = document.getElementById("post-text").value.trim();
    const postLabel = document.getElementById("post-label");

    if (postText === "") {
        postLabel.classList.add("error");
    } else {
        postLabel.classList.remove("error");
        window.location.href = 'Discussion.html'; 
    }
}
