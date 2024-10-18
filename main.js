const $btnKickCharacter1 = document.getElementById('btn-kick-character-1');
const $btnKickCharacter2 = document.getElementById('btn-kick-character-2');
const $logs = document.querySelector('#logs');
import Pokemon from "./class.js";
import { generateLog } from "./log.js";

const character = new Pokemon('Zapdos', 100, 100, 'character', $btnKickCharacter1, $btnKickCharacter2);
const enemy = new Pokemon('Moltres', 100, 100, 'enemy', $btnKickCharacter1, $btnKickCharacter2);

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function clickCounter(maxClicks, buttonElement, buttonName) {
    let clicks = 0;

    function updateButtonText() {
        buttonElement.innerText = `${buttonName} [${maxClicks - clicks}/${maxClicks}]`;
    }
    updateButtonText();

    return function () {
        if (clicks < maxClicks) {
            clicks++;
            console.log(`Кнопка "${buttonName}" натиснута ${clicks} разів. Залишилося натискань: ${maxClicks - clicks}`);
            updateButtonText();

            const $p = document.createElement('p');
            $p.innerHTML = `Використана атака: <span style="color: #03fcd7">${buttonName} [${maxClicks - clicks}/${maxClicks}]</span>`;
            $logs.insertBefore($p, $logs.children[0]);

            if (clicks === maxClicks) {
                buttonElement.disabled = true;
                console.log(`Кнопка "${buttonName}" більше не активна. Максимальна кількість натискань: ${maxClicks}.`);
            }
            return true;
        } else {
            return false;
        }
    };
}
const clickBtn1 = clickCounter(5, $btnKickCharacter1, 'Thunder Jolt');
const clickBtn2 = clickCounter(7, $btnKickCharacter2, 'Sky Attack');

$btnKickCharacter1.addEventListener('click', function () {
    if (clickBtn1()) {
        character.changeHP(random(30), character, enemy, $logs, generateLog);
        enemy.changeHP(random(30), character, enemy, $logs, generateLog);
    } else {
        $btnKickCharacter1.disabled = true;
    }
});

$btnKickCharacter2.addEventListener('click', function () {
    if (clickBtn2()) {
        character.changeHP(10, character, enemy, $logs, generateLog);
        enemy.changeHP(10, character, enemy, $logs, generateLog);
    } else {
        $btnKickCharacter2.disabled = true;
    }
});

init();