const links = document.querySelector("#links")
const hamburger = document.querySelector("#hamburger")
const body = document.querySelector('body')

let timeout = false
    delay = 250
    calls = 0
    hamburgerActive = false

hamburger.addEventListener("click", handleClickHamburgerMenu)

function handleClickHamburgerMenu() {
    hamburgerActive = !hamburgerActive
    if (hamburgerActive) {
        links.classList.add("active")
        hamburger.classList.add("open")
        body.classList.add('open')
    } else {
        links.classList.remove("active")
        hamburger.classList.remove("open")
        body.classList.remove('open')
    }
}

function checkMediaQuery(e) {
    // If the inner width of the window is greater then 768px
    if (window.innerWidth >= 768) {
        // Then log this message to the console
        hamburgerActive = false
        links.classList.remove("active")
        hamburger.classList.remove("open")
    }
}

var mql = window.matchMedia('(min-width: 768px)');
mql.addEventListener('change', () => {
    clearTimeout(timeout);
    // start timing for event "completion"
    timeout = setTimeout(checkMediaQuery, delay);
})

