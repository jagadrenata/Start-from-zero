import {lrcTheNights, lrcSelfHealing} from "../../assets/datas/week2/Day3.js"
const musicImage = document.getElementById("music-image")
const container = document.getElementById("lyric");
const musicInfo = document.getElementById("music-info")
const audio = document.getElementById("audio")
const progressContainer = document.getElementById("progress-container")
const progress = document.getElementById("progress")
const audioTime = document.getElementById("audio-time")
const audioToggle = document.getElementById("audio-toggle")
const toggle = document.querySelector(".toggle")
const forward = document.getElementById("forward")
const backward = document.getElementById("backward")
const musicList = document.querySelector(".music-list")

const playlist = [
  {
    title: "The Nights",
    artist: "Avicii",
    coverSrc: "../assets/images/Avicii_Nights_Artwork.jpeg",
    musicSrc: "../assets/musics/Avicii - The Nights (Lyrics) _my father told me_.mp3",
    lrc: lrcTheNights
  },
  {
    title: "Self Healing",
    artist: "Brian Rahmattio",
    coverSrc: "../assets/images/Brian Rahmattio - Self Healing.jpeg",
    musicSrc: "../assets/musics/Brian Rahmattio - Self Healing ( Music Video ).mp3",
    lrc: lrcSelfHealing
  },
  
]
let lyrics = []


const randMusic = playlist[Math.floor(Math.random() *  playlist.length)]
playPlaylist(randMusic)

function playPlaylist(song) {
  audio.src = song.musicSrc;

  musicImage.innerHTML = "";
  const img = document.createElement("img");
  img.src = song.coverSrc;
  musicImage.appendChild(img);

  musicInfo.innerHTML = "";
  const h2 = document.createElement("h2");
  const h4 = document.createElement("h4");
  h2.textContent = song.title;
  h4.textContent = song.artist;
  musicInfo.append(h2, h4);

  lyrics = loadLyrics(song.lrc);
}

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

let isPlay = false
audioToggle.onclick = () => {
    audio.paused ?  audio.play() : audio.pause();
    toggle.classList.toggle("fa-play", audio.paused)
    toggle.classList.toggle("fa-pause", !audio.paused)
};


//progress-container
audio.addEventListener('timeupdate', () => {
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
  
  //progress
  if(!audio.duration) return
  const percent = (current / audio.duration) * 100
  progress.style.width = percent+"%"
  
  //audio-time
  currentDuration.textContent = formatTime(current)
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


function loadLyrics(lrcText) {
  container.innerHTML = ""
  const lyrics = parseLrc(lrcText);
  
  lyrics.forEach((l, i) => {
    const li = document.createElement("li");
    li.textContent = l.lyric;
    li.id = "line-" + i;
    li.onclick = () => audio.currentTime = l.time;
    container.appendChild(li);
  });
  return lyrics
}



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
  
});

//audio-time
audioTime.innerHTML = ""
let currentDuration = document.createElement("p") 
let totalDuration = document.createElement("p") 
currentDuration.textContent = "0:00"
audioTime.append(currentDuration, totalDuration)

audio.addEventListener('loadedmetadata', () => {
  totalDuration.textContent = formatTime(audio.duration);
})




let index = playlist.indexOf(randMusic);

forward.onclick = () => {
  index = (index + 1) % playlist.length;
  playPlaylist(playlist[index]);
  audio.play()
};

backward.onclick = () => {
  index = (index - 1 + playlist.length) % playlist.length;
  playPlaylist(playlist[index]);
  audio.play()
};
audio.addEventListener('ended', () => {
  index = (index + 1) % playlist.length;
  playPlaylist(playlist[index]);
  audio.play()
})



//music list
function listTemplate(song, index) {
  return `
  <div class="neu-link list" data-index="${index}">
    <img src="${song.coverSrc}" class="links-img"></img>
    <div>
       <h3>${song.title}</h3>
       <p>${song.artist}</p>
    </div>
  </div>
  `
}
playlist.map((list, i) => {
  let element = listTemplate(list, i)
  musicList.insertAdjacentHTML("beforeend", element)
})
musicList.addEventListener('click', (e) => {
   const item = e.target.closest(".list")
   console.log(item);
   if(!item) return
   
   const index = item.dataset.index
   playPlaylist(playlist[index])
})
