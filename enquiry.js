document.getElementById("enquiryForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const course = document.getElementById("course").value;
    const agree = document.getElementById("agree").checked;

    const messageBox = document.getElementById("formMessage");

    // Clear previous message
    messageBox.style.color = "red";
    messageBox.textContent = "";

    // --- VALIDATION (3 Mandatory Fields) ---

    if (name === "") {
        messageBox.textContent = "Full Name is required.";
        return;
    }

    if (email === "" || !email.includes("@")) {
        messageBox.textContent = "Please enter a valid email address.";
        return;
    }

    if (phone.length < 10 || isNaN(phone)) {
        messageBox.textContent = "Please enter a valid phone number.";
        return;
    }

    if (course === "") {
        messageBox.textContent = "Please select a course.";
        return;
    }

    if (!agree) {
        messageBox.textContent = "You must agree to the terms.";
        return;
    }

    // SUCCESS MESSAGE
    messageBox.style.color = "green";
    messageBox.textContent = "Enquiry submitted successfully! Our team will contact you soon.";

    document.getElementById("enquiryForm").reset();
});
