// const form = document.getElementById('registrationForm');
// const submitBtn = document.getElementById('submitBtn');
// const submitText = document.getElementById('submitText');
// const loadingText = document.getElementById('loadingText');
// const alert = document.getElementById('alert');
// const alertMessage = document.getElementById('alertMessage');

// function showAlert(message, type) {
//     alert.className = `alert alert-${type}`;
//     alert.style.display = 'block';
//     alertMessage.textContent = message;
    
//     setTimeout(() => {
//         alert.style.display = 'none';
//     }, 5000);
// }

// form.addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const formData = new FormData(this);
//     const data = Object.fromEntries(formData);
    
//     // Validation
//     if (data.password !== data.confirmPassword) {
//         showAlert('Passwords do not match', 'error');
//         return;
//     }
    
//     if (data.password.length < 8) {
//         showAlert('Password must be at least 8 characters long', 'error');
//         return;
//     }
    
//     if (!data.terms) {
//         showAlert('Please accept the terms and conditions', 'error');
//         return;
//     }
    
//     // Show loading
//     submitText.classList.add('hidden');
//     loadingText.classList.remove('hidden');
//     submitBtn.disabled = true;
    
//     // Simulate registration
//     setTimeout(() => {
//         submitText.classList.remove('hidden');
//         loadingText.classList.add('hidden');
//         submitBtn.disabled = false;
        
//         showAlert('Account created successfully! Welcome to AI Madness!', 'success');
//         form.reset();
//     }, 2000);
// });

// // Real-time password confirmation
// document.getElementById('confirmPassword').addEventListener('input', function() {
//     const password = document.getElementById('password').value;
//     const confirmPassword = this.value;
    
//     if (confirmPassword && password !== confirmPassword) {
//         this.style.borderColor = '#ef4444';
//     } else {
//         this.style.borderColor = '';
//     }
// });