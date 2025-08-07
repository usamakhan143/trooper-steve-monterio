// Personal Safety Page Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initSafeUnsafeGame();
    initCommunityHelpersGame();
    initPersonalSafetyPromise();
});

function initSafeUnsafeGame() {
    let correctAnswers = 0;
    const totalQuestions = 4;
    
    document.querySelectorAll('.situation-card').forEach(card => {
        const safeBtn = card.querySelector('.safe-btn');
        const unsafeBtn = card.querySelector('.unsafe-btn');
        const feedback = card.querySelector('.feedback');
        const correctAnswer = card.getAttribute('data-safety');
        
        safeBtn.addEventListener('click', () => handleAnswer(card, 'safe', correctAnswer, feedback));
        unsafeBtn.addEventListener('click', () => handleAnswer(card, 'unsafe', correctAnswer, feedback));
    });
    
    function handleAnswer(card, choice, correct, feedback) {
        const buttons = card.querySelectorAll('.safe-btn, .unsafe-btn');
        buttons.forEach(btn => btn.disabled = true);
        
        if ((choice === 'safe' && correct === 'safe') || (choice === 'unsafe' && correct === 'unsafe')) {
            feedback.innerHTML = '✅ Correct! Good safety thinking!';
            feedback.style.color = '#2ecc71';
            correctAnswers++;
        } else {
            feedback.innerHTML = `❌ Not quite. This situation is ${correct === 'safe' ? 'SAFE' : 'UNSAFE'}.`;
            feedback.style.color = '#e74c3c';
        }
        
        feedback.style.display = 'block';
        updateScore();
    }
    
    function updateScore() {
        document.getElementById('correct-score').textContent = correctAnswers;
        if (correctAnswers === totalQuestions) {
            document.getElementById('reset-game').style.display = 'inline-block';
        }
    }
}

function initCommunityHelpersGame() {
    // Drag and drop functionality for community helpers matching game
    const helpers = document.querySelectorAll('.helper-card');
    const jobs = document.querySelectorAll('.job-card');
    
    helpers.forEach(helper => {
        helper.addEventListener('dragstart', handleDragStart);
    });
    
    jobs.forEach(job => {
        job.addEventListener('dragover', handleDragOver);
        job.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-helper'));
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const helperType = e.dataTransfer.getData('text/plain');
    const jobType = e.currentTarget.getAttribute('data-job');
    
    if (helperType === jobType) {
        e.currentTarget.style.background = '#2ecc71';
        e.currentTarget.style.color = 'white';
        showNotification('Perfect match! 🎉', 'success');
    } else {
        showNotification('Try again! Think about what this person does.', 'info');
    }
}

function initPersonalSafetyPromise() {
    document.querySelector('.promise-btn').addEventListener('click', function() {
        this.textContent = 'Promise Made! ✅';
        this.style.background = '#2ecc71';
        this.disabled = true;
        showNotification('Thank you for making the personal safety promise! 🛡️', 'success');
    });
}
