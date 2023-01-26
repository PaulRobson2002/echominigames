// Get max streak from cookie
const regex = /max-streak_boosting=([\d]+)/g;
const iconlist = ["&#xf2db;","&#xf1c0;","&#xf233;","&#xf6ff;","&#xf011","&#xf019;","&#xf0a0"]
const colours = ["red","green","blue","cyan","orange","yellow","purple"]
let ColInUse = []
let IconInUse = []
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
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let amount = 3

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function PickRandom() {
    picked = randomIntFromInterval(1,IconInUse.length)
    console.log(picked)
    console.log(IconInUse[picked]);
    console.log(ColInUse[picked]);
    return [IconInUse[picked],ColInUse[picked]]
}

// Resets
document.querySelector('.splash .btn_again').addEventListener('click', function() {
    streak = 0;
    reset();
});


async function start(){
    amount = randomIntFromInterval(3, 4)
    //console.log(amount);
    document.querySelector('.splash').classList.add('hidden');
    document.querySelector('.groups').classList.remove('hidden','playing');
    shuffle()
}

function reset(){
    start()
} 

async function SetupGame(){
    let icons = document.createElement('div')
    icons.id = "icons"
    for (let index = 0; index < amount; index++) {

        let found = false
        while(IconInUse.length < amount || ColInUse.length < amount){
            if(IconInUse.length < amount){
                //console.log("Get Icons");
                await geticons()
            }
            if(ColInUse.length < amount){
                await getcolours()
            }
        }

    }
    //console.log(IconInUse)
    //console.log(ColInUse)
    for (let index = 0; index < amount; index++) {
        let icon = document.createElement('div')
        icon.id = "id"+index
        icon.classList.add("icon")
        icon.classList.add("fa")
        icon.style.fontSize = 64+"px"
        icon.style.marginBottom = "30px"
        icon.innerHTML = IconInUse[index] + "<p id=\"icontext\">" +ColInUse[index] +"</p>"
        icon.style.color = ColInUse[index]
        icon.style.textAlign = "center"
        icon.style.maxWidth = "140px"
        icons.append(icon)
    }
    let el = document.createElement('div')
    el.id = "GameArea"
    el.append(icons)
    document.querySelector('.groups').append(el)
}

async function shuffle(){
    let shuffAmount = randomIntFromInterval(10,15)
    for (let index = 0; index <= shuffAmount ; index++) {
        SetupGame()
        await sleep(950)
        let _gameArea = document.querySelector("#GameArea");
        //console.log(index);
        //console.log(shuffAmount);
        if(index!=shuffAmount){
            _gameArea.remove()
            ColInUse = []
            IconInUse = []
        }
        else{
            await sleep(10000)
            _gameArea.remove()
            Picked = PickRandom()
            console.log(Picked);
            let icon = document.createElement('div')
            icon.classList.add("icon")
            icon.classList.add("fa")
            icon.style.fontSize = 64+"px"
            icon.style.marginBottom = "30px"
            icon.style.color = "white"
            icon.innerHTML = Picked[0]
            let icons = document.createElement('div')
            icons.id = "icons"
            icons.appendChild(icon)
            let el = document.createElement('div')
            el.id = "GameArea"
            el.appendChild(icons)
            document.querySelector('.groups').append(el)
        }
    } 
}


async function geticons(){
    iconnum = randomIntFromInterval(0,iconlist.length-1)
    if (!IconInUse.includes(iconlist[iconnum])) {
        IconInUse.push(iconlist[iconnum])
    }
}

async function getcolours(){
    colour_num = randomIntFromInterval(0,colours.length-1)
    if(!ColInUse.includes(colours[colour_num])){
        ColInUse.push(colours[colour_num])
    }
}