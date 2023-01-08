// Get max streak from cookie
const regex = /max-streak_boosting=([\d]+)/g;
const iconlist = ["&#xf2db;","","","",""]
const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)
let getMaxStreakFromCookie = (n) => {
    let str = getCookieValue('max-'+n+'streak');
    if(str !== '') 
        return parseInt(str, 10);
    else
        return 0;
}

let icons = []
let sleep = (ms, fn) => {return setTimeout(fn, ms)};
let amount = 3

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function Randomise() {
    
}

// Resets
document.querySelector('.splash .btn_again').addEventListener('click', function() {
    streak = 0;
    reset();
});


function start(){
    amount = randomIntFromInterval(3, 4)
    console.log(amount);
    document.querySelector('.splash').classList.add('hidden');
    document.querySelector('.groups').classList.remove('hidden','playing');
    SetupGame()
}

function reset(){
    start()
} 

function SetupGame(){
    let icons = document.createElement('div')
    icons.id = "icons"
    for (let index = 0; index < amount; index++) {
        let icon = document.createElement('div')
        icon.id = "id"+index
        icon.classList.add("fa")
        icon.style.fontSize = 64+"px"
        icon.style.marginBottom = "30px"
        icon.style.color = "white"
        //icon.classList.add("hacker")
        icon.innerHTML = "&#xf2db;"
        icons.append(icon)
    }

    let el = document.createElement('div')
    el.id = "GameArea"
    el.append(icons)
    document.querySelector('.groups').append(el)
}

function shuffle(){

}