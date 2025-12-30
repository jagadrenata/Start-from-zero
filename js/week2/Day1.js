import {lrcmerakit} from "../../assets/datas/week2/Day1.js"

function parseLrc(lrc) {
  const regex = /\[(\d{2})\:(\d{2}\.\d{2})\]\s*(.*)/;

  return lrc
    .split("\n")
    .map(line => {
      const match = line.match(regex);
      if (!match) return null;

      const [, minutes, seconds, lyric] = match;
      return {
        time: Number(minutes) * 60 + Number(seconds),
        lyric: lyric
      };
    })
    .filter(Boolean);
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const audio = document.getElementById("audio-merakit");
const container = document.getElementById("lyric");

const lyrics = parseLrc(lrcmerakit);

lyrics.forEach((l, i) => {
  const li = document.createElement("li");
  li.textContent = l.lyric;
  li.id = "line-" + i;
  container.appendChild(li);
});

let lastUserScrollTime = 0;
const SCROLL_COOLDOWN = 1000;

window.addEventListener("wheel", () => {
  lastUserScrollTime = Date.now();
}, { passive: true });

window.addEventListener("touchmove", () => {
  lastUserScrollTime = Date.now();
}, { passive: true });

const scrollIntoActive = debounce((li) => {
  li.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}, 150);

audio.addEventListener("timeupdate", () => {
  const current = audio.currentTime;

  lyrics.forEach((l, i) => {
    const li = document.getElementById("line-" + i);

    const isActive =
      current >= l.time &&
      (!lyrics[i + 1] || current < lyrics[i + 1].time);

    li.classList.toggle("active", isActive);

    if (isActive && Date.now() - lastUserScrollTime > SCROLL_COOLDOWN) {
      scrollIntoActive(li);
    }
  });
});
