// contact.js - Form handling for contact page

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> SENDING...';
            
            // Get form data
            const formData = {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // In a real implementation, you would send this to a server
            // For now, we'll simulate a successful submission
            simulateFormSubmission(formData)
                .then(response => {
                    // Show success message
                    showFormMessage('success', 'Message sent successfully!');
                    contactForm.reset();
                })
                .catch(error => {
                    // Show error message
                    showFormMessage('error', 'There was an error sending your message. Please try again later.');
                })
                .finally(() => {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'SUBMIT';
                });
        }
    });
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Validate first name
        const firstName = document.getElementById('first-name');
        if (!firstName.value.trim()) {
            showError(firstName, 'First name is required');
            isValid = false;
        } else {
            clearError(firstName);
        }
        
        // Validate last name
        const lastName = document.getElementById('last-name');
        if (!lastName.value.trim()) {
            showError(lastName, 'Last name is required');
            isValid = false;
        } else {
            clearError(lastName);
        }
        
        // Validate email
        const email = document.getElementById('email');
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            clearError(email);
        }
        
        // Validate message
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message should be at least 10 characters');
            isValid = false;
        } else {
            clearError(message);
        }
        
        return isValid;
    }
    
    // Helper functions
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.style.borderColor = '#e74c3c';
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.style.borderColor = '';
    }
    
    function showFormMessage(type, message) {
        // Remove any existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.innerHTML = `
            <i class="fa ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${message}
        `;
        
        // Insert after the submit button
        submitBtn.insertAdjacentElement('afterend', messageElement);
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
    
    // Simulate form submission (replace with actual fetch/AJAX call)
function submitForm(formData) {
    return fetch('your-backend-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}
});