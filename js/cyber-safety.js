// Cyber Safety Page Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initPasswordChecker();
    initOnlineOfflineGame();
    initCyberSafetyAnimations();
});

function initPasswordChecker() {
    const passwordInput = document.getElementById('password-input');
    const showPasswordBtn = document.getElementById('show-password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthLevel = document.getElementById('strength-level');
    
    passwordInput.addEventListener('input', function() {
        checkPasswordStrength(this.value);
    });
    
    showPasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '🙈';
    });
    
    function checkPasswordStrength(password) {
        let strength = 0;
        let feedback = '';
        
        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
        
        strengthBar.style.width = strength + '%';
        
        if (strength < 40) {
            strengthBar.style.background = '#e74c3c';
            strengthLevel.textContent = 'Weak';
            feedback = 'Try adding more letters, numbers, and symbols!';
        } else if (strength < 70) {
            strengthBar.style.background = '#f39c12';
            strengthLevel.textContent = 'Medium';
            feedback = 'Good! Try adding a symbol or making it longer.';
        } else {
            strengthBar.style.background = '#2ecc71';
            strengthLevel.textContent = 'Strong';
            feedback = 'Excellent! This is a strong password!';
        }
        
        document.querySelector('.password-suggestions p').textContent = '💡 ' + feedback;
    }
}

function initOnlineOfflineGame() {
    let score = 0;
    const totalQuestions = 4;
    
    document.querySelectorAll('.scenario-item').forEach(scenario => {
        const buttons = scenario.querySelectorAll('.answer-btn');
        const correctAnswer = scenario.getAttribute('data-answer');
        const feedback = scenario.querySelector('.feedback-text');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const choice = this.getAttribute('data-choice');
                buttons.forEach(btn => btn.disabled = true);
                
                if (choice === correctAnswer) {
                    this.style.background = '#2ecc71';
                    this.style.color = 'white';
                    feedback.innerHTML = '✅ Correct! Good digital citizenship!';
                    feedback.style.color = '#2ecc71';
                    score++;
                } else {
                    this.style.background = '#e74c3c';
                    this.style.color = 'white';
                    buttons.forEach(btn => {
                        if (btn.getAttribute('data-choice') === correctAnswer) {
                            btn.style.background = '#2ecc71';
                            btn.style.color = 'white';
                        }
                    });
                    feedback.innerHTML = `❌ Not quite. The correct answer is highlighted.`;
                    feedback.style.color = '#e74c3c';
                }
                
                feedback.style.display = 'block';
                updateCyberScore();
            });
        });
    });
    
    function updateCyberScore() {
        document.getElementById('cyber-score').textContent = score;
        if (score === totalQuestions) {
            document.getElementById('reset-cyber-game').style.display = 'inline-block';
            showNotification('Perfect! You understand cyber safety! 💻', 'success');
        }
    }
}

function initCyberSafetyAnimations() {
    if (window.SafetyAnimations) {
        window.SafetyAnimations.cyberSafety().dataStream();
        window.SafetyAnimations.cyberSafety().shieldProtection();
    }
}
