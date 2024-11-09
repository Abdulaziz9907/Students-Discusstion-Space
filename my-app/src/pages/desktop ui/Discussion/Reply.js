document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".submit-btn").addEventListener("click", validateReply);
});

function validateReply() {
    const replyText = document.getElementById("reply-text").value.trim();
    const replyLabel = document.getElementById("reply-label");

    if (replyText === "") {
        replyLabel.classList.add("error");
    } else {
        replyLabel.classList.remove("error");
        window.location.href = 'Discussion.html'; 
    }
}
