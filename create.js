const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('input[type="password"]');

togglePassword.addEventListener('click', function (e){
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    if (type === 'text') {
        this.textContent = '🙈';
    } else {
        this.textContent = '👁️';
    }
})
