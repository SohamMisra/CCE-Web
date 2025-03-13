import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('content').appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const planes = [];

// Create Image Plane
const createImagePlane = (imagePath, zPosition, opacity = 1, parallaxFactor = 0.1, direction = 1) => {
    textureLoader.load(
        imagePath,
        (texture) => {
            const aspectRatio = texture.image.width / texture.image.height;

            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: opacity
            });

            const imagePlane = new THREE.Mesh(geometry, material);
            imagePlane.scale.set(1.1*window.innerWidth, 1.1*window.innerWidth / aspectRatio, 1);
            imagePlane.position.z = zPosition;

            scene.add(imagePlane);
            planes.push({ mesh: imagePlane, parallaxFactor, direction });

            updateCameraPosition();
        },
        undefined,
        (error) => console.error(`❌ Error loading texture: ${imagePath}`, error)
    );
};

// Load Image Layers
createImagePlane('./HomeImages/back.png', -10, 1, 0.3, 1);   // Normal direction
createImagePlane('./HomeImages/mid.png', -5, 1, 0.35, -1);    // Opposite direction
createImagePlane('./HomeImages/for.png', -1, 1, 0.35, 1);     // Normal direction

let mouse = { x: 0, y: 0 };
let driftOffset = { x: 0, y: 0 };
let needsRender = true;
let idleTime = 0;

// Track Mouse Movement
window.addEventListener('mousemove', (event) => {
    const newX = (event.clientX / window.innerWidth) * 2 - 1;
    const newY = -(event.clientY / window.innerHeight) * 2 + 1;

    if (mouse.x !== newX || mouse.y !== newY) {
        mouse.x = newX;
        mouse.y = newY;
        needsRender = true;
        idleTime = 0; // Reset idle timer on mouse movement
    }
});

// Resistance factor (controls the drag intensity)
const resistance = 0.1; // Lower values = slower, smoother motion

// Track current positions for smooth transition
let currentX = 0;
let currentY = 0;

function animate() {
    const maxMovementX = window.innerWidth * 0.03;
    const maxMovementY = window.innerHeight * 0.03;

    idleTime += 0.01; // Increment idle timer
    planes.forEach(({ mesh, parallaxFactor, direction }) => {
        let targetX, targetY;

        if (idleTime > 0.5) {
            // 8-Pattern Motion when idle
            targetX = direction * Math.sin(idleTime * parallaxFactor) * maxMovementX * 4;
            targetY = direction * Math.sin(idleTime * parallaxFactor * 2) * maxMovementY * 4;
        }
        else {
            // Controlled Mouse Movement
            targetX = direction * (mouse.x + driftOffset.x) * parallaxFactor * maxMovementX;
            targetY = direction * (mouse.y + driftOffset.y) * parallaxFactor * maxMovementY;
        }

        // Apply resistance for smooth movement
        mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, targetX, resistance);
        mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, targetY, resistance);
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
renderer.setClearColor(0xffffff);

// Resize Handling (Using Scale Instead of Rebuilding Geometry)
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    planes.forEach(({ mesh }) => {
        const aspectRatio = mesh.material.map.image.width / mesh.material.map.image.height;
        mesh.scale.set(window.innerWidth, window.innerWidth / aspectRatio, 1);
    });

    updateCameraPosition();
});

// Camera Position Calculation
function updateCameraPosition() {
    camera.position.z = (window.innerHeight / 2) / Math.tan((camera.fov * Math.PI) / 360);
}

// Video Visibility Control
const videoContainer = document.getElementById('video-container');
const video = document.getElementById('intro-video');
const body = document.body;

function disableScroll() {
    window.scrollTo(0, 0); // Force scroll to top
        body.style.overflow = 'hidden'; // Disable scroll
        body.style.position = 'fixed';  // Lock position
        body.style.top = '0';          // Ensure no bounce
        body.style.width = '100%';
    body.style.overflow = 'hidden';
}

function enableScroll() {
    body.style.overflow = 'auto';
    body.style.position = '';
}
disableScroll();
video.addEventListener('ended', () => {
    enableScroll();
    videoContainer.style.display = 'none';
    document.getElementById('content').style.display = 'block';
    setTimeout(() => {
        if (window.scrollY === 0) {  // Check if user is still at the top
            navbar.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 5000);
});


videoContainer.style.display = 'none';
document.getElementById('content').style.display = 'block';
enableScroll();
/*
const content = document.getElementById('content');
const navbar = document.querySelector('.navbar');
    content.addEventListener('wheel', (event) => {
        // Check if scrolling down
        if (event.deltaY > 0) {
            navbar.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
});*/
