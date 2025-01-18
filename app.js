const fruitForm = document.querySelector('#formSection form')
const fruitList = document.querySelector('#listSection')
const fruitLeft = document.querySelector('#listSection .new .left')
const fruitright = document.querySelector('#listSection .new .right')
const nextBtn = document.querySelector('body input')

const scores = document.querySelectorAll('.container p span')

document.addEventListener('DOMContentLoaded',randPokeId)
document.addEventListener('click',next)

let randomNumbers = [];
for(let i = 0; i < 152; i++) {
  randomNumbers.push(Math.floor(Math.random() * 151));
}

let rightPokeHP = 0;
let rightPokeName = ''
let leftPokeHP = 0;
let leftPokeName = ""


let score = [0,0]

function next(e){
    e.preventDefault()
}

async function randPokeId(){
    leftPokeAPI(randomNumbers[0])
    rightPokeAPI(randomNumbers[1])
}

function compare(input){
    if (!input){
        if (leftPokeHP > rightPokeHP){
            alert(`Correct ${leftPokeName} has ${leftPokeHP}HP and is higher than ${rightPokeName} with ${rightPokeHP}HP`)
            rightPokeAPI(randomNumbers[Math.floor(Math.random()*151)])
        } else if (rightPokeHP > leftPokeHP) {
            alert(`incorrect ${rightPokeName} has ${rightPokeHP}HP and is lower than ${leftPokeName} with ${leftPokeHP}HP`)
            leftPokeAPI(randomNumbers[Math.floor(Math.random()*151)])
        }
        

    } else {
        if (leftPokeHP > rightPokeHP){
            alert(`Incorrect ${leftPokeName} has ${leftPokeHP}HP and is lower than ${rightPokeName} with ${rightPokeHP}HP`)
            rightPokeAPI(randomNumbers[Math.floor(Math.random()*151)])
        } else if (rightPokeHP > leftPokeHP) {
            alert(`Correct ${rightPokeName} has ${rightPokeHP}HP and is higher than ${leftPokeName} with ${leftPokeHP}HP`)
            leftPokeAPI(randomNumbers[Math.floor(Math.random()*151)])
        }
        
    }
    console.log(scores)
    // scores.forEach(span => {
    //     span[0].textContent = 'Games Played'
    //     span[1].textContent = 'Score'
    //     span[2].textContent = 'Win Percentage'
    // })
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
        }

    }catch(error) {
    console.log(error + "hello")
    }
}

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
    leftImgEle.style.height = '400px'
    leftImgEle.src = param['sprites']['front_default']
    
    fruitLeft.appendChild(leftImgEle)
    fruitLeft.appendChild(leftLi)
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
    if (document.querySelector('#listSection .new .right img')){
        console.log('hit')
        rightImgEle.remove()
        rightLi.remove()
    }
        rightImgEle = document.createElement("img")
        rightLi = document.createElement('p')
    
        rightPokeHP = param['stats'][0]['base_stat']
        rightPokeName = param['forms'][0].name 

        rightLi.textContent = param['forms'][0].name + ' ID:' + param['id']
        rightImgEle.style.height = '400px'
        rightImgEle.src = param['sprites']['front_default']
    
        fruitright.appendChild(rightImgEle)
        fruitright.appendChild(rightLi)

}