const fruitForm = document.querySelector('#formSection form')
const fruitList = document.querySelector('#listSection')
const fruitLeft = document.querySelector('#listSection .new .left')
const fruitright = document.querySelector('#listSection .new .right')
const nextBtn = document.querySelector('body input')
const scores = document.querySelector('.container p span')
const container = document.querySelector('#listSection .container')

// random numbers between 1-151 for API on page load
let randomNumbers = [];
for(let i = 1; i < 152; i++) {
  randomNumbers.push(Math.floor(Math.random() * 151));
}

let rightPokeHP = 0;
let rightPokeName = ''
let leftPokeHP = 0;
let leftPokeName = ""

let score = 0

// loads the pokemon on document load by sending rand to API
document.addEventListener('DOMContentLoaded',randPokeId)

function randPokeId(e){
    e.preventDefault()
    leftPokeAPI(randomNumbers[0])
    rightPokeAPI(randomNumbers[1])
}

// sends to compare function which sends left[0] or right[1]
fruitLeft.addEventListener('click',collect)
fruitright.addEventListener('click',collect)

function collect(e){
    let classListVal = e.target.classList[0]
    if (classListVal == 'left' || classListVal == 'left-img'){
        compare(0)
    } else if (classListVal == 'right' || classListVal == 'right-img') {
        compare(1)
    }
}

// compares two pokemon by using rightPokeHP or leftPokeHP
function compare(input){
    // input = 0
    if (!input){
        if (leftPokeHP > rightPokeHP){
            alert(`Correct ${leftPokeName} has ${leftPokeHP}HP and is higher than ${rightPokeName} with ${rightPokeHP}HP`)
            score++
            if (score > 3){
                refreshScore()
            } else {
                rightPokeAPI(randomNumbers[Math.floor(Math.random()*151)])
            }
            
            currentPokemon = 'left'
        } else if (rightPokeHP > leftPokeHP) {
            score = 0
            alert(`incorrect ${rightPokeName} has ${rightPokeHP}HP and is higher than ${leftPokeName} with ${leftPokeHP}HP`)
            refreshScore()
        } else {
            alert('draw')
            refreshScore()
        }
    // input = 1
    } else {
        if (leftPokeHP > rightPokeHP){
            score = 0
            alert(`Incorrect ${leftPokeName} has ${leftPokeHP}HP and is higher than ${rightPokeName} with ${rightPokeHP}HP`)
            refreshScore()
        } else if (rightPokeHP > leftPokeHP) {
            alert(`Correct ${rightPokeName} has ${rightPokeHP}HP and is higher than ${leftPokeName} with ${leftPokeHP}HP`)
            score++
            if (score > 3){
                refreshScore()
            } else {
                leftPokeAPI(randomNumbers[Math.floor(Math.random()*151)])
            }
            currentPokemon = 'right'
        } else {
            alert('draw')
            refreshScore()
        }
    }
    scores.textContent = score
    
    
}

function refreshScore(){
    // feature for making it harder if you get a pokemon with high hp - randomises pokemon
    if (score == 4) {
        alert("Pokemon will now be randomised cos you are good at this game")
        rightPokeAPI(randomNumbers[Math.floor(Math.random()*151)])
        leftPokeAPI(randomNumbers[Math.floor(Math.random()*151)])
    } else if (score > 4 ) {
        rightPokeAPI(randomNumbers[Math.floor(Math.random()*151)])
        leftPokeAPI(randomNumbers[Math.floor(Math.random()*151)])
    } else {
        //incorrect or draw
        rightPokeAPI(randomNumbers[Math.floor(Math.random()*151)])
        leftPokeAPI(randomNumbers[Math.floor(Math.random()*151)])
    }
}

// left PokeAPI 
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
        }

    }catch(error) {
    console.log(error + "hello")
    }
}

// Adds pokemon to left 
function addLeft(param){
    if (document.querySelector('#listSection .new .left img')){
        leftImgEle.remove()
        leftLi.remove()
    }
    leftImgEle = document.createElement("img")
    leftLi = document.createElement('p')

    leftPokeHP = param['stats'][0]['base_stat']
    leftPokeName = param['forms'][0].name

    leftLi.textContent = param['forms'][0].name + ' ID:' + param['id']
    leftLi.classList = 'left-li'
    leftImgEle.classList = 'left-img'
    leftImgEle.style.height = '350px'
    leftImgEle.src = param['sprites']['front_default']
    
    fruitLeft.appendChild(leftImgEle)
    fruitLeft.appendChild(leftLi)
}

// right PokeAPI
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
        }

    }catch(error) {
    console.log(error + "hello")
    }
}

// Adds pokemon to right
function addright(param){
    if (document.querySelector('#listSection .new .right img')){
        rightImgEle.remove()
        rightLi.remove()
    }
        rightImgEle = document.createElement("img")
        rightLi = document.createElement('p')
    
        rightPokeHP = param['stats'][0]['base_stat']
        rightPokeName = param['forms'][0].name 

        rightLi.textContent = param['forms'][0].name + ' ID:' + param['id']
        rightLi.classList = 'right-li'
        rightImgEle.classList = 'right-img'
        rightImgEle.style.height = '350px'
        rightImgEle.src = param['sprites']['front_default']
    
        fruitright.appendChild(rightImgEle)
        fruitright.appendChild(rightLi)

}