const spaces = document.getElementById("room");
let currentX = 2;
let currentY = 2;
let moves = 30;
let health = 30;
let damage = 1;
let weapon = "fists";
let playerName = "Player";
let enemies = 4;

let swordX = Number(Math.round(Math.random() * 4));
let swordy = Number(Math.round(Math.random() * 4));


let enemyName = 'goblin';
let enemyStrength = 3;
let enemyHealth = 20;

let currentEnemyName;
let currentEnemyHealth = 20;
let currentEnemyStrength = 2;

function updateHealth(){
    (document.getElementById("PlayerHealth").innerText = "Current Health: " + health);
}

function updateWeapon(){
    (document.getElementById("PlayerWeapon").innerText = "Current Weapon: " + weapon);
    (document.getElementById("PlayerDamage").innerText = " Damage: " + damage);
}

/* ------------------------------------------------------------ MOVEMENT ------------------------------------------------------------ */

function Up (){
    console.log("Move Up");
    //set inner html of current to 0
    //change current possition
    // set inner html of current to P
    changeSpace();
    currentY = (--currentY % 5) + (currentY < 0 ? 5 : 0);
    checkSpace();   
    updateMoves();
}
function Down (){
    console.log("Move Down")
    changeSpace();
    currentY = (++currentY % 5) + (currentY < 0 ? 5 : 0);
    checkSpace();
    updateMoves();
}
function Left (){
    console.log("Mover Left")

    changeSpace();
    currentX = (--currentX % 5) + (currentX < 0 ? 5 : 0);
    checkSpace();
    updateMoves();
}
function Right (){
    console.log("Move Right")
    changeSpace();
    currentX = ++currentX % 5; 
    checkSpace();
    updateMoves();
}

function movementButtons(){
    let x = document.getElementsByClassName("btn move");
    let i = 0;
    for (i = 0; i < x.length; i++){
        if(x[i].disabled === true){
            x[i].disabled = false;
        }
        else{
            x[i].disabled = true;
        }
    }
}

//updates moves after each movement decision, disables game if you lose
function updateMoves(){
    --moves;
    document.getElementById("Moves").innerHTML = `Moves Left: ${moves}`;
    
    if(moves === 0){
        alert("You lose.");
        movementButtons();
    }
}

function checkSpace(){
    let currentSpace = spaces.rows[currentY].cells[currentX].innerText;
    if(currentSpace == 'X' || currentSpace == 'O') {
        spaces.rows[currentY].cells[currentX].innerHTML = 'P';
    }  else if (currentSpace == 'R'){
        spaces.rows[currentY].cells[currentX].innerHTML = 'S';
        combat(enemyName, enemyStrength, enemyHealth);
    }
    if(currentY == swordy){
        if(currentX == swordX){
            if(weapon === "fists"){
                alert("You found the sword!!! +5 Damage");
                weapon = "Sword";
                damage = 5;
                updateWeapon();
        }}
    }
}
function changeSpace(){
    const currentSpace =spaces.rows[currentY].cells[currentX].innerText.toString();
    if(currentSpace != 'R' && currentSpace != 'S'){
        spaces.rows[currentY].cells[currentX].innerHTML = 'O';
    }
}

/* ------------------------------------------------------------ COMBAT ------------------------------------------------------------ */


function combat(enemyName, enemyStrength, enemyHealth){
    currentEnemyHealth= enemyHealth;
    currentEnemyName = enemyName;
    currentEnemyStrength = enemyStrength;
    document.getElementById("PlayerAction").innerText = `${playerName} entered Combat.`;
    document.getElementById("PlayerResult").innerText = ``;
    document.getElementById("EnemyHealth").innerText = ``;
    document.getElementById("EnemyAction").innerText = ``;
    document.getElementById("EnemyResult").innerText = ``;
    
    switchButtons();
}
function endCombat(){
    if(currentEnemyHealth <= 0){
        alert(`You defeated the ${currentEnemyName}`)
        --enemies;

        if (enemies == 0){
            alert("You win!!!");
            combatButtons();
        }
        else {
            switchButtons();
        }
    }
    if(health <= 0){
        //Die or something
        alert("you are dead");
        combatButtons();
    }
}



function EnemyTurn(){
    let x = Number(Math.floor(Math.random() * Number(currentEnemyStrength)));
    console.log(x);
    document.getElementById("EnemyAction").innerText = `${currentEnemyName} attacks.`;
    document.getElementById("EnemyResult").innerText = `${currentEnemyName} dealt ${x} damage.`;
    health = health - x;
    updateHealth();
    endCombat()
}

function Attack (){
    let x = Number(Math.round(Math.random()));
    if(x===1) {
        currentEnemyHealth -= damage;
        console.log(`${enemyName} is at ${currentEnemyHealth} health`);
        document.getElementById("PlayerAction").innerText = `${playerName} attacks.`;
        document.getElementById("PlayerResult").innerText = `${playerName} dealt ${damage} damage.`;
        document.getElementById("EnemyHealth").innerText = `${currentEnemyName} is at ${currentEnemyHealth} HP.`;
    } else {
        console.log(`${enemyName} is at ${currentEnemyHealth} health`);
        document.getElementById("PlayerAction").innerText = `${playerName} attacks.`;
        document.getElementById("PlayerResult").innerText = `${playerName} missed.`;
        document.getElementById("EnemyHealth").innerText = `${currentEnemyName} is at ${currentEnemyHealth} HP.`;
    }
    endCombat()
    if(currentEnemyHealth > 0){
        EnemyTurn()
    }
    
}


function Heal (){
    let x =  Number(Math.floor(Math.random() * 5))
    console.log("Healed: "+  x);
    
    document.getElementById("PlayerAction").innerText = `${playerName} heals for ${x} HP.`;
    document.getElementById("PlayerResult").innerText = `${playerName} is at ${health} HP.`;

    health = health + x;
    updateHealth();
    EnemyTurn()
}


function combatButtons(){
    let x = document.getElementsByClassName("btn combat");
    let i = 0;
    for (i = 0; i < x.length; i++){
        if(x[i].disabled === true){
            x[i].disabled = false;
        }
        else{   
            x[i].disabled = true;
        }
    }
    if(document.getElementById("BattleInformation").style.display === "none"){
        document.getElementById("BattleInformation").style.display = "block"
    }
    else{
        document.getElementById("BattleInformation").style.display = "none"
    }
}
function switchButtons(){
    movementButtons();
    combatButtons();
}


checkSpace();
