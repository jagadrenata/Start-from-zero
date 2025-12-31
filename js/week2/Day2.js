import calendar from '../../calendar.js';
const hourItem = document.getElementById("hour")
const dayItem = document.getElementById("day")
const dateItem = document.getElementById("date")


const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const date = new Date()

hourItem.textContent = date.getHours() + ":" + date.getMinutes()
dayItem.textContent = weekday[date.getDay()]
calendar.map((cal) => {
  let findDate = cal.find(c => c.date === date.getDate() && c.month === (date.getMonth() + 1))
  if (findDate) {
    dateItem.textContent = "day" + findDate.day + "/week" + findDate.week + "/" + findDate.year
  }
  return findDate
  
})

setInterval(() => {
  hourItem.textContent = date.getHours() + ":" + date.getMinutes()
}, 10000)



//links
const socials = [
{
  name: "Instagram ",
  href: "https://instagram.com/jagadrenata",
  path: "@jagadrenata",
  icon: "fa-brands fa-instagram"
},
{
  name: "Wanna to talk?",
  href: "mailto:jagadrenata001@gmail.com",
  path: "jagadrenata001@gmail.com",
  icon: "fa-solid fa-envelope"
}]
const links = document.querySelector('.links')

function linkTemplate(name = "", href = "", path = "", icon = "") {
  return `
  <a href="${href}" class="neu-link">
    <i class="${icon} links-img"></i>
    <div>
       <h3>${name}</h3>
       <p>${path}</p>
    </div>
  </a>
  `
}
socials.map((social) => {
  let element = linkTemplate(social.name, social.href, social.path, social.icon)
  links.insertAdjacentHTML("beforeend", element)
})