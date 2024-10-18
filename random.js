function random(num) {
    return Math.ceil(Math.random() * num);
}

function randomDamage(a, b) {
    const min = Math.ceil(a);
    const max = Math.floor(b);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { random, randomDamage };