const bgGrid = document.getElementById('bg-lines');
let scrollOffset = 0;
let passiveOffset = 0;

function animateBackground() {
  passiveOffset += 0.20;
  const totalOffset = scrollOffset + passiveOffset;
  bgGrid.style.backgroundPosition = `0 ${totalOffset}px`;
  requestAnimationFrame(animateBackground);
}

window.addEventListener('scroll', () => {
  scrollOffset = window.scrollY * 0.4;
});

let passiveX = 0;
function animateBackground() {
  passiveOffset += 0.20;
  passiveX += 0.20; // horizontal drift
  bgGrid.style.backgroundPosition = `${passiveX}px ${scrollOffset + passiveOffset}px`;
  requestAnimationFrame(animateBackground);
}

animateBackground();

document.querySelectorAll('.stack-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const angle = (Math.random() * 6 - 3).toFixed(2);
    card.style.transform = `rotate(${angle}deg) scale(1.1)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotate(0deg) scale(1)';
  });
});

const hero = document.getElementById('hero');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      hero.classList.remove('pop-in')
      void hero.offsetWidth;
      hero.classList.add('pop-in');
    } else {
      hero.classList.remove('pop-in');
    }
  });
}, { threshold: 0.6 });

observer.observe(hero);

const scrollIndicator = document.getElementById('scroll-indicator');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    scrollIndicator.style.opacity = '0';
  } else {
    scrollIndicator.style.opacity = '1';
  }
});

const phrases = [
  "Turning ideas into apps",
  "From imagination to implementation",
  "Building practical solutions"
];

const letters = "7~_=L0d#<>       ";
const dynamicText = document.getElementById("dynamic-text");
let currentPhrase = 0;

function scrambleText(newText) {
  let iterations = 0;
  const maxLength = newText.length;

  const interval = setInterval(() => {
    let output = "";
    for (let i = 0; i < maxLength; i++) {
      if (i < Math.floor(iterations)) {
        output += newText[i];
      } else {
        output += letters[Math.floor(Math.random() * letters.length)];
      }
    }
    dynamicText.textContent = output;

    if (iterations >= maxLength) {
      clearInterval(interval);
      dynamicText.textContent = newText;
    }

    iterations += 2;
  }, 50);
}

function changePhrase() {
  scrambleText(phrases[currentPhrase]);
  currentPhrase = (currentPhrase + 1) % phrases.length;
}

setInterval(changePhrase, 3000);
changePhrase();
