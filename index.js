const input = document.querySelector("#input")
const parentElement = document.querySelector(".main-content")
const regions = document.querySelectorAll(".region")
const form = document.querySelector(".form")
const filterBtn = document.querySelector(".filter")
const dropDown = document.querySelector(".dropdown-content")
const dropDownParent = document.querySelector(".dropdown")
const control = document.querySelector(".controls")

const allURL = `https://restcountries.com/v3.1/all`
const regionURL = `https://restcountries.com/v3.1/region/`
const nameURL = `https://restcountries.com/v3.1/name/`
const codeURL = `https://restcountries.com/v3.1/alpha/`

let loader = `<div class='gif-parent'></div>`

let darkMode = localStorage.getItem("darkMode")

const toggleIcon = document.querySelector("#toggle-icon")
const darkModeToggle = document.querySelector("#dark-mode-toggle")
const text = document.getElementById("dark-mode-text")

const enableDarkMode = () => {
  document.body.classList.add("darkmode")
  localStorage.setItem("darkMode", "enabled")
  darkModeToggle.src = "./moon-fill-white.svg"
  text.innerText = "Dark Mode"
}

const disableDarkMode = () => {
  document.body.classList.remove("darkmode")
  localStorage.setItem("darkMode", "null")
  darkModeToggle.src = "./moon.svg"
  text.innerText = "Light Mode"
}
if (darkMode === "enabled") {
  enableDarkMode()
}
toggleIcon.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode")
  //alert('clicked')
  if (darkMode !== "enabled") {
    enableDarkMode()
    //alert('darkmode')
  } else {
    disableDarkMode()
  }
})

const showLoader = () => {
  parentElement.innerHTML = loader
}
const hideLoader = () => {
  let item = document.querySelector(".gif-parent")
  if (item) {
    parentElement.removeChild(item)
  }
}

const getDetail = async (url) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    if (data) {
      localStorage.setItem("countrydata", JSON.stringify(data))
      window.location.replace("./detail.html")
    }
  } catch (error) {
    console.log(error)
  }
}

const newDetail = (e) => {
  let item = e.currentTarget
  let countryName = item.firstChild.nextElementSibling.innerText
  getDetail(`${nameURL}${countryName}`)
}

const fetchData = async (url) => {
  showLoader()
  try {
    const response = await fetch(url)
    const data = await response.json()
    if (data.length >= 1) {
      data.forEach((item) => {
        const { name, flags, population, capital, region } = item
        let newPopulation = population.toLocaleString()
        const element = document.createElement("div")
        element.classList.add("country")
        element.innerHTML = `<div class="flag"><img src="${flags.png}" alt="flag-img" /></div>
          <h3 class="name">${name.common}</h3>
          <p class="population"><span class="innertxt">Population:</span> ${newPopulation}</p>
          <p class="region"><span class="innertxt">Region:</span> ${region}</p>
          <p class="capital"><span class="innertxt">Capital:</span> ${capital}</p>`
        parentElement.append(element)

        const country = document.querySelectorAll(".country")
        country.forEach((item) => {
          item.addEventListener("click", newDetail)
        })
      })
    } else if (data.status === 404) {
      parentElement.innerHTML = `<h3 class="no-data">sorry!, No country matches your search</h3>`
    }
  } catch (error) {
    console.log(error)
  } finally {
    hideLoader()
  }
}
// fetchData(allURL)

const inputValue = (e) => {
  e.preventDefault()
  const value = input.value
  if (value) {
    fetchData(`${nameURL}${value}`)
    input.value = ""
  } else if (!value) {
    fetchData(allURL)
  }
}
const onInputValue = (e) => {
  e.preventDefault()
  const value = input.value
  if (value) {
    fetchData(`${nameURL}${value}`)
  } else if (!value) {
    fetchData(allURL)
  }
}
let flag = false
const toggleFilter = () => {
  const icon = document.querySelector(".fa-chevron-down")
  flag
    ? icon.classList.add("fa-rotate-180")
    : icon.classList.remove("fa-rotate-180")
  if (flag) {
    dropDown.classList.add("hide-dropdown")
    dropDown.classList.remove("show-dropdown")
  } else {
    dropDown.classList.remove("hide-dropdown")
    dropDown.classList.add("show-dropdown")
  }
  flag = !flag
}
// event listeners
regions.forEach((item) => {
  item.addEventListener("click", () => {
    let continent = item.textContent
    fetchData(`${regionURL}${continent}`)
  })
})
if (document.body.id === "index") {
  let width = window.innerWidth
  let sticky = control.offsetTop
  // let formHeight = form.offsetHeight
  // let width = window.innerWidth
  // let smallSticky = form.offsetTop

  const stickyFunc = () => {
    if (width <= 769) {
      if (window.pageYOffset >= sticky) {
        form.classList.add("sticky")
        control.classList.add("padding")
      } else {
        form.classList.remove("sticky")
        control.classList.remove("padding")
      }
    } else if (width > 769) {
      if (window.pageYOffset > sticky) {
        control.classList.add("sticky")
        parentElement.classList.add("padding")
      } else {
        control.classList.remove("sticky")
        parentElement.classList.remove("padding")
      }
    }
  }

  fetchData(allURL)
  form.addEventListener("submit", inputValue)
  input.addEventListener("input", onInputValue)
  filterBtn.addEventListener("click", toggleFilter)
  window.addEventListener("scroll", stickyFunc)
  window.addEventListener("resize", () => {
    width = window.innerWidth
  })
} else if (document.body.id === "detail") {
  const details = document.querySelector(".detail")
  const returnBtn = document.querySelector(".return-btn")

  const extraDetail = (e) => {
    let item = e.currentTarget
    let countryName = item.innerText
    getDetail(`${nameURL}${countryName}`)
  }

  let data = JSON.parse(localStorage.getItem("countrydata"))
  const {
    flags,
    name,
    region,
    subregion,
    population,
    capital,
    languages,
    currencies,
    cca2,
    borders,
  } = data[0]
  let names = name.nativeName
  let newPopulation = population.toLocaleString()
  details.innerHTML = ` <div class="detail-img-parent">
          <img src="${flags.png}" alt="flag" />
        </div>
       <div class="detail-content">
          <h2 class="detail-name">${name.common}</h2>
          <div class="inner-detail">
          <div>
          <div class="native-name"><span class ="innertxt">native name:</span> ${
            names[Object.keys(names)[Object.keys(names).length - 1]].common
          }</div>
          <div class="detail-pop"><span class ="innertxt">population: </span> ${newPopulation}</div>
          <div class="detail-region"><span class ="innertxt">region: </span>${region}</div>
          <div class="sub-region"><span class ="innertxt">sub region: </span>${subregion}</div>
          <div class="detail-capital"><span class ="innertxt">capital: </span> ${capital}</div>
          </div>
          <div>
          <div class="tld"><span class ="innertxt">top level domain: </span>${cca2.toLowerCase()}</div>
          <div class="currencies"><span class ="innertxt">currencies:</span> ${
            currencies[Object.keys(currencies)[0]].name
          }</div>
          <div class="languages"><span class ="innertxt">languages:</span> ${Object.values(
            languages
          ).toString()}</div>
          </div>
          </div>
        <div class="border-country">
        <div class="country-btn-parent">
        </div>
        </div>
        </div>
        `
  const borderCountry = document.querySelector(".border-country")
  const countryBtnParent = document.querySelector(".country-btn-parent")
  if (borders) {
    // borderCountry.innerHTML = `<div class ="bordertxt">border countries: </div>`
    const countries = document.createElement("div")
    countries.classList.add("bordertxt")
    countries.textContent = `border countries: `
    borderCountry.prepend(countries)

    let bordersArr = Object.values(borders)
    bordersArr =
      bordersArr.length < 3 && bordersArr.length > 0
        ? bordersArr.slice(0, bordersArr.length)
        : bordersArr.slice(0, 3)
    bordersArr.forEach(async (item) => {
      try {
        const response = await fetch(`${codeURL}${item}`)
        const newData = await response.json()
        if (newData) {
          let countryName = newData[0].name.common
          const newElement = document.createElement("button")
          newElement.classList.add("country-btn")
          newElement.innerText = `${countryName}`
          countryBtnParent.appendChild(newElement)
          newElement.addEventListener("click", extraDetail)
        }
      } catch (error) {
        console.log(error)
      }
    })
  }
  returnBtn.addEventListener("click", () => {
    window.location.replace("./index.html")
  })
}
