import {lrcTheNights} from "../../assets/datas/week2/Day3.js"
const musicImage = document.getElementById("music-image")
const musicInfo = document.getElementById("music-info")
const audio = document.getElementById("audio")
const progressContainer = document.getElementById("progress-container")
const progress = document.getElementById("progress")
const audioTime = document.getElementById("audio-time")
const audioToggle = document.getElementById("audio-toggle")
const forward = document.getElementById("forward")
const backward = document.getElementById("backward")

const playlist = [
  {
    title: "The Nights",
    artist: "Avicii",
    imageSrc: "/",
    audioSrc: "/",
    lrc: lrcTheNights
  },
  {
    title: "Self Healing",
    artist: "...?",
    imageSrc: "/",
    audioSrc: "/",
    lrc: lrcSelfHealing
  },
  
]

audio.src = './Avicii - The Nights (Lyrics) _my father told me_.mp3'
let isPlay = false
audioToggle.addEventListener('click', () => {
  if(isPlay) {
    audio.pause()
    console.log('pause')
    isPlay = false
  } else {
    audio.play()
    console.log('play')
    isPlay = true
  }
})


// music-image
let img = document.createElement('img')
img.src = "../day2/1765452308641.png"

musicImage.appendChild(img)

//music-info
let musicTitle = document.createElement("h2")
let musicArtis = document.createElement("h4")
musicTitle.textContent = "The Nights"
musicArtis.textContent = "Avicii"

musicInfo.appendChild(musicTitle)
musicInfo.appendChild(musicArtis)

//progress-container
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100
  progress.style.width = percent+"%"
})

progressContainer.addEventListener("click", (e) => {
  let width = progressContainer.clientWidth
  let clickX = e.offsetX
  audio.currentTime = (clickX / width) * audio.duration
  console.log(audio.currentTime)
})

//lyrics 
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


const container = document.getElementById("lyric");

const lyricsTheNights = parseLrc(lrcTheNights);

lyricsTheNights.forEach((l, i) => {
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

  lyricsTheNights.forEach((l, i) => {
    const li = document.getElementById("line-" + i);

    const isActive =
      current >= l.time &&
      (!lyricsTheNights[i + 1] || current < lyricsTheNights[i + 1].time);

    li.classList.toggle("active", isActive);

    if (isActive && Date.now() - lastUserScrollTime > SCROLL_COOLDOWN) {
      scrollIntoActive(li);
    }
    li.addEventListener('click', () => {
      audio.currentTime = l.time
    })
  });
});
