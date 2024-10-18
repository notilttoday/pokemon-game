import { generateLog } from './log.js';

class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor(name, defaultHP, damageHP, src, selectors, { attacks = [] }) {
        super(selectors);
        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = damageHP;
        this.attacks = attacks;
        this.src = src;
        this.renderHP();
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife = () => {
        const { elHP } = this;
        elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
    }

    renderProgressbarHP = () => {
        this.elProgressbar.style.width = `${(this.damageHP / this.defaultHP) * 100}%`;
    }
    
    changeHP = (count, character, enemy, $logs, disableAttackButtonsCallback) => {
        this.damageHP -= count;

        if (this.damageHP <= 0) {
            this.damageHP = 0;
            alert('Бідний ' + this.name + ' програв бій!');
        }
        const $p = document.createElement('p');
        const log = this === enemy ? generateLog(this, character) : generateLog(this, enemy);
        $p.innerHTML = `${log} <span style="color: pink">-${count} [${this.damageHP} / ${this.defaultHP}]</span>`;  
        $logs.insertBefore($p, $logs.children[0]);

        this.renderHP();
    }

    attack(maxClicks, buttonElement, buttonName, damage, $logs, enemy) {
        let clicks = 0;

        const updateButtonText = () => {
            buttonElement.innerText = `${buttonName} [${maxClicks - clicks}/${maxClicks}]`;
        };
        updateButtonText();
        
        return () => {
            if (clicks < maxClicks) {
                clicks++;
                console.log(`Кнопка "${buttonName}" натиснута ${clicks} разів. Залишилося натискань: ${maxClicks - clicks}`);
                updateButtonText();

                const $p = document.createElement('p');
                $p.innerHTML = `Використана атака: <span style="color: #03fcd7">${buttonName} [${maxClicks - clicks}/${maxClicks}]</span>`;
                console.dir($logs);
                $logs.insertBefore($p, $logs.children[0]);

                enemy.changeHP(damage, this, enemy, $logs, generateLog);

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
}

export default Pokemon;