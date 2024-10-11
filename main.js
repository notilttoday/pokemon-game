const $btnKickCharacter1 = document.getElementById('btn-kick-character-1');
const $btnKickCharacter2 = document.getElementById('btn-kick-character-2');
const $logs = document.querySelector('#logs');

const character = {
    name: 'Zapdos',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),

    renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    },

    renderHPLife() {
        this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
    },

    renderProgressbarHP() {
        this.elProgressbar.style.width = `${(this.damageHP / this.defaultHP) * 100}%`;
    },
    
    changeHP(count) {
        this.damageHP -= count;

        if (this.damageHP < 0) {
            this.damageHP = 0;
            alert('Бідний ' + this.name + ' програв бій!');
            $btnKickCharacter1.disabled = true;
            $btnKickCharacter2.disabled = true;
        }

        const $p = document.createElement('p');
        const log = this === enemy ? generateLog(this, character) : generateLog(this, enemy);
        $p.innerHTML = `${log} <span style="color: yellow">-${count} [${this.damageHP} / ${this.defaultHP}]</span>`;
        $logs.insertBefore($p, $logs.children[0]);

        this.renderHP();
    }
};

const enemy = {
    name: 'Moltres',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),

    renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    },

    renderHPLife() {
        this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
    },

    renderProgressbarHP() {
        this.elProgressbar.style.width = `${(this.damageHP / this.defaultHP) * 100}%`;
    },

    changeHP(count) {
        this.damageHP -= count;

        if (this.damageHP < 0) {
            this.damageHP = 0;
            alert('Бідний ' + this.name + ' програв бій!');
            $btnKickCharacter1.disabled = true;
            $btnKickCharacter2.disabled = true;
        }

        const $p = document.createElement('p');
        const log = this === enemy ? generateLog(this, character) : generateLog(this, enemy);
        $p.innerHTML = `${log} <span style="color: red">-${count} [${this.damageHP} / ${this.defaultHP}]</span>`;
        $logs.insertBefore($p, $logs.children[0]);

        this.renderHP();
    }
};

function generateLog({ name: firstPersonName }, { name: secondPersonName }) {
    const logs = [
        `${firstPersonName} згадав щось важливе, але несподівано ${secondPersonName}, не пам'ятаючи себе від переляку, вдарив у передпліччя ворога.`,
        `${firstPersonName} поперхнувся, і за це ${secondPersonName} з переляку приклав прямий удар коліном у лоб ворога.`,
        `${firstPersonName} забувся, але в цей час нахабний ${secondPersonName}, прийнявши вольове рішення, нечутно підійшовши ззаду, вдарив.`,
        `${firstPersonName} прийшов до тями, але несподівано ${secondPersonName} випадково завдав потужного удару.`,
        `${firstPersonName} поперхнувся, але в цей час ${secondPersonName} неохоче розтрощив кулаком <вирізано цензурою> супротивника.`,
        `${firstPersonName} здивувався, а ${secondPersonName} похитнувшись вліпив підлий удар.`,
        `${firstPersonName} висморкався, але несподівано ${secondPersonName} провів подрібнюючий удар.`,
        `${firstPersonName} похитнувся, і раптово нахабний ${secondPersonName} без причини вдарив у ногу супротивника.`,
        `${firstPersonName} засмутився, як раптом, несподівано ${secondPersonName} випадково вліпив стопою в живіт суперника.`,
        `${firstPersonName} намагався щось сказати, але раптом, несподівано ${secondPersonName} з нудьги, розбив брову супернику.`
    ];
    return logs[random(logs.length) - 1];
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
    const damage1 = random(30);
    const damage2 = random(30);

    enemy.changeHP(damage2);
    character.changeHP(damage1);
});

$btnKickCharacter2.addEventListener('click', function () {
    const damage = 10;
    enemy.changeHP(damage);
    character.changeHP(damage);
});

init();