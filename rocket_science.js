var scale = 1;
var height = 667 * scale;
var width = 375 * scale;

var game = new Phaser.Game(width, height, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    game.load.image('background', 'assets/background.svg');
    game.load.spritesheet('blanket', 'assets/blanket.svg', 750, 310, 1);

    game.load.spritesheet('flowers', 'assets/sprite_flowers_hearts_128x112.svg', 128, 112, 11);
    game.load.spritesheet('vibrator', 'assets/sprite_vibrator_586_x152.svg', 586, 152, 3);
    game.load.spritesheet('feet', 'assets/sprite_feet_161x85.svg', 161, 85, 3);
    game.load.spritesheet('bells', 'assets/sprite_bells_97x65.svg', 97, 65, 2);
    game.load.spritesheet('birds', 'assets/sprite_birds_83x63.svg', 83, 63, 2);
    game.load.spritesheet('butterfly', 'assets/sprite_butterfly_147x174.svg', 147, 174, 2);
    game.load.spritesheet('rainbow_done', 'assets/sprite_rainbow_done_675x596.svg', 675, 596, 10);

    game.load.spritesheet('trump_01', 'assets/sprite_trump_200x265_1.svg', 200, 265, 2);
    game.load.spritesheet('yun_01', 'assets/sprite_yun_200x265_1.svg', 200, 265, 2);
    game.load.spritesheet('putin_01', 'assets/sprite_putin_200x265_1.svg', 200, 265, 2);

    game.load.spritesheet('trump_02', 'assets/sprite_trump_200x265_2.svg', 200, 265, 2);
    game.load.spritesheet('yun_02', 'assets/sprite_yun_200x265_2.svg', 200, 265, 2);
    game.load.spritesheet('putin_02', 'assets/sprite_putin_200x265_2.svg', 200, 265, 2);

    game.load.spritesheet('merkel', 'assets/sprite_merkel_452x452.svg', 452, 452, 2);

    game.load.audio('background', 'assets/background_loop.mp3');
    game.load.audio('vibrator_01', 'assets/vibrator_loop_01.mp3');
    game.load.audio('vibrator_02', 'assets/vibrator_loop_02.mp3');
    game.load.audio('vibrator_03', 'assets/vibrator_loop_03.mp3');
    game.load.audio('tap', 'assets/heart_tap.mp3');
    game.load.audio('applause', 'assets/merkel_applause.mp3');

    game.load.audio('vox_1', 'assets/random_vox_01.mp3');

    var i;
    for(i = 1; i <= 10; i++){
        game.load.audio('vox_yun_' + i, 'assets/vox_yun_' + ("0" + i).slice(-2) + '.mp3');
    }
    for(i = 1; i <= 7; i++){
        game.load.audio('vox_trump_' + i, 'assets/vox_trump_' + ("0" + i).slice(-2) + '.mp3');
    }
    for(i = 1; i <= 7; i++){
        game.load.audio('vox_putin_' + i, 'assets/vox_putin_' + ("0" + i).slice(-2) + '.mp3');
    }
    for(i = 1; i <= 5; i++){
        game.load.audio('spank_' + i, 'assets/spank_' + ("0" + i).slice(-2) + '.mp3');
    }

    game.load.audio('spank_1', 'assets/random_spank_01.mp3');
}

var level = 0;

var randomSounds = ['vox_1', 'vox_2', 'vox_3', 'vox_4', 'vox_5', 'vox_6', 'vox_7', 'vox_8', 'spank_1', 'spank_2', 'spank_3'];

var i;
for(i = 1; i <= 10; i++){
    randomSounds.push('vox_yun_' + i);
}
for(i = 1; i <= 7; i++){
    randomSounds.push('vox_trump_' + i);
}
for(i = 1; i <= 7; i++){
    randomSounds.push('vox_putin_' + i);
}
for(i = 1; i <= 5; i++){
    randomSounds.push('spank_' + i);
}

var randomfx = [];

var bmd;

var flowers = [];
var flowerpos = [
    {x: 0.83, y: 0.31},
    {x: 0.69, y: 0.43},
    {x: 0.42, y: 0.43},
    {x: 0.2, y: 0.42},
    {x: 0.12, y: 0.25},
    {x: 0.13, y: 0.15}
];

function create() {
    game.input.addPointer();
    game.input.onTap.add(tap, this);

    for (var i = 0; i < randomSounds.length; i++) {
        randomfx[randomSounds[i]] = game.add.audio(randomSounds[i]);
    }

    tapfx = game.add.audio('tap');
    backgroundfx = game.add.audio('background');
    applausefx = game.add.audio('applause');
    vibratorfx_1 = game.add.audio('vibrator_01');
    vibratorfx_2 = game.add.audio('vibrator_02');
    vibratorfx_3 = game.add.audio('vibrator_03');

    background = game.make.sprite(0, 0, 'background');
    background.scale.set(scale);

    bmd = game.add.bitmapData(game.width, game.height);
    bmd.addToWorld();
    bmd.smoothed = false;

    bmd.draw(background, 0, 0);

    rainbow = game.add.sprite(width * 0.5, height * 1.5, 'rainbow_done');
    rainbow.scale.set(0.6 * scale);
    rainbow.anchor.setTo(0.5, 0.5);
    rainbow.animations.add('animate').play(2, true);

    blanket = game.add.sprite(0, height * 0.71, 'blanket');
    blanket.scale.set(0.7 * scale);
    blanket.animations.add('animate').play(0.5 + Math.random(), true);

    vibrator = game.add.sprite(width * 0.5, height * 0.92, 'vibrator', 0);
    vibrator.scale.set(0.6 * scale);
    vibrator.anchor.setTo(0.5, 0.5);
    vibrator.frame = 0;

    bells = game.add.sprite(width * 0.85, height * 0.2, 'bells');
    bells.scale.set(scale);
    bells.anchor.setTo(0.5, 0.5);

    birds = game.add.sprite(width * 0.88, height * 0.42, 'birds');
    birds.scale.set(scale * 0.8);
    birds.anchor.setTo(0.5, 0.5);

    butterfly = game.add.sprite(width * 0.25, height * 0.32, 'butterfly');
    butterfly.scale.set(scale * 0.6);
    butterfly.anchor.setTo(0.5, 0.5);

    trump = game.add.sprite(width * 0.2, height * 0.595, 'trump_01');
    trump.scale.set(0.6 * scale);
    trump.anchor.setTo(0.5, 0.5);
    trump.frame = 0;

    yun = game.add.sprite(width * 0.5, height * 0.595, 'yun_01');
    yun.scale.set(0.6 * scale);
    yun.anchor.setTo(0.5, 0.5);
    yun.frame = 0;

    putin = game.add.sprite(width * 0.8, height * 0.595, 'putin_01');
    putin.scale.set(0.6 * scale);
    putin.anchor.setTo(0.5, 0.5);
    putin.frame = 0;

    merkel = game.add.sprite(width * 3, height * 0.175, 'merkel');
    merkel.scale.set(0.6 * scale);
    merkel.anchor.setTo(0.5, 0.5);

    feet = game.add.sprite(width * 0.2, height * 0.805, 'feet', 0);
    feet.scale.set(0.6 * scale);
    feet.anchor.setTo(0.5, 0.5);
    feet.animations.add('animate').play(0.5 + Math.random(), true);

    feet2 = game.add.sprite(width * 0.5, height * 0.805, 'feet', 2);
    feet2.scale.set(0.6 * scale);
    feet2.anchor.setTo(0.5, 0.5);
    feet2.animations.add('animate').play(0.5 + Math.random(), true);

    feet3 = game.add.sprite(width * 0.8, height * 0.805, 'feet', 1);
    feet3.scale.set(0.6 * scale);
    feet3.anchor.setTo(0.5, 0.5);
    feet3.animations.add('animate').play(0.5 + Math.random(), true);

    for (var i = 0; i < flowerpos.length; i++) {
        var f = game.add.sprite(width * flowerpos[i].x, height * flowerpos[i].y, 'flowers');
        f.scale.set(0.2 + Math.random() * 0.5 * scale);
        f.anchor.set(0.5, 0.5);
        f.animations.add('animate').play(2, true);
        f.animations.currentAnim.setFrame(Math.floor(Math.random() * flowerpos.length), true);
        flowers.push(f);
    }

    game.sound.setDecodedCallback([backgroundfx, tapfx, applausefx].concat(randomfx), start, this);

    setLevel(0);
}

function render() {
    //game.debug.text(flow.toFixed(3), 0, height * 0.025);
}


function start() {
    backgroundfx.loopFull(0.6);
}

function update() {

}

function tap(pointer) {
    click();
}

function setLevel(level) {

    switch(level){
        case 0:
            SetFlowerSpeed(false);
            bells.visible = butterfly.visible = birds.visible = false;
            vibrator.frame = 0;
            break;
        case 1:
            vibratorfx_1.loopFull(1);
            yun.animations.add('animate').play(0.5 + Math.random(), true);
            trump.animations.add('animate').play(0.5 + Math.random(), true);
            putin.animations.add('animate').play(0.5 + Math.random(), true);
            setTimeout(function () {
                butterfly.visible = true;
                butterfly.animations.add('animate').play(2, true);
            }, 3000);
            setTimeout(function () {
                birds.visible = true;
                birds.animations.add('animate').play(2, true);
            }, 5000);
            setTimeout(function () {
                SetFlowerSpeed(3, 0.5);
            }, 7000);
            vibrator.animations.add('animate').play(3, true);
            PlaySounds(1500);
            break;
        case 2:
            bells.visible = true;
            bells.animations.add('animate').play(2, true);

            vibrator.animations.currentAnim.speed = 8;

            butterfly.animations.currentAnim.speed = 5;
            birds.animations.currentAnim.speed = 4;

            vibratorfx_1.stop();
            vibratorfx_2.loopFull(1);

            setTimeout(function () {
                game.add.tween(rainbow).to({y: height * 0.445 }, 2000, "Linear", true, 0);
                rainbow.animations.currentAnim.speed = 3;
            }, 3000);

            PlaySounds(1000);
            break;
        case 3:
            trump.loadTexture('trump_02');
            trump.animations.add('animate').play(0.5 + Math.random(), true);
            yun.loadTexture('yun_02');
            yun.animations.add('animate').play(0.5 + Math.random(), true);
            putin.loadTexture('putin_02');
            putin.animations.add('animate').play(0.5 + Math.random(), true);


            merkel.visible = true;
            merkel.frame = 1;
            game.add.tween(merkel).to({x: width * 0.5}, 5000, "Linear", true, 0);
            setTimeout(function () {
                merkel.frame = 2;
                applausefx.play();
            }, 5250);

            birds.animations.currentAnim.speed = 7;
            vibrator.animations.currentAnim.speed = 15;
            rainbow.animations.currentAnim.speed = 7;

            vibratorfx_2.stop();
            vibratorfx_3.loopFull(1);
            PlaySounds(200);
            break;
    }
}

var sound;

var playinterval;

function PlaySounds(delay) {
    if(playinterval){
        clearInterval(playinterval);
    }
    playinterval = setInterval(function () {
        PlayRandomSound();
    }, delay);
}

function PlayRandomSound() {
    if (!sound || (sound && !sound.isPlaying)) {
        sound = randomfx[Object.keys(randomfx)[Math.floor(Math.random() * Object.keys(randomfx).length)]];
        sound.play();
    }
}

function SetFlowerSpeed(speed, chance) {
    for (var i = 0; i < flowers.length; i++) {
        if (speed === true) {
            flowers[i].visible = speed;
        } else if (speed === false) {
            flowers[i].visible = speed;
        } else {
            if (!chance || Math.random() < chance) {
                flowers[i].visible = true;
                flowers[i].animations.currentAnim.speed = speed;
            } else {
                flowers[i].visible = false;
            }
        }
    }
}

function click() {
    if(level < 3){
        tapfx.play();
        level++;
        setLevel(level);
        console.log("Level " + level);
    } else {

    }
}