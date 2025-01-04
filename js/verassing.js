class FlowerAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    drawPetal(x, y, radius, angle, progress) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 105, 180, ${progress})`;
        ctx.moveTo(x, y);
        
        const petalWidth = radius * 0.5;
        const petalLength = radius;
        
        const controlX = x + Math.cos(angle) * petalLength;
        const controlY = y + Math.sin(angle) * petalLength;
        
        const endX = x + Math.cos(angle) * petalWidth;
        const endY = y + Math.sin(angle) * petalWidth;
        
        ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        ctx.fill();
    }

    animate(timestamp) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const numPetals = 12;
        
        const progress = (Math.sin(timestamp / 1000) + 1) / 2;
        
        for(let i = 0; i < numPetals; i++) {
            const angle = (i / numPetals) * Math.PI * 2;
            const radius = 100 * progress + 50;
            this.drawPetal(centerX, centerY, radius, angle, progress);
        }
        
        requestAnimationFrame((t) => this.animate(t));
    }
}

class App {
    constructor() {
        this.currentScreen = 'mainMenu';
        // Wait for canvas to be available
        document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('flowerCanvas');
            if (canvas) {
                this.flowerAnimation = new FlowerAnimation(canvas);
                this.flowerAnimation.animate(0);
            } else {
                console.error('Canvas element not found');
            }
        });
    }

    showScreen(screenId) {
        const currentScreen = document.querySelector('.screen.active');
        const nextScreen = document.getElementById(screenId);
        
        if (currentScreen && nextScreen) {
            currentScreen.classList.remove('active');
            nextScreen.classList.add('active');
            this.currentScreen = screenId;
        }
    }

    revealGift() {
        const giftGif = document.querySelector('.gift-gif'); // Define giftGif
        const giftMessage = document.querySelector('.gift-message');
        
        if (giftGif && giftMessage) { // Add error checking
            giftGif.style.opacity = '0';
            setTimeout(() => {
                giftGif.style.display = 'none';
                giftMessage.style.display = 'block';
                setTimeout(() => {
                    giftMessage.classList.add('revealed');
                }, 50);
            }, 500);
        } else {
            console.error('Gift elements not found');
        }
    }
}

// Initialize app after DOM loads
window.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});