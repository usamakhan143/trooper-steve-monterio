// Vehicle Safety Page Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initEquipmentMatchGame();
    initTrafficLightGame();
    initVehicleSafetyAnimations();
    initCarSafetyAnimations();
});

function initEquipmentMatchGame() {
    let matches = 0;
    const totalMatches = 4;
    
    const equipmentItems = document.querySelectorAll('.equipment-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    const vehicleTargets = document.querySelectorAll('.vehicle-target');
    
    // Initialize drag and drop for equipment items
    equipmentItems.forEach(item => {
        item.addEventListener('dragstart', handleEquipmentDragStart);
        item.addEventListener('dragend', handleEquipmentDragEnd);
        
        // Add touch support for mobile
        item.addEventListener('touchstart', handleTouchStart, { passive: false });
        item.addEventListener('touchmove', handleTouchMove, { passive: false });
        item.addEventListener('touchend', handleTouchEnd, { passive: false });
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleEquipmentDragOver);
        zone.addEventListener('drop', handleEquipmentDrop);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
    });
    
    let draggedElement = null;
    let touchOffset = { x: 0, y: 0 };
    
    function handleEquipmentDragStart(e) {
        draggedElement = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.getAttribute('data-equipment'));
        e.dataTransfer.effectAllowed = 'move';
    }
    
    function handleEquipmentDragEnd(e) {
        e.target.classList.remove('dragging');
        draggedElement = null;
    }
    
    function handleEquipmentDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }
    
    function handleDragEnter(e) {
        e.target.classList.add('drag-over');
    }
    
    function handleDragLeave(e) {
        e.target.classList.remove('drag-over');
    }
    
    function handleEquipmentDrop(e) {
        e.preventDefault();
        e.target.classList.remove('drag-over');
        
        const equipment = e.dataTransfer.getData('text/plain');
        const acceptedEquipment = e.target.getAttribute('data-accepts');
        
        if (!acceptedEquipment) return;
        
        const acceptedItems = acceptedEquipment.split(',');
        
        if (acceptedItems.includes(equipment)) {
            // Successful match
            e.target.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
            e.target.style.border = '2px solid #48bb78';
            e.target.innerHTML = `<div class="matched-equipment">${getEquipmentIcon(equipment)} <span>${getEquipmentName(equipment)}</span></div>`;
            
            // Hide the dragged item
            const draggedItem = document.querySelector(`[data-equipment="${equipment}"]`);
            if (draggedItem) {
                draggedItem.style.opacity = '0.3';
                draggedItem.style.pointerEvents = 'none';
                draggedItem.setAttribute('draggable', 'false');
            }
            
            matches++;
            updateEquipmentScore();
            updateEquipmentFeedback('Great match! 🎉', 'success');
            
            // Add success animation
            e.target.style.animation = 'successBounce 0.6s ease';
        } else {
            updateEquipmentFeedback('Try a different piece of equipment! 🤔', 'error');
            // Add error animation
            e.target.style.animation = 'errorShake 0.6s ease';
        }
    }
    
    // Touch event handlers for mobile support
    function handleTouchStart(e) {
        const touch = e.touches[0];
        const rect = e.target.getBoundingClientRect();
        touchOffset.x = touch.clientX - rect.left;
        touchOffset.y = touch.clientY - rect.top;
        
        draggedElement = e.target;
        e.target.classList.add('dragging');
    }
    
    function handleTouchMove(e) {
        e.preventDefault();
        if (!draggedElement) return;
        
        const touch = e.touches[0];
        draggedElement.style.position = 'fixed';
        draggedElement.style.left = (touch.clientX - touchOffset.x) + 'px';
        draggedElement.style.top = (touch.clientY - touchOffset.y) + 'px';
        draggedElement.style.zIndex = '1000';
    }
    
    function handleTouchEnd(e) {
        if (!draggedElement) return;
        
        const touch = e.changedTouches[0];
        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
        
        // Reset dragged element position
        draggedElement.style.position = '';
        draggedElement.style.left = '';
        draggedElement.style.top = '';
        draggedElement.style.zIndex = '';
        draggedElement.classList.remove('dragging');
        
        // Check if dropped on a valid drop zone
        const dropZone = dropTarget?.closest('.drop-zone');
        if (dropZone) {
            const equipment = draggedElement.getAttribute('data-equipment');
            const acceptedEquipment = dropZone.getAttribute('data-accepts');
            
            if (acceptedEquipment && acceptedEquipment.split(',').includes(equipment)) {
                // Simulate drop event
                const fakeEvent = {
                    preventDefault: () => {},
                    target: dropZone,
                    dataTransfer: {
                        getData: () => equipment
                    }
                };
                handleEquipmentDrop(fakeEvent);
            }
        }
        
        draggedElement = null;
    }
    
    function getEquipmentIcon(equipment) {
        const icons = {
            helmet: '<i class="fas fa-hard-hat"></i>',
            seatbelt: '<i class="fas fa-shield-alt"></i>',
            reflector: '<i class="fas fa-lightbulb"></i>',
            booster: '<i class="fas fa-baby"></i>'
        };
        return icons[equipment] || '<i class="fas fa-question"></i>';
    }
    
    function getEquipmentName(equipment) {
        const names = {
            helmet: 'Helmet',
            seatbelt: 'Seat Belt',
            reflector: 'Reflectors',
            booster: 'Booster Seat'
        };
        return names[equipment] || 'Unknown';
    }
    
    function updateEquipmentScore() {
        const scoreElement = document.getElementById('equipment-score');
        if (scoreElement) {
            scoreElement.textContent = matches;
            
            if (matches === totalMatches) {
                setTimeout(() => {
                    updateEquipmentFeedback('Perfect! You know all about safety equipment! 🏆', 'complete');
                    addCompletionCelebration();
                }, 500);
            }
        }
    }
    
    function updateEquipmentFeedback(message, type) {
        const feedbackElement = document.getElementById('equipment-feedback-text');
        if (feedbackElement) {
            feedbackElement.textContent = message;
            
            // Add color based on type
            feedbackElement.className = `feedback-${type}`;
            
            // Animate feedback
            feedbackElement.style.animation = 'feedbackPulse 0.5s ease';
            setTimeout(() => {
                feedbackElement.style.animation = '';
            }, 500);
        }
    }
    
    function addCompletionCelebration() {
        const completedZones = document.querySelectorAll('.drop-zone');
        completedZones.forEach((zone, index) => {
            setTimeout(() => {
                zone.style.animation = 'celebrationPulse 1s ease';
            }, index * 200);
        });
    }
}

function initTrafficLightGame() {
    let score = 0;
    let currentRound = 0;
    const totalRounds = 5;
    const lights = ['red', 'yellow', 'green'];
    const correctActions = {
        red: 'stop',
        yellow: 'slow',
        green: 'go'
    };
    
    let currentColor = 'red';
    let gameActive = true;
    
    const actionButtons = document.querySelectorAll('.action-btn');
    const nextButton = document.getElementById('next-light');
    const trafficLights = document.querySelectorAll('.light');
    
    // Initialize the game
    updateTrafficLight();
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!gameActive) return;
            handleTrafficAction(this.getAttribute('data-action'));
        });
    });
    
    if (nextButton) {
        nextButton.addEventListener('click', nextTrafficLight);
        nextButton.disabled = true;
    }
    
    function handleTrafficAction(action) {
        if (!gameActive) return;
        
        const isCorrect = correctActions[currentColor] === action;
        const feedback = document.getElementById('traffic-feedback');
        
        actionButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.getAttribute('data-action') === action) {
                if (isCorrect) {
                    btn.classList.add('correct');
                    btn.style.animation = 'successPulse 0.6s ease';
                } else {
                    btn.classList.add('incorrect');
                    btn.style.animation = 'errorShake 0.6s ease';
                }
            }
            
            // Highlight correct answer if user was wrong
            if (!isCorrect && btn.getAttribute('data-action') === correctActions[currentColor]) {
                btn.classList.add('correct');
                btn.style.animation = 'correctHighlight 1s ease';
            }
        });
        
        if (isCorrect) {
            feedback.innerHTML = '<i class="fas fa-check-circle"></i> Correct! Safe choice!';
            feedback.className = 'traffic-feedback success';
            score++;
            
            // Add light animation for correct answer
            document.querySelector(`.light.${currentColor}`).style.animation = 'correctLightPulse 1s ease';
        } else {
            const correctAction = correctActions[currentColor].toUpperCase();
            feedback.innerHTML = `<i class="fas fa-times-circle"></i> Not quite. When the light is ${currentColor.toUpperCase()}, you should ${correctAction}.`;
            feedback.className = 'traffic-feedback error';
            
            // Add light animation for wrong answer
            document.querySelector(`.light.${currentColor}`).style.animation = 'errorLightFlash 1s ease';
        }
        
        if (nextButton) {
            nextButton.disabled = false;
            nextButton.style.opacity = '1';
        }
        updateTrafficScore();
        gameActive = false;
    }
    
    function nextTrafficLight() {
        currentRound++;
        gameActive = true;
        
        // Reset button states
        actionButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'incorrect');
            btn.style.animation = '';
        });
        
        // Reset light animations
        trafficLights.forEach(light => {
            light.style.animation = '';
        });
        
        if (currentRound < totalRounds) {
            currentColor = lights[Math.floor(Math.random() * lights.length)];
            updateTrafficLight();
            
            if (nextButton) {
                nextButton.disabled = true;
                nextButton.style.opacity = '0.5';
            }
            
            const feedback = document.getElementById('traffic-feedback');
            if (feedback) {
                feedback.innerHTML = '';
                feedback.className = 'traffic-feedback';
            }
        } else {
            endTrafficGame();
        }
    }
    
    function updateTrafficLight() {
        trafficLights.forEach(light => {
            light.classList.remove('active');
        });
        
        const activeLight = document.querySelector(`.light.${currentColor}`);
        if (activeLight) {
            activeLight.classList.add('active');
        }
        
        const currentLightElement = document.getElementById('current-light');
        if (currentLightElement) {
            currentLightElement.textContent = currentColor.toUpperCase();
            currentLightElement.style.color = getColorForLight(currentColor);
        }
    }
    
    function getColorForLight(color) {
        const colors = {
            red: '#e53e3e',
            yellow: '#d69e2e',
            green: '#48bb78'
        };
        return colors[color] || '#ffffff';
    }
    
    function updateTrafficScore() {
        const scoreElement = document.getElementById('traffic-score');
        if (scoreElement) {
            scoreElement.textContent = score;
            
            // Animate score update
            scoreElement.style.animation = 'scoreUpdate 0.5s ease';
            setTimeout(() => {
                scoreElement.style.animation = '';
            }, 500);
        }
    }
    
    function endTrafficGame() {
        const feedback = document.getElementById('traffic-feedback');
        const percentage = Math.round((score / totalRounds) * 100);
        
        let message = '';
        let className = '';
        
        if (percentage >= 80) {
            message = `🎉 Excellent! You got ${score}/${totalRounds} correct (${percentage}%)! You're a traffic safety expert!`;
            className = 'traffic-feedback complete';
        } else if (percentage >= 60) {
            message = `👍 Good job! You got ${score}/${totalRounds} correct (${percentage}%)! Keep practicing!`;
            className = 'traffic-feedback good';
        } else {
            message = `📚 You got ${score}/${totalRounds} correct (${percentage}%). Let's review the rules and try again!`;
            className = 'traffic-feedback needs-improvement';
        }
        
        if (feedback) {
            feedback.innerHTML = message;
            feedback.className = className;
        }
        
        if (nextButton) {
            nextButton.textContent = 'Play Again';
            nextButton.disabled = false;
            nextButton.onclick = resetTrafficGame;
            nextButton.style.background = '#4facfe';
        }
        
        // Add celebration animation
        if (percentage >= 80) {
            trafficLights.forEach((light, index) => {
                setTimeout(() => {
                    light.style.animation = 'celebrationFlash 0.5s ease';
                }, index * 200);
            });
        }
    }
    
    function resetTrafficGame() {
        score = 0;
        currentRound = 0;
        currentColor = 'red';
        gameActive = true;
        
        updateTrafficLight();
        updateTrafficScore();
        
        actionButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'incorrect');
            btn.style.animation = '';
        });
        
        trafficLights.forEach(light => {
            light.style.animation = '';
        });
        
        if (nextButton) {
            nextButton.disabled = true;
            nextButton.textContent = 'Next Light';
            nextButton.onclick = nextTrafficLight;
            nextButton.style.background = '';
            nextButton.style.opacity = '0.5';
        }
        
        const feedback = document.getElementById('traffic-feedback');
        if (feedback) {
            feedback.innerHTML = '';
            feedback.className = 'traffic-feedback';
        }
    }
}

function initCarSafetyAnimations() {
    // Animate safety rule cards on scroll
    const ruleCards = document.querySelectorAll('.safety-rule-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'slideInFromLeft 0.6s ease forwards';
                    entry.target.style.opacity = '1';
                }, index * 150);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    ruleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        observer.observe(card);
    });
    
    // Animate behavior items
    const behaviorItems = document.querySelectorAll('.behavior-item');
    behaviorItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'fadeInUp 0.6s ease forwards';
    });
    
    // Animate age groups
    const ageGroups = document.querySelectorAll('.age-group');
    ageGroups.forEach((group, index) => {
        group.style.animationDelay = `${index * 0.2}s`;
        group.style.animation = 'slideInRight 0.6s ease forwards';
    });
}

function initVehicleSafetyAnimations() {
    // Add floating animation to vehicle icons
    const vehicleIcons = document.querySelectorAll('.vehicle-icon');
    vehicleIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
        icon.style.animation = 'vehicleFloat 3s ease-in-out infinite';
    });
    
    // Add bounce animation to equipment icons
    const equipmentIcons = document.querySelectorAll('.equipment-icon');
    equipmentIcons.forEach(icon => {
        icon.style.animation = 'iconBounce 2s ease-in-out infinite';
        icon.style.animationDelay = `${Math.random() * 2}s`;
    });
    
    // Add step animation
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add tip card animations
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Vehicle Safety Animation Styles
const vehicleAnimationStyles = `
@keyframes slideInFromLeft {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes vehicleFloat {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-8px);
    }
}

@keyframes iconBounce {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

@keyframes successBounce {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

@keyframes errorShake {
    0%, 100% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-8px);
    }
    75% {
        transform: translateX(8px);
    }
}

@keyframes successPulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 rgba(72, 187, 120, 0.4);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(72, 187, 120, 0.4);
    }
}

@keyframes correctHighlight {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
        box-shadow: 0 0 25px rgba(72, 187, 120, 0.6);
    }
}

@keyframes correctLightPulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
        filter: brightness(1.5);
    }
}

@keyframes errorLightFlash {
    0%, 100% {
        opacity: 1;
    }
    25%, 75% {
        opacity: 0.5;
    }
    50% {
        opacity: 0.8;
    }
}

@keyframes celebrationFlash {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.8;
        transform: scale(1.1);
    }
}

@keyframes celebrationPulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 rgba(72, 187, 120, 0);
    }
    50% {
        transform: scale(1.1);
        box-shadow: 0 0 30px rgba(72, 187, 120, 0.8);
    }
}

@keyframes feedbackPulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

@keyframes scoreUpdate {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
        color: #4facfe;
    }
    100% {
        transform: scale(1);
    }
}

.feedback-success {
    color: #48bb78 !important;
}

.feedback-error {
    color: #e53e3e !important;
}

.feedback-complete {
    color: #4facfe !important;
    font-weight: 600;
}

.traffic-feedback.success {
    background: rgba(72, 187, 120, 0.1);
    border-left: 4px solid #48bb78;
    color: #48bb78;
}

.traffic-feedback.error {
    background: rgba(229, 62, 62, 0.1);
    border-left: 4px solid #e53e3e;
    color: #e53e3e;
}

.traffic-feedback.complete {
    background: rgba(79, 172, 254, 0.1);
    border-left: 4px solid #4facfe;
    color: #4facfe;
}

.traffic-feedback.good {
    background: rgba(214, 158, 46, 0.1);
    border-left: 4px solid #d69e2e;
    color: #d69e2e;
}

.traffic-feedback.needs-improvement {
    background: rgba(229, 62, 62, 0.1);
    border-left: 4px solid #e53e3e;
    color: #e53e3e;
}

.matched-equipment {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: white;
    font-weight: 600;
}

.equipment-item {
    transition: all 0.3s ease;
    cursor: grab;
}

.equipment-item:hover {
    transform: scale(1.05);
}

.equipment-item.dragging {
    opacity: 0.7;
    transform: rotate(5deg) scale(1.1);
    z-index: 1000;
}

.drop-zone {
    transition: all 0.3s ease;
}

.drop-zone.drag-over {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(79, 172, 254, 0.5);
}

.safety-rule-card {
    transition: all 0.3s ease;
}

.safety-rule-card:hover {
    transform: translateY(-5px);
}
`;

// Inject vehicle safety styles
const vehicleStyleSheet = document.createElement('style');
vehicleStyleSheet.textContent = vehicleAnimationStyles;
document.head.appendChild(vehicleStyleSheet);
