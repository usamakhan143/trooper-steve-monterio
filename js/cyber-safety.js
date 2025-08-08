// Cyber Safety Page Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initPasswordChecker();
    initOnlineOfflineGame();
    initCyberSafetyAnimations();
    initRuleCardAnimations();
});

function initPasswordChecker() {
    const passwordInput = document.getElementById('password-input');
    const showPasswordBtn = document.getElementById('show-password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthLevel = document.getElementById('strength-level');
    
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', function() {
        checkPasswordStrength(this.value);
    });
    
    if (showPasswordBtn) {
        showPasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    function checkPasswordStrength(password) {
        let strength = 0;
        let feedback = '';
        let strengthClass = '';
        
        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
        
        // Create or update strength bar fill
        let barFill = strengthBar.querySelector('.bar-fill');
        if (!barFill) {
            barFill = document.createElement('div');
            barFill.className = 'bar-fill';
            strengthBar.appendChild(barFill);
        }
        
        barFill.style.width = strength + '%';
        
        // Remove existing strength classes
        barFill.classList.remove('weak', 'medium', 'good', 'strong');
        
        if (strength < 40) {
            strengthClass = 'weak';
            strengthLevel.textContent = 'Weak';
            feedback = 'Try adding more letters, numbers, and symbols!';
        } else if (strength < 70) {
            strengthClass = 'medium';
            strengthLevel.textContent = 'Medium';
            feedback = 'Good! Try adding a symbol or making it longer.';
        } else if (strength < 90) {
            strengthClass = 'good';
            strengthLevel.textContent = 'Good';
            feedback = 'Great! Just a bit more for maximum security.';
        } else {
            strengthClass = 'strong';
            strengthLevel.textContent = 'Strong';
            feedback = 'Excellent! This is a very strong password!';
        }
        
        barFill.classList.add(strengthClass);
        
        const suggestionElement = document.querySelector('.password-suggestions p');
        if (suggestionElement) {
            suggestionElement.innerHTML = '<i class="fas fa-lightbulb"></i> ' + feedback;
        }
    }
}

function initOnlineOfflineGame() {
    let score = 0;
    const scenarios = document.querySelectorAll('.scenario-item');
    const totalQuestions = scenarios.length;
    
    scenarios.forEach(scenario => {
        const buttons = scenario.querySelectorAll('.answer-btn');
        const correctAnswer = scenario.getAttribute('data-answer');
        const feedback = scenario.querySelector('.feedback-text');
        let answered = false;
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                if (answered) return;
                answered = true;
                
                const choice = this.getAttribute('data-choice');
                buttons.forEach(btn => btn.disabled = true);
                
                if (choice === correctAnswer) {
                    this.classList.add('correct');
                    feedback.innerHTML = '<i class="fas fa-check-circle"></i> Correct! Good digital citizenship!';
                    feedback.style.color = '#48bb78';
                    score++;
                    
                    // Add success animation
                    this.style.animation = 'successPulse 0.6s ease';
                } else {
                    this.classList.add('incorrect');
                    buttons.forEach(btn => {
                        if (btn.getAttribute('data-choice') === correctAnswer) {
                            btn.classList.add('correct');
                        }
                    });
                    feedback.innerHTML = '<i class="fas fa-times-circle"></i> Not quite. The correct answer is highlighted in green.';
                    feedback.style.color = '#e53e3e';
                    
                    // Add error animation
                    this.style.animation = 'errorShake 0.6s ease';
                }
                
                feedback.style.display = 'block';
                updateCyberScore();
            });
        });
    });
    
    function updateCyberScore() {
        const scoreElement = document.getElementById('cyber-score');
        if (scoreElement) {
            scoreElement.textContent = score;
            
            if (score === totalQuestions) {
                setTimeout(() => {
                    showGameCompletion();
                }, 500);
            }
        }
    }
    
    function showGameCompletion() {
        const resetButton = document.getElementById('reset-cyber-game');
        if (resetButton) {
            resetButton.style.display = 'inline-block';
            resetButton.addEventListener('click', resetGame);
        }
        
        // Show completion notification
        if (typeof showNotification === 'function') {
            showNotification('Perfect! You understand cyber safety! 💻', 'success');
        }
        
        // Add celebration animation
        document.querySelectorAll('.answer-btn.correct').forEach(btn => {
            btn.style.animation = 'celebrationBounce 1s ease infinite';
        });
    }
    
    function resetGame() {
        score = 0;
        scenarios.forEach(scenario => {
            const buttons = scenario.querySelectorAll('.answer-btn');
            const feedback = scenario.querySelector('.feedback-text');
            
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('correct', 'incorrect');
                btn.style.animation = '';
            });
            
            feedback.style.display = 'none';
            scenario.querySelector('.answer-buttons').style.pointerEvents = 'auto';
        });
        
        updateCyberScore();
        document.getElementById('reset-cyber-game').style.display = 'none';
    }
}

function initRuleCardAnimations() {
    const ruleCards = document.querySelectorAll('.rule-card');
    
    // Add staggered animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                    entry.target.style.opacity = '1';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    ruleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
        
        // Add hover sound effect (visual feedback)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initCyberSafetyAnimations() {
    // Animate digital citizenship rules
    const rules = document.querySelectorAll('.citizenship-rules .rule-card');
    rules.forEach((rule, index) => {
        rule.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Animate step cards
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add floating animation to icons
    const icons = document.querySelectorAll('.rule-icon, .website-icon, .resource-icon');
    icons.forEach(icon => {
        icon.style.animation = 'iconFloat 3s ease-in-out infinite';
        icon.style.animationDelay = `${Math.random() * 2}s`;
    });
    
    // Initialize password strength animation
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
        });
        
        passwordInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            this.parentElement.style.boxShadow = '';
        });
    }
}

// Add cyber safety specific animations CSS
const cyberAnimationStyles = `
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes successPulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(72, 187, 120, 0.5);
    }
}

@keyframes errorShake {
    0%, 100% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-5px);
    }
    75% {
        transform: translateX(5px);
    }
}

@keyframes celebrationBounce {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

@keyframes iconFloat {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
}

.rule-card {
    transition: all 0.3s ease;
}

.answer-btn {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.answer-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
}

.answer-btn:hover::before {
    width: 200px;
    height: 200px;
}

.scenario-item {
    transition: all 0.3s ease;
}

.scenario-item:hover {
    transform: translateY(-3px);
}
`;

// Inject styles
const cyberStyleSheet = document.createElement('style');
cyberStyleSheet.textContent = cyberAnimationStyles;
document.head.appendChild(cyberStyleSheet);
