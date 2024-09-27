const $btnKickCharacter1 = document.getElementById('btn-kick-character-1');
const $btnKickCharacter2 = document.getElementById('btn-kick-character-2');

const character = {
    name: 'Zapdos',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
};

const enemy = {
    name: 'Moltres',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
};

function attack(attacker, target, damage) {
    changeHP(damage, target);
    renderHP(target);
}

function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy);
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    person.elProgressbar.style.width = (person.damageHP / person.defaultHP) * 100 + '%';
}

function changeHP(count, person) {
    person.damageHP -= count;
    if (person.damageHP < 0) {
        person.damageHP = 0;
        alert('Бідний ' + person.name + ' програв бій!');
        $btnKickCharacter1.disabled = true;
        $btnKickCharacter2.disabled = true;
    }
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

$btnKickCharacter1.addEventListener('click', function () {
    const damage = random(40);
    attack(character, enemy, damage);
    if (enemy.damageHP > 0) {
        const enemyDamage = random(15);
        attack(enemy, character, enemyDamage);
    }
});

$btnKickCharacter2.addEventListener('click', function () {
    const damage = 10;
    attack(enemy, character, damage);
    if (character.damageHP > 0) {
        const characterDamage = 10;
        attack(character, enemy, characterDamage);
    }
});

init();
