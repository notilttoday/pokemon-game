import Pokemon from './class.js';
import { generateLog } from './log.js';
import { pokemons } from './pokemons.js';
import { randomDamage } from './random.js';

class Game {
    constructor($control, $logs) {
        this.$control = $control;
        this.$logs = $logs;
        this.player1 = null;
        this.player2 = null;
    }

    startGame() {
        this.selectRandomPokemon();
        this.renderHP();
        this.addAttackButtons();
    }

    selectRandomPokemon() {
        const randomIndex1 = Math.floor(Math.random() * pokemons.length);
        const randomIndex2 = Math.floor(Math.random() * pokemons.length);

        const randomPokemon1 = pokemons[randomIndex1];
        const randomPokemon2 = pokemons[randomIndex2];
        console.log(randomPokemon1);

        this.player1 = new Pokemon(randomPokemon1.name, randomPokemon1.hp, randomPokemon1.hp, randomPokemon1.img, 'player1', {
            ...randomPokemon1,
            selectors: 'player1',
        });
        console.log(randomPokemon1);
        this.player2 = new Pokemon(randomPokemon2.name, randomPokemon2.hp, randomPokemon2.hp, randomPokemon2.img, 'player2', {
            ...randomPokemon2,
            selectors: 'player2',
        });
        console.log('Selected Pokemon 1:', randomPokemon1);
        console.log('Selected Pokemon 2:', randomPokemon2);
        // this.updatePokemonImages();
        this.renderCharacters();
    }

    // updatePokemonImages() {
    //     const player1Image = document.getElementById('player1-image');
    //     const player2Image = document.getElementById('player2-image');
        
    //     if (player1Image) {
    //         player1Image.src = this.player1.img;
    //     }
    //     if (player2Image) {
    //         player2Image.src = this.player2.img;
    //     }
    // }

    renderCharacters() {
        const namePlayer1 = document.getElementById('name-player1');
        const namePlayer2 = document.getElementById('name-player2');
        const player1Image = document.getElementById('player1-image');
        const player2Image = document.getElementById('player2-image');
        console.log(this.player1);
        player1Image.src = this.player1.src;
        player2Image.src = this.player2.src;
        namePlayer1.innerText = this.player1.name;
        namePlayer2.innerText = this.player2.name;
    }

    renderHP() {
        this.player1.renderHP();
        this.player2.renderHP();
    }

    addAttackButtons() {
        const container1 = document.querySelector('.container1');
        this.player1.attacks.forEach(item => {
            const $btn = document.createElement('button');
            $btn.classList.add('button');
            const formattedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            $btn.innerText = formattedName;
    
            const btnCount = this.player1.attack(item.maxCount, $btn, formattedName, randomDamage(item.minDamage, item.maxDamage), this.$logs, this.player2);
    
            $btn.addEventListener('click', () => {
                console.log('Click button ', $btn.innerText);
                btnCount();

                
                if (this.player2.damageHP === 0) {
                    this.disableAttackButtons('container2');
                }
            });
    
            container1.appendChild($btn);
        });
        
        const container2 = document.querySelector('.container2');
        this.player2.attacks.forEach(item => {
            const $btn = document.createElement('button');
            $btn.classList.add('button');
            const formattedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            $btn.innerText = formattedName;
            
            const btnCount = this.player2.attack(item.maxCount, $btn, formattedName, randomDamage(item.minDamage, item.maxDamage), this.$logs, this.player1);
    
            $btn.addEventListener('click', () => {
                console.log('Click button ', $btn.innerText);
                btnCount();            
                
                if (this.player1.damageHP === 0) {
                this.disableAttackButtons('container1');
                }
            });
    
            container2.appendChild($btn);
        });
    } 
    disableAttackButtons(selector) {
        const buttons = document.querySelectorAll(`.${selector} .button`);
        buttons.forEach(button => {
            button.disabled = true;
        });
    }
    
    resetGame() {    
        const container1 = document.querySelector('.container1');
        const container2 = document.querySelector('.container2');
    
        container1.innerHTML = '';
        container2.innerHTML = '';
    
        this.$logs.innerHTML = '';
        this.player1 = null;
        this.player2 = null;
        this.startGame();
    }
}

export default Game;
