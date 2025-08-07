// Vehicle Safety Page Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initEquipmentMatchGame();
    initTrafficLightGame();
    initVehicleSafetyAnimations();
});

function initEquipmentMatchGame() {
    let matches = 0;
    const totalMatches = 4;
    
    const equipmentItems = document.querySelectorAll('.equipment-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    equipmentItems.forEach(item => {
        item.addEventListener('dragstart', handleEquipmentDragStart);
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleEquipmentDragOver);
        zone.addEventListener('drop', handleEquipmentDrop);
    });
    
    function handleEquipmentDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.getAttribute('data-equipment'));
    }
    
    function handleEquipmentDragOver(e) {
        e.preventDefault();
    }
    
    function handleEquipmentDrop(e) {
        e.preventDefault();
        const equipment = e.dataTransfer.getData('text/plain');
        const acceptedEquipment = e.target.getAttribute('data-accepts').split(',');
        
        if (acceptedEquipment.includes(equipment)) {
            e.target.style.background = '#2ecc71';
            e.target.innerHTML = getEquipmentIcon(equipment);
            matches++;
            updateEquipmentScore();
            document.getElementById('equipment-feedback-text').textContent = 'Great match! 🎉';
        } else {
            document.getElementById('equipment-feedback-text').textContent = 'Try a different piece of equipment!';
        }
    }
    
    function getEquipmentIcon(equipment) {
        const icons = {
            helmet: '⛑️',
            seatbelt: '🔒',
            reflector: '✨',
            booster: '🪑'
        };
        return icons[equipment] || '❓';
    }
    
    function updateEquipmentScore() {
        document.getElementById('equipment-score').textContent = matches;
        if (matches === totalMatches) {
            document.getElementById('equipment-feedback-text').textContent = 'Perfect! You know all about safety equipment! 🏆';
        }
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
    
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            handleTrafficAction(this.getAttribute('data-action'));
        });
    });
    
    document.getElementById('next-light').addEventListener('click', nextTrafficLight);
    
    function handleTrafficAction(action) {
        const isCorrect = correctActions[currentColor] === action;
        const feedback = document.getElementById('traffic-feedback');
        
        if (isCorrect) {
            feedback.innerHTML = '✅ Correct! Safe choice!';
            feedback.style.color = '#2ecc71';
            score++;
        } else {
            const correctAction = correctActions[currentColor].toUpperCase();
            feedback.innerHTML = `❌ Not quite. When the light is ${currentColor.toUpperCase()}, you should ${correctAction}.`;
            feedback.style.color = '#e74c3c';
        }
        
        document.querySelectorAll('.action-btn').forEach(btn => btn.disabled = true);
        document.getElementById('next-light').disabled = false;
        updateTrafficScore();
    }
    
    function nextTrafficLight() {
        currentRound++;
        if (currentRound < totalRounds) {
            currentColor = lights[Math.floor(Math.random() * lights.length)];
            updateTrafficLight();
            document.querySelectorAll('.action-btn').forEach(btn => btn.disabled = false);
            document.getElementById('next-light').disabled = true;
            document.getElementById('traffic-feedback').innerHTML = '';
        } else {
            endTrafficGame();
        }
    }
    
    function updateTrafficLight() {
        document.querySelectorAll('.light').forEach(light => {
            light.classList.remove('active');
        });
        document.querySelector(`.light.${currentColor}`).classList.add('active');
        document.getElementById('current-light').textContent = currentColor.toUpperCase();
    }
    
    function updateTrafficScore() {
        document.getElementById('traffic-score').textContent = score;
    }
    
    function endTrafficGame() {
        const feedback = document.getElementById('traffic-feedback');
        feedback.innerHTML = `🎉 Game complete! You got ${score}/${totalRounds} correct!`;
        feedback.style.color = '#667eea';
        document.getElementById('next-light').textContent = 'Play Again';
        document.getElementById('next-light').addEventListener('click', resetTrafficGame);
    }
    
    function resetTrafficGame() {
        score = 0;
        currentRound = 0;
        currentColor = 'red';
        updateTrafficLight();
        updateTrafficScore();
        document.querySelectorAll('.action-btn').forEach(btn => btn.disabled = false);
        document.getElementById('next-light').disabled = true;
        document.getElementById('next-light').textContent = 'Next Light';
        document.getElementById('traffic-feedback').innerHTML = '';
    }
}

function initVehicleSafetyAnimations() {
    // Add vehicle-specific animations
    const vehicles = document.querySelectorAll('.vehicle-icon');
    vehicles.forEach((vehicle, index) => {
        vehicle.style.animationDelay = `${index * 0.5}s`;
        vehicle.style.animation = 'vehicleBounce 2s ease-in-out infinite';
    });
}

// Add CSS for vehicle animations
const vehicleStyles = `
@keyframes vehicleBounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.vehicle-safety-hero {
    background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
}

.equipment-item {
    cursor: grab;
    transition: all 0.3s ease;
    padding: 1rem;
    background: white;
    border-radius: 10px;
    margin: 0.5rem;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.equipment-item:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.drop-zone {
    min-height: 80px;
    border: 2px dashed #bdc3c7;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    transition: all 0.3s ease;
}

.drop-zone:hover {
    border-color: #3498db;
    background: rgba(52, 152, 219, 0.1);
}

.traffic-light {
    background: #2c3e50;
    border-radius: 20px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 100px;
    margin: 0 auto;
}

.light {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    opacity: 0.3;
    transition: opacity 0.3s ease;
}

.light.active {
    opacity: 1;
    animation: lightPulse 1s ease-in-out infinite;
}

@keyframes lightPulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = vehicleStyles;
document.head.appendChild(styleSheet);
