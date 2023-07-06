
const k = kaboom({
    width: 1280,
    height: 720,
    background:[35, 35, 35]
});

//loading background sprites
loadSprite('bg', 'assets/images/backgrounds/forest-bg.png');

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

//creating a constant for level configurations
const levelConfig = {
    tileWidth:32,
    tileHeight:32,
    tiles: {
        "=": () => [
            sprite('swampTile2'),
            area(),
            body().static =true,
            scale(1),
            "ground",
        ],
        "/": () => [
            sprite('swampTile47'),
            area(),
            body().static = true,
            scale(1),
            "ramp"
        ],
        "|": () => [
            sprite('swampTile49'),
            area(),
            body().static = true,
            scale(1),
        ],
        "#": ()=>[
            sprite('swampTile12'),
            area(),
            scale(1),
        ],

    }
};

const player = add([
    sprite('playerIdle'),//default animation
    area({shape: new Rect(vec2(0), 32, 32), offset: vec2(0,32)}),//sets a rectangle to collide
    scale(1),
    anchor('center'),//anchors rectangle to center of sprite
    body(),// gives player physics
    pos(101, 100),// starting position
    {
        speed: 500,
        previousHeight: null,
        heightDelta: 0,
        direction: 'right'
    },
    "player",
]);
player.play('idleAnim');

// handle player inputs
function handleInputs(){
    onKeyDown('d', () => {
        if(player.curAnim() !== 'runAnim'){
            player.use(sprite('playerRun'));
            player.play('runAnim');
        };

        if (player.direction !== 'right') player.direction = 'right';
        player.move(player.speed, 0);
    });

    onKeyRelease('d', () => {
        player.use(sprite('playerIdle'));
        player.play('idleAnim');
    });

    onKeyPress("space", () =>{
        if(player.curAnim() !== 'jumpAnim'){
            player.use(sprite('playerJump'));
            player.play('jumpAnim');
        };
        player.jump();
    });
}
//creating a level configuration constant 

//main function to run the game
k.scene('main', () => {
    //add level function takes map and level config to build a level
    onCollide("player", "ground", ()=> {
        player.isGrounded();
        console.log("hasLanded")
    });

    add([
        sprite('bg'),
    ])
    add(player);
    
    addLevel(map1, levelConfig);
    
    handleInputs();
});

k.go('main');