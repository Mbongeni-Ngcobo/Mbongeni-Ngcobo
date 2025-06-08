document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    const statusElement = document.getElementById('formStatus');
    
    // Save to localStorage (temporary solution)
    localStorage.setItem('contactFormSubmission', JSON.stringify(formData));
    
    // Display success message
    statusElement.textContent = "Message sent successfully! I'll contact you soon.";
    statusElement.style.color = "green";
    
    // Clear form
    this.reset();
    
    // Alternative: Send email via mailto (will open user's email client)
    // const mailtoLink = `mailto:your-email@example.com?subject=Portfolio%20Contact&body=${encodeURIComponent(
    //     `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
    // )}`;
    // window.location.href = mailtoLink;
});