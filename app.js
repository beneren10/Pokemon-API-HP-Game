const fruitForm = document.querySelector('#formSection form')
const fruitList = document.querySelector('#listSection')
const fruitLeft = document.querySelector('#listSection .new .left')
const fruitright = document.querySelector('#listSection .new .right')
const nextBtn = document.querySelector('body input')

document.addEventListener('DOMContentLoaded',randPokeId)
document.addEventListener('click',next)

let randomNumbers = [];
for(let i = 0; i < 6; i++) {
  randomNumbers.push(Math.floor(Math.random() * 151));
}

let rightPokeHP = 0;
let rightPokeName = ''
let leftPokeHP = 0;
let leftPokeName = ""

function next(e){
    e.preventDefault()
}

function compare(input){
    if (!input){
        if (leftPokeHP > rightPokeHP){
            alert(`Correct ${leftPokeName} has ${leftPokeHP}HP and is higher than ${rightPokeName} with ${rightPokeHP}HP`)
        } else if (rightPokeHP > leftPokeHP) {
            alert(`incorrect ${rightPokeName} has ${rightPokeHP}HP and is lower than ${leftPokeName} with ${leftPokeHP}HP`)
        }
    } else {
        if (leftPokeHP > rightPokeHP){
            alert(`Incorrect ${leftPokeName} has ${leftPokeHP}HP and is lower than ${rightPokeName} with ${rightPokeHP}HP`)
        } else if (rightPokeHP > leftPokeHP) {
            alert(`Correct ${rightPokeName} has ${rightPokeHP}HP and is higher than ${leftPokeName} with ${leftPokeHP}HP`)
        }
    }
}

async function randPokeId(){
    leftPokeAPI(randomNumbers[0])
    rightPokeAPI(randomNumbers[1])
}

async function leftPokeAPI(value){
    const url = `https://pokeapi.co/api/v2/pokemon/${value}`
    try {
        const response = await fetch(url);

        if (!response.ok){
            throw new Error(alert("This message is from space, run away now"))
        }
        const pokeData = await response.json()
        if (typeof(value)=='number'){
            addLeft(pokeData)
            console.log(pokeData)
        }

    }catch(error) {
    console.log(error + "hello")
    }
}

function addLeft(param){
    imgEle = document.createElement("img")
    li = document.createElement('p')

    leftPokeHP = param['stats'][0]['base_stat']
    leftPokeName = param['forms'][0].name

    li.textContent = param['forms'][0].name + ' ID:' + param['id']
    imgEle.style.height = '400px'
    imgEle.src = param['sprites']['front_default']
    
    fruitLeft.appendChild(imgEle)
    fruitLeft.appendChild(li)
}

async function rightPokeAPI(value){
    const url = `https://pokeapi.co/api/v2/pokemon/${value}`
    try {
        const response = await fetch(url);

        if (!response.ok){
            throw new Error(alert("This message is from space, run away now"))
        }
        const pokeData = await response.json()
        if (typeof(value)=='number'){
            addright(pokeData)
            // console.log(pokeData)
        }

    }catch(error) {
    console.log(error + "hello")
    }
}

function addright(param){
    imgEle = document.createElement("img")
    li = document.createElement('p')
    
    rightPokeHP = param['stats'][0]['base_stat']
    rightPokeName = param['forms'][0].name 

    li.textContent = param['forms'][0].name + ' ID:' + param['id']
    imgEle.style.height = '400px'
    imgEle.src = param['sprites']['front_default']
    
    fruitright.appendChild(imgEle)
    fruitright.appendChild(li)
}