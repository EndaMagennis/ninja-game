
const k = kaboom({
    width: 1280,
    height: 720,
    background:[35, 35, 35]
});

//loading sprites for use in game.
loadSprite('playerIdle', 'assets/images/sprites/kunoichi/kunoichi-idle.png', {
    sliceX: 9, sliceY: 1,
    anims: {'idleAnim': {from: 0, to: 8, loop: true}}
});

loadSprite('playerRun', 'assets/images/sprites/kunoichi/kunoichi-run.png', {
    sliceX: 8, sliceY: 1,
    anims: {'runAnim': {from: 0, to: 7, loop: true}}
});

loadSprite('playerJump', 'assets/images/sprites/kunoichi/kunoichi-jump.png', {
    sliceX: 10, sliceY: 1,
    anims: {'jumpAnim': {from: 0, to: 9, loop: true}}
});

// a function to load all 60 swamp tiles to avoid repetition
function loadAllTiles(){
    let tilenumber = 0;
    for(let i=0; i < 60; i++){
        tilenumber++;
        loadSprite(`swampTile${tilenumber}`, `assets/images/tiles/swamp/swamp-tile-${tilenumber}.png`);
        console.log("loadedtile: " + tilenumber);
    };
};
//calling the loadAllTiles function
loadAllTiles();
//setting gravity 
setGravity(1000);

//creating a map constant for level1
const map1 = [
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "         /=                            ",
        "        /##                            ",
        "       /###                            ",
        "      /####                            ",
        "===========   =========================",
    ];

const player = add([
    sprite('playerIdle'),
    area({shape: new Rect(k.vec2(0), 32, 32), offset: k.vec2(0,32)}),
    scale(1),
    anchor('center'),
    body(),
    pos(101, 100),
    {
        speed: 500,
        previousHeight: null,
        heightDelta: 0,
        direction: 'right'
    },
    
]);
player.play('idleAnim');

player.isGrounded();

// handle player inputs
function handleInputs(){
    onKeyDown('key.d', () => {
        if(player.curAnim() !== 'runAnim' && player.isGrounded()){
            player.use(sprite('playerRun'));
            player.play('runAnim')
        }

        if (player.direction !== 'right') player.direction = 'right';
        player.move(player.speed, 0);
    })

    onKeyRelease('d', () => {
        player.use(sprite('playerIdle'));
        player.play('idleAnim');
    })

    onKeyPress("space", () =>{
        if(player.anim());
        player.jump();
    }) 
}
//creating a level configuration constant 
const levelConfig = {
    tileWidth:32,
    tileHeight:32,
    tiles: {
        "=": () => [
            ground = sprite('swampTile2'),
            area(),
            scale(1),
        ],
        "/": () => [
            rampUp = sprite('swampTile47'),
            area(),
            body().static = true,
            scale(1),
        ],
        "|": () => [
            rampDown = sprite('swampTile49'),
            area(),
            body().static = true,
            scale(1),
        ],
        "#": ()=>[
            dirt = sprite('swampTile12'),
            area(),
            scale(1),
        ],

    }
};



//main function to run the game
k.scene('main', () => {
    //add level function takes map and level config to build a level
    addLevel(map1, levelConfig);
    add(player);
    handleInputs();
});

k.go('main');