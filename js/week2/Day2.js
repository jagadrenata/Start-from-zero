const hourItem = document.getElementById("hour")
const dayItem = document.getElementById("day")
const dateItem = document.getElementById("date")

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const date = new Date()
hourItem.textContent = date.getHours()+":"+date.getMinutes()
dayItem.textContent = weekday[date.getDay()]
dateItem.textContent = date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()

setInterval(() => {
  hourItem.textContent = date.getHours()+":"+date.getMinutes()  
}, 10000)
