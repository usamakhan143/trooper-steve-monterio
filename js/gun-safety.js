// Gun Safety Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    initGunSafetyQuiz();
    initScenarioActivity();
    initSafetyPromise();
    initGunSafetyAnimations();
});

// Interactive Quiz Functionality
function initGunSafetyQuiz() {
    let currentQuestion = 0;
    let score = 0;
    const totalQuestions = 3;
    
    const quizContainer = document.querySelector('.quiz-container');
    const questions = document.querySelectorAll('.quiz-question');
    const progressBar = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const resultDiv = document.querySelector('.quiz-result');

    // Add click handlers to quiz options
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            handleQuizAnswer(this);
        });
    });

    function handleQuizAnswer(selectedOption) {
        const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
        const currentQuestionDiv = questions[currentQuestion];
        const options = currentQuestionDiv.querySelectorAll('.quiz-option');
        
        // Disable all options
        options.forEach(opt => opt.disabled = true);
        
        // Style the selected option
        if (isCorrect) {
            selectedOption.classList.add('correct');
            score++;
            showFeedback('Correct! Great job! 🎉', 'success');
        } else {
            selectedOption.classList.add('incorrect');
            // Show the correct answer
            options.forEach(opt => {
                if (opt.getAttribute('data-correct') === 'true') {
                    opt.classList.add('correct');
                }
            });
            showFeedback('Not quite right. The correct answer is highlighted. 📚', 'info');
        }
        
        // Move to next question after delay
        setTimeout(() => {
            nextQuestion();
        }, 2000);
    }

    function nextQuestion() {
        questions[currentQuestion].classList.remove('active');
        currentQuestion++;
        
        if (currentQuestion < totalQuestions) {
            questions[currentQuestion].classList.add('active');
            updateProgress();
        } else {
            showQuizResults();
        }
    }

    function updateProgress() {
        const progress = (currentQuestion / totalQuestions) * 100;
        progressBar.style.width = progress + '%';
        progressText.textContent = `Question ${currentQuestion + 1} of ${totalQuestions}`;
    }

    function showQuizResults() {
        questions[currentQuestion - 1].style.display = 'none';
        document.querySelector('.quiz-progress').style.display = 'none';
        resultDiv.style.display = 'block';
        
        const resultContent = resultDiv.querySelector('.result-content');
        let message = '';
        
        if (score === totalQuestions) {
            message = `Perfect! 🌟 You got all ${totalQuestions} questions right! You're a safety expert!`;
        } else if (score >= totalQuestions * 0.7) {
            message = `Great job! 👏 You got ${score} out of ${totalQuestions} questions right! You know your safety rules!`;
        } else {
            message = `Good try! 💪 You got ${score} out of ${totalQuestions} questions right. Keep practicing the safety rules!`;
        }
        
        resultContent.querySelector('p').textContent = message;
        
        // Add celebration animation
        if (score === totalQuestions) {
            createCelebrationParticles();
        }
    }

    // Restart quiz functionality
    document.querySelector('.restart-quiz').addEventListener('click', function() {
        currentQuestion = 0;
        score = 0;
        
        // Reset all questions
        questions.forEach((q, index) => {
            q.style.display = 'block';
            q.classList.remove('active');
            if (index === 0) q.classList.add('active');
            
            // Reset options
            q.querySelectorAll('.quiz-option').forEach(opt => {
                opt.disabled = false;
                opt.classList.remove('correct', 'incorrect');
            });
        });
        
        // Reset progress
        progressBar.style.width = '0%';
        progressText.textContent = 'Question 1 of 3';
        document.querySelector('.quiz-progress').style.display = 'block';
        resultDiv.style.display = 'none';
    });
}

// Interactive Scenario Activity
function initScenarioActivity() {
    const scenarioOptions = document.querySelectorAll('.scenario-btn');
    const feedbackDiv = document.querySelector('.scenario-feedback');
    
    scenarioOptions.forEach(btn => {
        btn.addEventListener('click', function() {
            handleScenarioChoice(this);
        });
    });

    function handleScenarioChoice(selectedBtn) {
        const action = selectedBtn.getAttribute('data-action');
        const allBtns = document.querySelectorAll('.scenario-btn');
        
        // Disable all buttons
        allBtns.forEach(btn => btn.disabled = true);
        
        if (action === 'correct') {
            selectedBtn.classList.add('correct-choice');
            showScenarioFeedback(true);
        } else {
            selectedBtn.classList.add('wrong-choice');
            // Highlight the correct answer
            allBtns.forEach(btn => {
                if (btn.getAttribute('data-action') === 'correct') {
                    btn.classList.add('correct-choice');
                }
            });
            showScenarioFeedback(false);
        }
    }

    function showScenarioFeedback(isCorrect) {
        const feedbackContent = feedbackDiv.querySelector('.feedback-content');
        
        if (isCorrect) {
            feedbackContent.innerHTML = `
                <div class="feedback-icon">🎉</div>
                <h3>Perfect! You got it right!</h3>
                <p>You followed all the safety steps perfectly. You would be very safe in this situation!</p>
                <button class="try-again-btn">Try Another Scenario</button>
            `;
        } else {
            feedbackContent.innerHTML = `
                <div class="feedback-icon">📚</div>
                <h3>Let's review the safety rule</h3>
                <p>Remember: Stop, Don't Touch, Run Away, Tell a Grown-up. The correct answer is highlighted above.</p>
                <button class="try-again-btn">Try Again</button>
            `;
        }
        
        feedbackDiv.style.display = 'block';
        
        // Try again functionality
        feedbackDiv.querySelector('.try-again-btn').addEventListener('click', function() {
            resetScenario();
        });
    }

    function resetScenario() {
        const allBtns = document.querySelectorAll('.scenario-btn');
        allBtns.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct-choice', 'wrong-choice');
        });
        feedbackDiv.style.display = 'none';
        
        // Optionally load a new scenario
        loadNewScenario();
    }

    function loadNewScenario() {
        const scenarios = [
            {
                story: "You're at a friend's house and see something that looks like a gun in a closet.",
                question: "What do you do?"
            },
            {
                story: "While playing in the park, you find something that might be a gun under some leaves.",
                question: "What's your next step?"
            },
            {
                story: "Your older sibling shows you something they found that looks like a weapon.",
                question: "How do you handle this?"
            }
        ];
        
        const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        const storyDiv = document.querySelector('.scenario-story');
        storyDiv.innerHTML = `
            <p>${randomScenario.story}</p>
            <p><strong>${randomScenario.question}</strong></p>
        `;
    }
}

// Safety Promise Feature
function initSafetyPromise() {
    const promiseBtn = document.querySelector('.promise-btn');
    
    promiseBtn.addEventListener('click', function() {
        this.textContent = 'Promise Made! ✓';
        this.style.background = '#2ecc71';
        this.disabled = true;
        
        // Create celebration effect
        createPromiseCelebration();
        
        // Show completion message
        setTimeout(() => {
            showNotification('Thank you for making the safety promise! You\'re a safety hero! 🦸‍♀️', 'success');
        }, 500);
    });
}

// Gun Safety Specific Animations
function initGunSafetyAnimations() {
    // Animate the safety rule steps on page load
    const ruleSteps = document.querySelectorAll('.rule-step');
    ruleSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            step.style.transition = 'all 0.6s ease';
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Animate STOP signs
    if (window.SafetyAnimations) {
        window.SafetyAnimations.gunSafety().stopSign();
        window.SafetyAnimations.gunSafety().runAway();
    }

    // Add hover effects to rule steps
    ruleSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Celebration Effects
function createCelebrationParticles() {
    const colors = ['#ff6b35', '#667eea', '#2ecc71', '#f7931e'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 100 + Math.random() * 100;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).addEventListener('finish', () => {
            particle.remove();
        });
    }
}

function createPromiseCelebration() {
    const promiseSection = document.querySelector('.safety-promise');
    const rect = promiseSection.getBoundingClientRect();
    
    // Create confetti effect
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = ['🎉', '⭐', '🏆', '👏', '🎊'][Math.floor(Math.random() * 5)];
        confetti.style.cssText = `
            position: fixed;
            font-size: 2rem;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top}px;
            animation: confettiFall 3s ease-out forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Utility function for feedback messages
function showFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.className = `quiz-feedback ${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#2ecc71' : '#3498db'};
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        feedback.style.transform = 'translateX(400px)';
        setTimeout(() => feedback.remove(), 300);
    }, 3000);
}

// Add CSS for confetti animation
const confettiStyles = `
@keyframes confettiFall {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(400px) rotate(360deg);
        opacity: 0;
    }
}

.quiz-option {
    transition: all 0.3s ease;
    cursor: pointer;
}

.quiz-option:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.quiz-option.correct {
    background: #2ecc71 !important;
    color: white;
    animation: correctPulse 0.5s ease;
}

.quiz-option.incorrect {
    background: #e74c3c !important;
    color: white;
    animation: shake 0.5s ease;
}

@keyframes correctPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

.scenario-btn.correct-choice {
    background: #2ecc71 !important;
    color: white;
    transform: scale(1.05);
}

.scenario-btn.wrong-choice {
    background: #e74c3c !important;
    color: white;
    opacity: 0.7;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = confettiStyles;
document.head.appendChild(styleSheet);
