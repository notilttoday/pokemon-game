const $btnKickCharacter1 = document.getElementById('btn-kick-character-1');
const $btnKickCharacter2 = document.getElementById('btn-kick-character-2');

const character = {
    name: 'Zapdos',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),

    renderHP: function() {
        this.renderHPLife();
        this.renderProgressbarHP();
    },

    renderHPLife: function() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    },

    renderProgressbarHP: function() {
        this.elProgressbar.style.width = (this.damageHP / this.defaultHP) * 100 + '%';
    },
    
    changeHP: function(count) {
        this.damageHP -= count;
        if (this.damageHP < 0) {
            this.damageHP = 0;
            alert('Бідний ' + this.name + ' програв бій!');
            $btnKickCharacter1.disabled = true;
            $btnKickCharacter2.disabled = true;
        }
        this.renderHP();
    }
};

const enemy = {
    name: 'Moltres',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),

    renderHP: function() {
        this.renderHPLife();
        this.renderProgressbarHP();
    },
    
    renderHPLife: function() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    },

    renderProgressbarHP: function() {
        this.elProgressbar.style.width = (this.damageHP / this.defaultHP) * 100 + '%';
    },

    changeHP: function(count) {
        this.damageHP -= count;
        if (this.damageHP < 0) {
            this.damageHP = 0;
            alert('Бідний ' + this.name + ' програв бій!');
            $btnKickCharacter1.disabled = true;
            $btnKickCharacter2.disabled = true;
        }
        this.renderHP();
    }
};

function attack(attacker, target, damage) {
    target.changeHP(damage);
}

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

$btnKickCharacter1.addEventListener('click', function () {
    const damage = random(30);
    attack(character, enemy, damage);
    if (enemy.damageHP > 0) {
        const enemyDamage = random(30);
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