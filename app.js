const fruitForm = document.querySelector('#formSection form')
const fruitList = document.querySelector('#listSection')
const fruitLeft = document.querySelector('#listSection .new .left')
const fruitright = document.querySelector('#listSection .new .right')
const scoresList = document.querySelectorAll('.scores p span')

// This line loads the page with two pokemon for compare()
document.addEventListener('DOMContentLoaded',randPokeId)
document.addEventListener('click',next)

let randomNumbers = [];
for(let i = 0; i < 100; i++) {
  randomNumbers.push(Math.floor(Math.random() * 151));
}

let score = 0 
let numberGames = 1 
let winPercent = score/numberGames

let leftPokeHP = 0;
let leftPokeName = ""
let rightPokeHP = 0;
let rightPokeName = ''

function next(e){
    e.preventDefault()
    // leftPokeAPI(randomNumbers[2])
    // rightPokeAPI(randomNumbers[3])
}

function compare(input){
    if (!input){
        // Left pokemon
        if (leftPokeHP > rightPokeHP){
            alert(`Correct ${leftPokeName} has ${leftPokeHP}HP and is higher than ${rightPokeName} with ${rightPokeHP}HP`)
            score++
        } else if (rightPokeHP > leftPokeHP) {
            alert(`incorrect ${rightPokeName} has ${rightPokeHP}HP and is higher than ${leftPokeName} with ${leftPokeHP}HP`)
        }
    } else {
        // right pokemon
        if (leftPokeHP > rightPokeHP){
            alert(`Incorrect ${leftPokeName} has ${leftPokeHP}HP and is higher than ${rightPokeName} with ${rightPokeHP}HP`)
        } else if (rightPokeHP > leftPokeHP) {
            alert(`Correct ${rightPokeName} has ${rightPokeHP}HP and is higher than ${leftPokeName} with ${leftPokeHP}HP`)
            score++
        }
    }
}

async function randPokeId(){
    if (randomNumbers[0] == randomNumbers[1]){
        leftPokeAPI(randomNumbers[1])
        rightPokeAPI(randomNumbers[2])
    } else {
        leftPokeAPI(randomNumbers[0])
        rightPokeAPI(randomNumbers[1])
    }
    
    numberGames++
}

// Add Left PokeApi Start

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

// add right PokeAPI Start 

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

async function addright(param){
    try {
        const response = await fetch(imgEle)

        if (!response.ok){
            console.log("hit")
            addrightEle(param)
        } else if (response.ok){
            imgEle.remove()
            li.remove()
            addrightEle(param)
        }
    }catch(error){
        console.log('addright '+ error)
    }
}

function addrightEle(param){
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