// ==========================================
// 🌟 DYNAMIC LOCAL IMAGES REGISTRATION SYSTEM 🌟
// ==========================================
const userUploadedImages = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg',
    'img6.jpg',
    'img7.jpg',
    'img8.jpg',
    'img9.jpg',
    'img10.jpg',
    'img11.jpg',
    'img12.jpg',
    'img13.jpg',
    'img14.jpg'
];

// ==========================================
// 🌟 DYNAMIC LOCAL MP4 VIDEOS REGISTRATION 🌟
// ==========================================
const userUploadedVideos = [
    'MBit Music-010722-042555.mp4',
    'MBit Music-020722-121103.mp4',
    'MBit Music-020723-060518.mp4',
    'MBit Music-100422-030346.mp4',
    'MBit Music-100422-031949.mp4',
    'MBit Music-181222-052535.mp4',
    'MBit Music-300622-084021.mp4'
];

let ytPlayingState = true;
let audioFadeInterval = null;

// Pagination variables for Image Gallery
let currentRenderedIndex = 0;
const IMAGES_PER_BATCH = 6; 

document.addEventListener('DOMContentLoaded', () => {
    
    document.documentElement.style.setProperty('--img-count', userUploadedImages.length);

    // Bind Interface Elements
    const gateway = document.getElementById('welcome-screen');
    if (gateway) gateway.addEventListener('click', initMagicEnvironment);

    const musicBtn = document.getElementById('music-toggle-btn');
    if (musicBtn) musicBtn.addEventListener('click', toggleMusicManually);

    const ytBtn = document.getElementById('yt-control-btn');
    if (ytBtn) ytBtn.addEventListener('click', toggleYouTubeVideo);

    // See More Button Listener
    const seeMoreBtn = document.getElementById('see-more-btn');
    if (seeMoreBtn) seeMoreBtn.addEventListener('click', loadNextImageBatch);

    // Dynamic Ring Box Click Listeners
    const localBox = document.getElementById('scrolling-ring-box');
    if (localBox) localBox.addEventListener('click', launchProposalPopup);

    const yesBtn = document.getElementById('yes-button');
    if (yesBtn) yesBtn.addEventListener('click', closeProposalPopup);

    // Secret Gift Click Surprise Listener (NEW)
    const revealGiftBtn = document.getElementById('reveal-gift-btn');
    if (revealGiftBtn) revealGiftBtn.addEventListener('click', triggerSecretGiftSurprise);

    // Asset Loading Initialization
    buildInitialAssetStructures();

    // Precision Live Anniversary Counter Strategy (2019/12/11)
    const anniversaryDate = new Date('2019-12-11T00:00:00').getTime();
    setInterval(() => {
        const diff = new Date().getTime() - anniversaryDate;
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if(document.getElementById('days')) {
            document.getElementById('days').innerText = d < 10 ? '0'+d : d;
            document.getElementById('hours').innerText = h < 10 ? '0'+h : h;
            document.getElementById('mins').innerText = m < 10 ? '0'+m : m;
            document.getElementById('secs').innerText = s < 10 ? '0'+s : s;
        }
    }, 1000);
});

// Dynamic Asset Builder Architecture Engine
function buildInitialAssetStructures() {
    const track = document.getElementById('auto-image-track');
    const videoGrid = document.getElementById('local-video-grid');
    
    if(userUploadedImages.length > 0) {
        const doubleList = [...userUploadedImages, ...userUploadedImages]; 
        doubleList.forEach((filename) => {
            const card = document.createElement('div');
            card.className = 'slider-card';
            const img = document.createElement('img');
            img.src = `images/${filename}`;
            card.appendChild(img);
            if(track) track.appendChild(card);
        });

        loadNextImageBatch();
    }

    userUploadedVideos.forEach((filename) => {
        const card = document.createElement('div');
        card.className = 'local-video-card scroll-fade-element';

        const video = document.createElement('video');
        video.src = `videos/${filename}`;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('preload', 'auto');
        
        const btn = document.createElement('button');
        btn.className = 'custom-video-btn';
        btn.innerText = '⏸ Pause';

        btn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                btn.innerText = '⏸ Pause';
            } else {
                video.pause();
                btn.innerText = '▶ Play';
            }
        });

        card.appendChild(video);
        card.appendChild(btn);
        if(videoGrid) videoGrid.appendChild(card);
    });
}

// Incremental Image Batch Loading Engine
function loadNextImageBatch() {
    const grid = document.getElementById('gallery-grid');
    const seeMoreBtn = document.getElementById('see-more-btn');
    if (!grid) return;

    const nextBatchLimit = currentRenderedIndex + IMAGES_PER_BATCH;
    const itemsToRender = userUploadedImages.slice(currentRenderedIndex, nextBatchLimit);

    itemsToRender.forEach((filename) => {
        const frame = document.createElement('div');
        frame.className = 'photo-frame scroll-fade-element revealed'; 
        const randomTilt = (Math.random() * 8 - 4).toFixed(2);
        frame.style.setProperty('--rotation', `${randomTilt}deg`);

        const img = document.createElement('img');
        img.src = `images/${filename}`;

        frame.appendChild(img);
        grid.appendChild(frame);
    });

    currentRenderedIndex = nextBatchLimit;

    if (currentRenderedIndex >= userUploadedImages.length && seeMoreBtn) {
        seeMoreBtn.style.display = 'none';
    }
}

// Global Main Activator
function initMagicEnvironment() {
    const welcome = document.getElementById('welcome-screen');
    const main = document.getElementById('main-content');
    const musicBtn = document.getElementById('music-toggle-btn');
    
    welcome.style.opacity = '0';
    welcome.style.transform = 'translateY(-100vh)';
    
    setTimeout(() => {
        welcome.style.display = 'none';
        main.style.display = 'block';
        if(musicBtn) musicBtn.classList.remove('hidden-btn');
        
        setTimeout(() => { 
            main.style.opacity = '1'; 
            initAdvancedScrollFadeMechanics();
            playAllLocalVideos(); 
        }, 50);
    }, 800);

    attemptAudioPlay();
}

// Global Local Clips Trigger
function playAllLocalVideos() {
    const videos = document.querySelectorAll('.local-video-card video');
    videos.forEach(v => {
        v.play().catch(err => console.log("Local video autoplay log interrupted", err));
    });
}

// YouTube Player JavaScript API Bridge Toggle
function toggleYouTubeVideo() {
    const iframe = document.getElementById('youtube-player');
    const btn = document.getElementById('yt-control-btn');
    if (!iframe || !btn) return;

    if (ytPlayingState) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        btn.innerText = "▶ Play Video";
        ytPlayingState = false;
    } else {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        btn.innerText = "⏸ Pause Video";
        ytPlayingState = true;
    }
}

// Media Track Audio Playback Drivers (FIXED 50% VOLUME INTENSITY TARGET NATIVELY)
function attemptAudioPlay() {
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle-btn');
    
    if (audio) {
        audio.volume = 0.5; // Strict 50% ambient volume ceiling configuration
        audio.play().then(() => {
            if(musicBtn) {
                musicBtn.innerText = "⏸ Pause Music";
                musicBtn.classList.add('playing');
            }
        }).catch(err => {
            console.log("Audio contexts pending verification.", err);
        });
    }
}

function toggleMusicManually() {
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle-btn');
    if (!audio || !musicBtn) return;

    if (audio.paused) {
        audio.play();
        audio.volume = 0.5;
        musicBtn.innerText = "⏸ Pause Music";
        musicBtn.classList.add('playing');
    } else {
        audio.pause();
        musicBtn.innerText = "🎵 Play Music";
        musicBtn.classList.remove('playing');
    }
}

// 🌟 INTERACTIVE SECRET GIFT VISUAL SURPRISE ENGINE (NEW) 🌟
function triggerSecretGiftSurprise() {
    const wrapper = document.getElementById('secret-gift-wrapper');
    const cover = document.getElementById('gift-mystery-cover');
    const content = document.getElementById('gift-unveiled-content');
    
    if(!wrapper || !cover || !content) return;

    // 1. Swap visibility wrappers smoothly
    cover.style.display = 'none';
    wrapper.classList.remove('gift-sealed');
    wrapper.classList.add('gift-opened');
    content.classList.remove('gift-content-hidden');
    
    // 2. Trigger dual-side horizontal vector canvas firework particles explosion
    launchSurpriseFireworksEngine();
}

function launchSurpriseFireworksEngine() {
    const container = document.getElementById('fireworks-container');
    if(!container) return;

    // Build immediate double explosion flashes on both edges of screen
    for (let side = 0; side < 2; side++) {
        const isLeft = side === 0;
        const spawnX = isLeft ? window.innerWidth * 0.2 : window.innerWidth * 0.8;
        const spawnY = window.innerHeight * 0.6;

        // Generate particle fragments arrays
        for(let p = 0; p < 60; p++) {
            const star = document.createElement('div');
            star.innerHTML = Math.random() > 0.5 ? '✨' : (Math.random() > 0.5 ? '🎉' : '💖');
            star.style.position = 'fixed';
            star.style.left = spawnX + 'px';
            star.style.top = spawnY + 'px';
            star.style.fontSize = Math.random() * 16 + 12 + 'px';
            star.style.zIndex = '19000';
            star.style.pointerEvents = 'none';
            star.style.transition = 'transform 1.8s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1.8s ease-out';
            
            container.appendChild(star);

            // Compute dynamic target trajectories
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 250 + 100;
            const targetX = Math.cos(angle) * velocity;
            const targetY = Math.sin(angle) * velocity + 100; // Adding gravity force simulation downward

            setTimeout(() => {
                star.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.5)`;
                star.style.opacity = '0';
            }, 30);

            setTimeout(() => { star.remove(); }, 1900);
        }
    }
}

// --- INTERACTIVE POPUP PROPOSAL ENGINE ---
function launchProposalPopup() {
    const overlay = document.getElementById('ring-popup-overlay');
    const popupBox = document.getElementById('popup-box-model');
    const bgMusic = document.getElementById('bg-music');
    const proposalTone = document.getElementById('proposal-tone');

    if (!overlay || !popupBox) return;

    overlay.classList.remove('popup-overlay-hidden');
    
    let angle = 0;
    clearInterval(window.popupSpinInterval); 
    window.popupSpinInterval = setInterval(() => {
        angle += 1;
        popupBox.style.transform = `rotateX(-20deg) rotateY(${angle}deg)`;
    }, 30);

    setTimeout(() => {
        popupBox.classList.add('open');
    }, 600);

    fadeAudioChannel(bgMusic, 'out', 800, () => {
        if(proposalTone) {
            proposalTone.currentTime = 0;
            proposalTone.volume = 0.5; // Maintain soft target tone parameters
            proposalTone.play().catch(e => console.log("Audio unblock context trace", e));
        }
    });
}

function closeProposalPopup() {
    const overlay = document.getElementById('ring-popup-overlay');
    const popupBox = document.getElementById('popup-box-model');
    const bgMusic = document.getElementById('bg-music');
    const proposalTone = document.getElementById('proposal-tone');

    if (!overlay || !popupBox) return;

    popupBox.classList.remove('open');
    clearInterval(window.popupSpinInterval);

    setTimeout(() => {
        overlay.classList.add('popup-overlay-hidden');
    }, 500);

    if(proposalTone) proposalTone.pause();
    fadeAudioChannel(bgMusic, 'in', 1000);
}

function fadeAudioChannel(audioElement, direction, duration, callback) {
    if (!audioElement) return;
    clearInterval(audioFadeInterval);

    const steps = 20;
    const stepTime = duration / steps;
    let currentStep = 0;

    if (direction === 'in') {
        audioElement.volume = 0;
        audioElement.play().catch(e => console.log(e));
    }

    audioFadeInterval = setInterval(() => {
        currentStep++;
        let maxCap = 0.5; // Ensure cross-fades cap at strict 50% limit settings
        let targetVolume = direction === 'out' ? maxCap - (currentStep / steps) * maxCap : (currentStep / steps) * maxCap;
        audioElement.volume = Math.max(0, Math.min(maxCap, targetVolume));

        if (currentStep >= steps) {
            clearInterval(audioFadeInterval);
            if (direction === 'out') audioElement.pause();
            if (callback) callback();
        }
    }, stepTime);
}

// --- Smooth 3D Objects Scroll Transform Mechanics ---
function initAdvancedScrollFadeMechanics() {
    const fadeElements = document.querySelectorAll('.scroll-fade-element');
    const heartContainer = document.getElementById('scrolling-cake');
    const ringBoxContainer = document.getElementById('scrolling-ring-box');
    const ringBoxLid = document.getElementById('ring-box-lid');
    
    const triggerCoreScrollActions = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 50 && rect.bottom > 0;
            if(isVisible) {
                el.classList.add('revealed'); 
            }
        });

        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
        if(maxScroll > 0) {
            const percent = scrollY / maxScroll;
            
            if(heartContainer) {
                const isMobile = window.innerWidth < 768;
                const horizontalFactor = isMobile ? 30 : 150; 
                const horizontalOffset = isMobile ? 4 : 12;
                const verticalTravelDistance = isMobile ? 45 : 55;

                const xShiftPosition = Math.sin(percent * Math.PI * 2) * horizontalFactor;
                const yShiftPosition = 25 + (percent * verticalTravelDistance);

                heartContainer.style.right = `calc(${horizontalOffset}% - ${xShiftPosition}px)`;
                heartContainer.style.top = `${yShiftPosition}%`;
            }

            if(ringBoxContainer && ringBoxLid) {
                const ringBoxSection = document.querySelector('.promises-section');
                const boxRect = ringBoxSection.getBoundingClientRect();
                
                const sectionHeight = ringBoxSection.offsetHeight;
                const entryPoint = window.innerHeight - boxRect.top;
                
                let boxProgress = entryPoint / (window.innerHeight + sectionHeight);
                boxProgress = Math.max(0, Math.min(1, boxProgress));

                const targetLidAngle = -110 - (boxProgress * 70);
                ringBoxLid.style.transform = `rotateX(${targetLidAngle}deg) translateY(-120px)`;

                const boxWaveX = Math.sin(boxProgress * Math.PI) * 20;
                const boxModel = ringBoxContainer.querySelector('.ring-box-3d');
                
                const overlay = document.getElementById('ring-popup-overlay');
                const isOverlayHidden = overlay ? overlay.classList.contains('popup-overlay-hidden') : true;

                if(boxModel && isOverlayHidden) {
                    boxModel.style.transform = `rotateX(-25deg) rotateY(${35 + (scrollY * 0.05)}deg) translateX(${boxWaveX}px)`;
                }
            }
        }
    };

    window.addEventListener('scroll', triggerCoreScrollActions);
    triggerCoreScrollActions();
}

// Ambient Background Float Hearts Engine
setInterval(() => {
    const main = document.getElementById('main-content');
    if (!main || main.style.display !== 'block') return;
    
    const container = document.getElementById('particles');
    if (!container) return;

    const particle = document.createElement('div');
    particle.innerHTML = Math.random() > 0.4 ? '❤️' : '✨';
    particle.style.position = 'absolute';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '100vh';
    particle.style.fontSize = Math.random() * 14 + 10 + 'px';
    particle.style.opacity = Math.random() * 0.6 + 0.4;
    particle.style.transition = 'transform 7s linear, opacity 7s linear';
    particle.style.pointerEvents = 'none';
    
    container.appendChild(particle);

    setTimeout(() => {
        particle.style.transform = `translateY(-105vh) translateX(${Math.random() * 80 - 40}px)`;
        particle.style.opacity = '0';
    }, 50);

    setTimeout(() => { particle.remove(); }, 7100);
}, 500);


