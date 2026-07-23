// Function that updates my left panel buttons & switches tabs
function openTab(pageId, button) {

    // hides all pages first
    const pages = document.querySelectorAll('.tab-content');
    pages.forEach(page => page.classList.remove('active')); 

    // Un-Activates the buttons   
    const buttons = document.querySelectorAll('.menu-pannel-button');
    buttons.forEach(btn => btn.classList.remove('selected'));

    // Changes to the selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // updates the button color
    if (button) {
        button.classList.add('selected');
    }

    //this is for the dvd corner
    if (pageId === 'page-fun') {
        setTimeout(() => {
            initDvdScreensaver();
        }, 50);
    } else {
        if (dvdAnimationId) {
            cancelAnimationFrame(dvdAnimationId);
            dvdAnimationId = null;
        }
    }
}


//code that makes the dvd bounce on the wall 
let dvdAnimationId = null;

function initDvdScreensaver() {
    const canvas = document.getElementById('dvd-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const logoWidth = 100; const logoHeight = 40;

    let x = Math.random() * (canvas.width - logoWidth);
    let y = Math.random() * (canvas.height - logoHeight);
    
    let speedX = 2; let speedY = 2;


    let bounces = 0; let cornerHits = 0;

    const colors = ['#00d2ff', '#00ff66', '#ff007f', '#ffff00', '#a100ff', '#ff5500'];
    let currentColor = colors[0];

    function changeColor() {
        let newColor;
        do {
            newColor = colors[Math.floor(Math.random() * colors.length)];
        } while (newColor === currentColor);
        currentColor = newColor;
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let hitX = false; let hitY = false;

        if (x + speedX <= 0 || x + speedX + logoWidth >= canvas.width) {
            speedX = -speedX;
            hitX = true;
        }

        if (y + speedY <= 0 || y + speedY + logoHeight >= canvas.height) {
            speedY = -speedY;
            hitY = true;
        }

        if (hitX || hitY) {
            bounces++;
            changeColor();
            document.getElementById('bounce-count').innerText = bounces;

            if (hitX && hitY) {
                cornerHits++;
                document.getElementById('corner-count').innerText = cornerHits;
            }
        }

        x += speedX; y += speedY;

        ctx.fillStyle = currentColor;
        ctx.shadowColor = currentColor;
        ctx.shadowBlur = 8; // Efeito Neon
        ctx.fillRect(x, y, logoWidth, logoHeight);

        ctx.shadowBlur = 0; 
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('DVD', x + logoWidth / 2, y + logoHeight / 2);

        dvdAnimationId = requestAnimationFrame(update);
    }

    if (dvdAnimationId) cancelAnimationFrame(dvdAnimationId);
    
    update();
}