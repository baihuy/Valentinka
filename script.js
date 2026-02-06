const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const mainText = document.getElementById("mainText");
const buttonArea = document.getElementById("buttonArea");
const subText = document.getElementById("subText");

//
// 🚫 NO button = elite escape artist
//
function moveNoButton() {
  const rect = noBtn.getBoundingClientRect();
  const moveRange = 160;

  let newX = rect.left + (Math.random() - 0.5) * moveRange;
  let newY = rect.top + (Math.random() - 0.5) * moveRange;

  newX = Math.max(10, Math.min(window.innerWidth - rect.width - 10, newX));
  newY = Math.max(10, Math.min(window.innerHeight - rect.height - 10, newY));

  noBtn.style.position = "fixed";
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("mousemove", moveNoButton);
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

//
// 📈 YES button grows more noticeably
//
let scale = 1;
const growInterval = setInterval(() => {
  scale += 0.05;
  yesBtn.style.transform = `scale(${scale})`;
}, 700);

//
// 🍆💦 Physics emojis — fully bounded & visible
//
const emojis = ["🍆", "💦"];
let floatingItems = [];
let animationRunning = false;
const EMOJI_SIZE = 120;

function createFloatingEmoji() {
  const el = document.createElement("div");
  el.className = "floating";
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  el.x = Math.random() * (window.innerWidth - EMOJI_SIZE);
  el.y = Math.random() * (window.innerHeight - EMOJI_SIZE);
  el.vx = (Math.random() - 0.5) * 5;
  el.vy = (Math.random() - 0.5) * 3;

  el.style.left = el.x + "px";
  el.style.top = el.y + "px";

  document.body.appendChild(el);
  floatingItems.push(el);
}

function animateEmojis() {
  floatingItems.forEach(el => {
    el.vy += 0.25;

    el.x += el.vx;
    el.y += el.vy;

    const maxX = window.innerWidth - EMOJI_SIZE;
    const maxY = window.innerHeight - EMOJI_SIZE;

    if (el.x <= 0) {
      el.x = 0;
      el.vx *= -1;
    }
    if (el.x >= maxX) {
      el.x = maxX;
      el.vx *= -1;
    }
    if (el.y >= maxY) {
      el.y = maxY;
      el.vy *= -0.8;
    }
    if (el.y <= 0) {
      el.y = 0;
      el.vy *= -1;
    }

    el.style.left = el.x + "px";
    el.style.top = el.y + "px";
  });

  requestAnimationFrame(animateEmojis);
}

//
// 💖 YES CLICKED → SECOND PAGE MODE
//
yesBtn.addEventListener("click", () => {
  clearInterval(growInterval);

  buttonArea.style.display = "none";
  subText.style.display = "none";

  mainText.innerHTML =
    "ЙЕСССС.<br>Не се и съмнявах";

  document.body.style.background = "#2E8B57";
  document.body.style.color = "#FEF9F3";

  setTimeout(() => {
    for (let i = 0; i < 18; i++) createFloatingEmoji();

    if (!animationRunning) {
      animationRunning = true;
      animateEmojis();
    }
  }, 150); // small delay helps Chrome render correctly
});
