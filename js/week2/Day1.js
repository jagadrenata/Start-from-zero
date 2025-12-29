const lrcmerakit = `
[00:15.91]Percaya hatimu
[00:20.87]Kuatkan dirimu
[00:25.95]Tak pernah menyerah
[00:31.04]Berani melangkah
[00:35.24]
[00:36.13]Percaya tangismu
[00:41.10]Dan perjuanganmu
[00:46.20]Akan jadi kisah
[00:51.21]Terbaik di hidupmu, oh
[00:55.98]
[00:56.25]Tak apa terjatuh
[01:01.29]Bangkitlah dan tersenyumlah
[01:08.26]
[01:08.90]Kita terus maju
[01:13.91]Yakini diriku, yakini dirimu
[01:19.03]Semesta 'kan bantu
[01:24.01]Merakit mimpiku, merakit mimpimu
[01:28.92]
[01:29.09]Melesatlah seperti
[01:33.22]Peluru
[01:40.87]
[01:44.30]Keterbatasanku
[01:49.46]Jadi kelebihanku
[01:53.75]Jadi kekuatanku
[01:59.36]Keistimewaanku
[02:04.14]
[02:04.49]Tak apa terjatuh
[02:09.50]Bangkitlah dan tersenyumlah
[02:16.54]
[02:17.09]Kita terus maju
[02:22.10]Yakini diriku, yakini dirimu
[02:27.21]Semesta 'kan bantu
[02:32.27]Merakit mimpiku, merakit mimpimu
[02:37.18]
[02:37.18]Melesatlah seperti
[02:41.41]Peluru, oo-oh
[02:50.13]
[03:25.31]Kita terus maju
[03:30.40]Yakini diriku, yakini dirimu
[03:35.31]Semesta 'kan bantu
[03:40.46]Merakit mimpiku, merakit mimpimu
[03:45.20]
[03:45.53]Kita terus maju, oh
[03:50.54]Yakini diriku, yakini dirimu
[03:55.59]Semesta 'kan bantu
[04:00.71]Merakit mimpiku, merakit mimpimu
[04:05.76]
[04:05.75]Pasti kita 'kan mampu
[04:10.81]Melompat lebih jauh
[04:15.82]Melesatlah seperti
[04:19.92]Peluru
[04:29.02]
[04:21.23]Pasti kita mampu
[04:23.80]Merakit mimpiku
[04:26.30]Pasti kita mampu
[04:28.80]Merakit mimpimu
[04:30.65]
[04:31.36]Pasti kita mampu
[04:33.87]Merakit mimpiku
[04:36.33]Pasti kita mampu
[04:38.92]Merakit mimpimu
[04:40.73]
[04:41.45]Pasti kita mampu
[04:43.95]Merakit mimpiku
[04:46.45]Pasti kita mampu
[04:48.92]Merakit mimpimu
[04:51.52]
`.trim()

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
