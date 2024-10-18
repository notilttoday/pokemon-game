class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors{
    constructor(name, defaultHP, damageHP, selectors, btnKick1, btnKick2) {
        super(selectors);

        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = damageHP;
        this.btnKick1 = btnKick1;
        this.btnKick2 = btnKick2;

        this.renderHP();
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife = () => {
        const { elHP, damageHP, defaultHP } = this;
        elHP.innerText = `${damageHP} / ${defaultHP}`;
    }

    renderProgressbarHP = () => {
        this.elProgressbar.style.width = `${(this.damageHP / this.defaultHP) * 100}%`;
    }
    
    changeHP = (count, character, enemy, $logs, generateLog) => {
        this.damageHP -= count;

        if (this.damageHP <= 0) {
            this.damageHP = 0;
            alert('Бідний ' + this.name + ' програв бій!');
            this.btnKick1.disabled = true;
            this.btnKick2.disabled = true;
        }
        const $p = document.createElement('p');
        const log = this === enemy ? generateLog(this, character) : generateLog(this, enemy);
        if (this.name == 'Zapdos') {
            $p.innerHTML = `${log} <span style="color: yellow">-${count} [${this.damageHP} / ${this.defaultHP}]</span>`;  
        } else {
            $p.innerHTML = `${log} <span style="color: red">-${count} [${this.damageHP} / ${this.defaultHP}]</span>`;  
        }
        $logs.insertBefore($p, $logs.children[0]);

        this.renderHP();
    }
}

export default Pokemon;