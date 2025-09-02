// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }
    
    // Theme switch event listener
    themeSwitch.addEventListener('change', function() {
        body.classList.toggle('dark-mode');
        
        // Save theme preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Counter Game Functionality
    const counterElement = document.getElementById('counter');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
    const resetBtn = document.getElementById('reset');
    
    let count = 0;
    
    function updateCounter() {
        counterElement.textContent = count;
        
        // Change color based on value
        if (count > 0) {
            counterElement.style.color = '#23d160';
        } else if (count < 0) {
            counterElement.style.color = '#ff3860';
        } else {
            counterElement.style.color = '';
        }
    }
    
    incrementBtn.addEventListener('click', function() {
        count++;
        updateCounter();
    });
    
    decrementBtn.addEventListener('click', function() {
        count--;
        updateCounter();
    });
    
    resetBtn.addEventListener('click', function() {
        count = 0;
        updateCounter();
    });
    
    // FAQ Section Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.classList.contains('open');
            
            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.classList.remove('open');
            });
            
            document.querySelectorAll('.faq-question span').forEach(item => {
                item.textContent = '+';
            });
            
            // Open clicked answer if it was closed
            if (!isOpen) {
                answer.classList.add('open');
                this.querySelector('span').textContent = '-';
            }
        });
    });
    
    // Tabbed Interface Functionality
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and content
            document.querySelectorAll('.tab').forEach(t => {
                t.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to current tab and content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Event Demonstration Functionality
    const eventBox = document.getElementById('event-box');
    const eventInfo = document.getElementById('event-info');
    
    eventBox.addEventListener('mouseover', function() {
        eventInfo.textContent = 'Mouse over detected!';
    });
    
    eventBox.addEventListener('mouseout', function() {
        eventInfo.textContent = 'Mouse out detected!';
    });
    
    eventBox.addEventListener('mousemove', function(e) {
        eventInfo.textContent = `Mouse position: X=${e.offsetX}, Y=${e.offsetY}`;
    });
    
    eventBox.addEventListener('click', function() {
        eventInfo.textContent = 'Box clicked!';
    });
    
    document.addEventListener('keydown', function(e) {
        eventInfo.textContent = `Key pressed: ${e.key}`;
    });
    
    // Form Validation Functionality
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const formSuccess = document.getElementById('form-success');
    
    // Name validation
    nameInput.addEventListener('input', function() {
        if (validateName(this.value)) {
            this.classList.remove('invalid');
            this.classList.add('valid');
            nameError.style.display = 'none';
        } else {
            this.classList.remove('valid');
            this.classList.add('invalid');
            nameError.style.display = 'block';
        }
    });
    
    // Email validation
    emailInput.addEventListener('input', function() {
        if (validateEmail(this.value)) {
            this.classList.remove('invalid');
            this.classList.add('valid');
            emailError.style.display = 'none';
        } else {
            this.classList.remove('valid');
            this.classList.add('invalid');
            emailError.style.display = 'block';
        }
    });
    
    // Password validation
    passwordInput.addEventListener('input', function() {
        if (validatePassword(this.value)) {
            this.classList.remove('invalid');
            this.classList.add('valid');
            passwordError.style.display = 'none';
            
            // If confirm password has value, validate it again
            if (confirmPasswordInput.value) {
                if (this.value === confirmPasswordInput.value) {
                    confirmPasswordInput.classList.remove('invalid');
                    confirmPasswordInput.classList.add('valid');
                    confirmPasswordError.style.display = 'none';
                } else {
                    confirmPasswordInput.classList.remove('valid');
                    confirmPasswordInput.classList.add('invalid');
                    confirmPasswordError.style.display = 'block';
                }
            }
        } else {
            this.classList.remove('valid');
            this.classList.add('invalid');
            passwordError.style.display = 'block';
        }
    });
    
    // Confirm password validation
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value === passwordInput.value) {
            this.classList.remove('invalid');
            this.classList.add('valid');
            confirmPasswordError.style.display = 'none';
        } else {
            this.classList.remove('valid');
            this.classList.add('invalid');
            confirmPasswordError.style.display = 'block';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        if (!validateName(nameInput.value)) {
            nameInput.classList.add('invalid');
            nameError.style.display = 'block';
            isValid = false;
        }
        
        if (!validateEmail(emailInput.value)) {
            emailInput.classList.add('invalid');
            emailError.style.display = 'block';
            isValid = false;
        }
        
        if (!validatePassword(passwordInput.value)) {
            passwordInput.classList.add('invalid');
            passwordError.style.display = 'block';
            isValid = false;
        }
        
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.classList.add('invalid');
            confirmPasswordError.style.display = 'block';
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            formSuccess.style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(function() {
                form.reset();
                document.querySelectorAll('input').forEach(input => {
                    input.classList.remove('valid');
                    input.classList.remove('invalid');
                });
                document.querySelectorAll('.error').forEach(error => {
                    error.style.display = 'none';
                });
                formSuccess.style.display = 'none';
            }, 3000);
        }
    });
    
    // Validation functions
    function validateName(name) {
        return name.length >= 2;
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePassword(password) {
        // At least 8 characters, one number, one special character
        const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return re.test(password);
    }
        });
