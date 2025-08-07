// Simplified Gun Safety Quiz Functionality
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
});

function initQuiz() {
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
            message = `Perfect! You got all ${totalQuestions} questions right! You're a safety expert!`;
        } else if (score >= 2) {
            message = `Great job! You got ${score} out of ${totalQuestions} questions right! You know your safety rules!`;
        } else {
            message = `Good try! You got ${score} out of ${totalQuestions} questions right. Keep practicing the safety rules!`;
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
