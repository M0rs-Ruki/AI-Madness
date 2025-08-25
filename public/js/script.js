// Initialize particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 75; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');

mobileMenuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

document.querySelectorAll('.toggle-switch').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const model = toggle.dataset.model;
        const panel = document.querySelector(`[data-model="${model}"]`);
        const isCurrentlyActive = toggle.classList.contains('active');
        
        // Check how many AIs are currently active
        const activeToggles = document.querySelectorAll('.toggle-switch.active');
        
        // Prevent disabling if this is the last active AI
        if (isCurrentlyActive && activeToggles.length === 1) {
            // Show warning message
            const warningDiv = document.createElement('div');
            warningDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-xl z-50 font-semibold';
            warningDiv.textContent = 'At least one AI must remain active!';
            document.body.appendChild(warningDiv);
            
            // Remove warning after 3 seconds
            setTimeout(() => {
                warningDiv.remove();
            }, 3000);
            return;
        }
        
        toggle.classList.toggle('active');
        
        if (toggle.classList.contains('active')) {
            // Show panel with animation
            panel.style.display = 'block';
            setTimeout(() => {
                panel.style.opacity = '1';
                panel.style.transform = 'scale(1)';
            }, 10);
            
            const responseArea = panel.querySelector('.response-area');
            const actions = panel.querySelector('.flex.justify-between');
            responseArea.classList.remove('opacity-50');
            actions.classList.remove('opacity-50');
            responseArea.innerHTML = `<div class="text-sm text-gray-200">${model.charAt(0).toUpperCase() + model.slice(1)} is now active and ready!</div>`;
        } else {
            // Hide panel with animation
            panel.style.opacity = '0';
            panel.style.transform = 'scale(0.8)';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 300);
        }
        
        // Adjust grid layout based on visible panels
        updateGridLayout();
    });
});

function updateGridLayout() {
    const visiblePanels = document.querySelectorAll('.ai-panel[style*="display: block"], .ai-panel:not([style*="display: none"])');
    const grid = document.getElementById('aiPanelsGrid');
    
    // Adjust grid columns based on number of visible panels
    if (visiblePanels.length === 1) {
        grid.className = 'grid grid-cols-1 gap-6 mb-6';
    } else if (visiblePanels.length === 2) {
        grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-6';
    } else {
        grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6';
    }
}

function initializePanelVisibility() {
    document.querySelectorAll('.ai-panel').forEach(panel => {
        const toggle = panel.querySelector('.toggle-switch');
        if (!toggle.classList.contains('active')) {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
            panel.style.opacity = '1';
            panel.style.transform = 'scale(1)';
        }
    });
    updateGridLayout();
}

// Expand/minimize panels
document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const panel = btn.closest('.ai-panel');
        const allPanels = document.querySelectorAll('.ai-panel');
        
        if (panel.classList.contains('expanded')) {
            // Minimize
            panel.classList.remove('expanded');
            allPanels.forEach(p => p.classList.remove('minimized'));
        } else {
            // Expand
            allPanels.forEach(p => {
                p.classList.remove('expanded');
                if (p !== panel) {
                    p.classList.add('minimized');
                } else {
                    p.classList.remove('minimized');
                }
            });
            panel.classList.add('expanded');
        }
    });
});

// Chat form submission
const chatForm = document.getElementById('chatForm');
const promptInput = document.getElementById('promptInput');

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const prompt = promptInput.value.trim();
    
    if (!prompt) return;

    // Get active models
    const activeModels = [];
    document.querySelectorAll('.toggle-switch.active').forEach(toggle => {
        activeModels.push(toggle.dataset.model);
    });

    if (activeModels.length === 0) {
        alert('Please enable at least one AI model!');
        return;
    }

    // Simulate responses
    activeModels.forEach(model => {
        const panel = document.querySelector(`[data-model="${model}"]`);
        const responseArea = panel.querySelector('.response-area');
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'mb-4 p-3 bg-red-500/20 rounded-xl text-sm';
        userMsg.innerHTML = `<strong>You:</strong> ${prompt}`;
        responseArea.appendChild(userMsg);

        // Simulate AI response
        setTimeout(() => {
            const aiMsg = document.createElement('div');
            aiMsg.className = 'mb-4 p-3 bg-black/50 rounded-xl text-sm';
            aiMsg.innerHTML = `<strong>${model.charAt(0).toUpperCase() + model.slice(1)}:</strong> This is a simulated response to "${prompt}". In a real implementation, this would connect to the actual ${model} API.`;
            responseArea.appendChild(aiMsg);
            responseArea.scrollTop = responseArea.scrollHeight;
        }, Math.random() * 2000 + 500);
    });

    // Clear input
    promptInput.value = '';
});

// New chat button
document.getElementById('newChatBtn').addEventListener('click', () => {
    document.querySelectorAll('.response-area').forEach(area => {
        const model = area.closest('.ai-panel').dataset.model;
        const isActive = area.closest('.ai-panel').querySelector('.toggle-switch').classList.contains('active');
        
        if (isActive) {
            area.innerHTML = `<div class="text-sm text-gray-200">${model.charAt(0).toUpperCase() + model.slice(1)} is ready for a new conversation!</div>`;
        }
    });
});

// Initialize
createParticles();
initializePanelVisibility();

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth < 768 && !sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});