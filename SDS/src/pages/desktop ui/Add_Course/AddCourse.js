document.getElementById("courseForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    let isValid = true;

    const courseName = document.getElementById("course-name");
    const courseNumber = document.getElementById("course-number");
    const courseNameError = document.getElementById("course-name-error");
    const courseNumberError = document.getElementById("course-number-error");

    // Clear previous error messages
    courseNameError.textContent = "";
    courseNumberError.textContent = "";

    // Validate course name
    if (courseName.value.trim() === "") {
        courseNameError.textContent = "Course name is required.";
        courseNameError.style.display = "block";
        isValid = false;
    }

    // Validate course number
    if (courseNumber.value.trim() === "") {
        courseNumberError.textContent = "Course number is required.";
        courseNumberError.style.display = "block";
        isValid = false;
    }

    if (isValid) {
        // Show modal if validation passes
        const modal = document.getElementById("successModal");
        modal.style.display = "flex"; // Display the modal
    }
});

// Close the modal
document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("successModal").style.display = "none";
});

// Optional: Close modal when clicking outside the modal content
window.addEventListener("click", function (event) {
    const modal = document.getElementById("successModal");
    if (event.target === modal) {
        modal.style.display = "none";
        window.location.href = "../Admin_main/Admin_main.html";
    }
});
// just click outside to get out of popup