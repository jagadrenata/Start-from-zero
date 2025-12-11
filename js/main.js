const projects = [
    {
      title: "Website Title 1",
      desc: "Dolore sunt nisi mollit veniam aute dolor est anim Lorem esse",
      badge: "html"
    },
    {
      title: "Website Title 2",
      desc: "Nisi nulla laboris aliquip mollit nulla id excepteur laboris",
      badge: "css"
    },
    {
      title: "Website Title 3",
      desc: "Veniam consequat proident nisi nulla laboris aliquip",
      badge: "javascript"
    },
    {
      title: "Website Title 4",
      desc: "Amet sunt labore dolore anim esse cupidatat",
      badge: "react"
    },
]

const makeCardHTML = (p) => `
      <div>
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
        <div class="project-badge-wrapper">
          <div class="project-badge">${p.badge}</div>
        </div>
      </div>
  `
  
const cards = document.querySelectorAll(".project-card")

console.log(cards)