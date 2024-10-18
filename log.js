import { random } from './random.js';

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

export { generateLog };