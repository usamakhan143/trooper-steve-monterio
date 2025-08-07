// Swimming Safety Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    initSwimmingAnimations();
    initSkillsAssessment();
});

// Water Safety Interactive Game
function initWaterSafetyGame() {
    let score = 0;
    const maxScore = 5;
    
    const gameElements = document.querySelectorAll('[data-action]');
    const scoreCounter = document.getElementById('score-counter');
    const feedbackDisplay = document.getElementById('game-feedback');
    
    gameElements.forEach(element => {
        element.addEventListener('click', function() {
            handleGameClick(this);
        });
    });
    
    function handleGameClick(element) {
        const action = element.getAttribute('data-action');
        const feedback = getFeedbackMessage(element.className, action);
        
        // Visual feedback
        element.style.transform = 'scale(1.2)';
        element.style.filter = 'drop-shadow(0 0 10px #3498db)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.filter = 'none';
        }, 500);
        
        // Show feedback
        showGameFeedback(feedback);
        
        // Update score if safe choice
        if (action === 'safe' && !element.classList.contains('clicked')) {
            score++;
            updateScore();
            element.classList.add('clicked');
        }
        
        // Check for completion
        if (score === maxScore) {
            setTimeout(() => {
                showGameCompletion();
            }, 1000);
        }
    }
    
    function getFeedbackMessage(elementClass, action) {
        const messages = {
            'swimmer good-swimmer': {
                safe: '✅ Great! This swimmer is being safe - swimming with proper supervision!',
                unsafe: '❌ This person is running on wet surfaces - very dangerous!',
                check: '⚠️ Check the depth before diving - safety first!'
            },
            'swimmer running-swimmer': {
                unsafe: '❌ Running around pools is dangerous! Always walk on wet surfaces.',
                safe: '✅ Good catch! Running near pools can cause slips and falls.'
            },
            'swimmer diving-swimmer': {
                check: '⚠️ Always check water depth before diving. Some areas are too shallow!',
                safe: '✅ Good observation! Diving safety is very important.'
            },
            'lifeguard': {
                safe: '✅ Excellent! Lifeguards are there to keep everyone safe. Always listen to them!',
                check: '✅ Lifeguards are your friends - they help keep the water safe for everyone!'
            },
            'no-swimming-sign': {
                check: '⚠️ This sign means no swimming allowed. Always follow posted rules!',
                safe: '✅ Good eye! Signs like this are there for your safety.'
            }
        };
        
        const elementKey = elementClass.includes('good-swimmer') ? 'swimmer good-swimmer' :
                          elementClass.includes('running-swimmer') ? 'swimmer running-swimmer' :
                          elementClass.includes('diving-swimmer') ? 'swimmer diving-swimmer' :
                          elementClass.includes('lifeguard') ? 'lifeguard' :
                          elementClass.includes('no-swimming-sign') ? 'no-swimming-sign' : 'default';
        
        return messages[elementKey] ? messages[elementKey][action] || 'Keep looking for safety choices!' : 'Good choice!';
    }
    
    function showGameFeedback(message) {
        feedbackDisplay.textContent = message;
        feedbackDisplay.style.opacity = '1';
        feedbackDisplay.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            feedbackDisplay.style.opacity = '0.7';
        }, 3000);
    }
    
    function updateScore() {
        scoreCounter.textContent = score;
        scoreCounter.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            scoreCounter.style.animation = '';
        }, 500);
    }
    
    function showGameCompletion() {
        showGameFeedback('🎉 Congratulations! You found all the safety choices! You\'re a water safety expert!');
        createWaterCelebration();
    }
}

// Water Safety Quiz - Simplified Working Version
function initWaterSafetyQuiz() {
    let currentQuestion = 0;
    let score = 0;
    const totalQuestions = 3;

    const questions = document.querySelectorAll('.quiz-question');
    const progressBar = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const resultDiv = document.querySelector('.quiz-result');
    const restartBtn = document.querySelector('.restart-quiz');

    // Add click handlers to all quiz options
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            if (!this.disabled) {
                handleAnswer(this);
            }
        });
    });

    // Restart quiz handler
    if (restartBtn) {
        restartBtn.addEventListener('click', restartQuiz);
    }

    function handleAnswer(selectedOption) {
        const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
        const currentQuestionDiv = questions[currentQuestion];
        const options = currentQuestionDiv.querySelectorAll('.quiz-option');

        // Disable all options in current question
        options.forEach(opt => {
            opt.disabled = true;
            opt.style.pointerEvents = 'none';
        });

        // Style the selected answer
        if (isCorrect) {
            selectedOption.classList.add('correct');
            score++;
        } else {
            selectedOption.classList.add('incorrect');
            // Highlight the correct answer
            options.forEach(opt => {
                if (opt.getAttribute('data-correct') === 'true') {
                    opt.classList.add('correct');
                }
            });
        }

        // Move to next question after 2 seconds
        setTimeout(() => {
            nextQuestion();
        }, 2000);
    }

    function nextQuestion() {
        // Hide current question
        questions[currentQuestion].classList.remove('active');
        questions[currentQuestion].style.display = 'none';

        currentQuestion++;

        if (currentQuestion < totalQuestions) {
            // Show next question
            questions[currentQuestion].classList.add('active');
            questions[currentQuestion].style.display = 'block';
            updateProgress();
        } else {
            // Show results
            showResults();
        }
    }

    function updateProgress() {
        const progress = ((currentQuestion + 1) / totalQuestions) * 100;
        progressBar.style.width = progress + '%';
        progressText.textContent = `Question ${currentQuestion + 1} of ${totalQuestions}`;
    }

    function showResults() {
        // Hide progress bar
        document.querySelector('.quiz-progress').style.display = 'none';

        // Show result
        resultDiv.style.display = 'block';

        // Update result message
        const resultContent = resultDiv.querySelector('.result-content p');
        let message = '';

        if (score === totalQuestions) {
            message = `Perfect! You got all ${totalQuestions} questions right! You're a water safety expert!`;
        } else if (score >= 2) {
            message = `Great job! You got ${score} out of ${totalQuestions} questions right! You know your water safety rules!`;
        } else {
            message = `Good try! You got ${score} out of ${totalQuestions} questions right. Keep practicing the water safety rules!`;
        }

        resultContent.textContent = message;
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;

        // Reset all questions
        questions.forEach((question, index) => {
            question.classList.remove('active');
            question.style.display = index === 0 ? 'block' : 'none';
            if (index === 0) question.classList.add('active');

            // Reset all options
            const options = question.querySelectorAll('.quiz-option');
            options.forEach(opt => {
                opt.disabled = false;
                opt.style.pointerEvents = 'auto';
                opt.classList.remove('correct', 'incorrect');
            });
        });

        // Reset progress
        progressBar.style.width = '33.33%';
        progressText.textContent = 'Question 1 of 3';
        document.querySelector('.quiz-progress').style.display = 'block';

        // Hide result
        resultDiv.style.display = 'none';
    }

    // Initialize progress for first question
    updateProgress();
}

// Swimming-specific animations
function initSwimmingAnimations() {
    // Animate waves
    if (window.SafetyAnimations) {
        window.SafetyAnimations.swimmingSafety().waves();
        window.SafetyAnimations.swimmingSafety().lifeRing();
    }
    
    // Add swimming motions to pool scene
    const swimmers = document.querySelectorAll('.swimmer');
    swimmers.forEach((swimmer, index) => {
        swimmer.style.animationDelay = `${index * 0.5}s`;
        
        if (swimmer.classList.contains('good-swimmer')) {
            swimmer.style.animation = 'gentleSwim 4s ease-in-out infinite';
        }
    });
    
    // Animate safety rules on scroll
    const safetyRules = document.querySelectorAll('.safety-rule');
    safetyRules.forEach((rule, index) => {
        rule.style.opacity = '0';
        rule.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            rule.style.transition = 'all 0.6s ease';
            rule.style.opacity = '1';
            rule.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Skills Assessment Interactive Feature
function initSkillsAssessment() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        level.addEventListener('click', function() {
            // Remove active class from all levels
            skillLevels.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked level
            this.classList.add('active');
            
            // Show personalized message
            const levelType = this.classList.contains('beginner') ? 'beginner' :
                             this.classList.contains('intermediate') ? 'intermediate' : 'advanced';
            
            showSkillLevelMessage(levelType);
        });
    });
}

function showSkillLevelMessage(level) {
    const messages = {
        beginner: 'Great choice! Remember to always wear a life jacket and stay close to adults. You\'re learning and that\'s awesome! 🏊‍♀️',
        intermediate: 'Good progress! Keep practicing your skills and always follow safety rules. You\'re getting stronger! 💪',
        advanced: 'Excellent swimming skills! Remember that even strong swimmers need to follow safety rules and help others stay safe too! 🏆'
    };
    
    showQuizFeedback(messages[level], 'success');
}

// Water celebration effect
function createWaterCelebration() {
    const waterEmojis = ['🌊', '💧', '🏊‍♀️', '🏊‍♂️', '🛟', '⭐', '🎉', '🏆'];
    
    for (let i = 0; i < 25; i++) {
        const drop = document.createElement('div');
        drop.textContent = waterEmojis[Math.floor(Math.random() * waterEmojis.length)];
        drop.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 1.5 + 1}rem;
            left: ${Math.random() * 100}%;
            top: -50px;
            pointer-events: none;
            z-index: 10000;
            animation: waterDrop ${Math.random() * 2 + 3}s ease-out forwards;
        `;
        
        document.body.appendChild(drop);
        
        setTimeout(() => {
            drop.remove();
        }, 5000);
    }
}

// Utility functions
function showQuizFeedback(message, type) {
    // Remove any existing feedback
    const existingFeedback = document.querySelector('.quiz-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    const feedback = document.createElement('div');
    feedback.className = `quiz-feedback ${type}`;
    feedback.textContent = message;

    document.body.appendChild(feedback);

    // Trigger animation
    setTimeout(() => {
        feedback.classList.add('show');
    }, 100);

    // Auto remove after delay
    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS for swimming-specific animations
const swimmingStyles = `
@keyframes gentleSwim {
    0%, 100% {
        transform: translateX(0) translateY(0);
    }
    25% {
        transform: translateX(10px) translateY(-5px);
    }
    50% {
        transform: translateX(0) translateY(-10px);
    }
    75% {
        transform: translateX(-10px) translateY(-5px);
    }
}

@keyframes waterDrop {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}

.wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
    background: linear-gradient(45deg, #3498db, #2980b9);
    opacity: 0.7;
    animation: waveMotion 3s ease-in-out infinite;
}

.wave1 {
    animation-delay: 0s;
    height: 15px;
}

.wave2 {
    animation-delay: 1s;
    height: 20px;
    opacity: 0.5;
}

.wave3 {
    animation-delay: 2s;
    height: 10px;
    opacity: 0.3;
}

.swimming-safety-hero {
    background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
    position: relative;
    overflow: hidden;
}

.pool-scene {
    width: 100%;
    height: 200px;
    background: linear-gradient(to bottom, #87CEEB 0%, #4682B4 100%);
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    border: 3px solid #2980b9;
}

.pool-water {
    width: 100%;
    height: 70%;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
}

.pool-deck {
    width: 100%;
    height: 30%;
    background: #95a5a6;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 2px solid #7f8c8d;
}

.swimmer {
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 10px;
    border-radius: 50%;
}

.swimmer:hover {
    transform: scale(1.2);
    background: rgba(255, 255, 255, 0.3);
}

.lifeguard, .no-swimming-sign {
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 10px;
    border-radius: 50%;
}

.lifeguard:hover, .no-swimming-sign:hover {
    transform: scale(1.2);
    background: rgba(255, 255, 255, 0.3);
}

.skill-level {
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 2rem;
    border-radius: 15px;
    background: white;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.skill-level:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.skill-level.active {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
    transform: scale(1.05);
}

.comparison-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-top: 3rem;
}

.safety-location {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.safety-location:hover {
    transform: translateY(-5px);
}

.pool-safety {
    border-top: 4px solid #3498db;
}

.beach-safety {
    border-top: 4px solid #f39c12;
}

@media (max-width: 768px) {
    .comparison-container {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .pool-water {
        padding: 10px;
    }
    
    .swimmer, .lifeguard, .no-swimming-sign {
        font-size: 1.5rem;
        padding: 5px;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = swimmingStyles;
document.head.appendChild(styleSheet);
