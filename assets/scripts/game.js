
const k = kaboom({
    global: true,
    fullscreen: true,
    width: 600,
    height: 400,
    canvas: document.querySelector("#game"),
    scale: 2,
    debug: true,
    background: [0, 0, 0, 0],
});

//loading icons for mobile play
loadSprite('leftArrow', 'assets/images/icons/arrow-left.png');

loadSprite('rightArrow', 'assets/images/icons/arrow-right.png');

loadSprite('button1', 'assets/images/icons/button1.png');

loadSprite('button2', 'assets/images/icons/button2.png');

loadSprite('menu', 'assets/images/icons/bars-horizontal.png');

//loading sprites animations for use in game.
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
    anims: {'jumpAnim': {from: 1, to: 2, loop: false}}
});

loadSprite('playerDoubleJump', 'assets/images/sprites/kunoichi/kunoichi-jump.png', {
    sliceX: 10, sliceY: 1,
    anims: {'doubleJumpAnim': {from: 3, to: 9, loop: false}}
});

loadSprite('playerFall', 'assets/images/sprites/kunoichi/kunoichi-jump.png', {
    sliceX: 10, sliceY: 1,
    anims: {'fallAnim': {from: 8, to: 9, loop: true}}
})
//creating a map constant for level
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
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "                                       ",
        "===========   =========================",
    ];
//creating a constant for level configurations
const levelConfig = {
    tileWidth:16,
    tileHeight:16,
    tiles: {
        "=": () => [
            sprite('swampTile2'),
            area(),
            body({isStatic: true}),
            scale(0.5),
            "ground",
        ],
        "/": () => [
            sprite('swampTile47'),
            scale(0.5),
            "ramp"
        ],
        "|": () => [
            sprite('swampTile49'),
            scale(0.5),
        ],
        "#": ()=>[
            sprite('swampTile12'),
            scale(0.5),
        ],

    }
};

//creates a player object
const player = add([
    sprite('playerIdle'),//default animation
    area({shape: new Rect(vec2(0), 32, 32), offset: vec2(0,32)}),//sets a rectangle to collide
    scale(0.5),
    anchor('center'),//anchors rectangle to center of sprite
    body(),// gives player physics
    pos(101, 300),// starting position
    {
        speed: 200,
        previousHeight: null,
        heightDelta: 0,
        direction: 'right',
        jumpCount: 0,
    },
    "player",
]);
const leftButton = add([
    sprite('leftArrow'),
    pos(50, height() -50),
    opacity(0.5),
    fixed(),
    area()
])
const rightButton = add([
    sprite('rightArrow'),
    pos(90, height() -50),
    opacity(0.5),
    fixed(),
    area()
])
const button1 = add([
    sprite('button1'),
    pos(width() -160, height() -50),
    opacity(0.5),
    fixed(),
    area()
])
const button2 = add([
    sprite('button2'),
    pos(width()-120, height() -50),
    opacity(0.5),
    fixed(),
    area()
])
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


player.play('idleAnim');
handleInputs()
camScale(1.5)
//onUpdate is called every frame
onUpdate(() =>{
    cameraConfig();

    if(player.curAnim() !== 'runAnim' && player.isGrounded()){
        player.use(sprite('playerIdle'));
        player.play('idleAnim');
    };

    if(player.curAnim() !== 'jumpAnim' && !player.isGrounded() && player.heightDelta > 0) {
        player.use(sprite('playerJump'));
        player.play('jumpAnim');
    };

    if(player.curAnim() !== 'fallAnim' && !player.isGrounded() && player.heightDelta < 0) {
        player.use(sprite('playerFall'));
        player.play('fallAnim');
    };

    if(player.direction === 'left'){
        player.flipX = true;
    } else{
        player.flipX = false;
    };
});

function cameraConfig(){
    if(player.previousHeight){
        player.heightDelta = player.previousHeight - player.pos.y;
    };

    player.previousHeight = player.pos.y;

    const cameraLeftBound = 100;
    const camerRightBound = 4000;
    const cameraVerticalOffset = player.pos.y -10;

    if(cameraLeftBound > player.pos.x){
        camPos(cameraLeftBound, cameraVerticalOffset);
    } else if(camerRightBound < player.pos.x) {
        camPos(camerRightBound, cameraVerticalOffset);
    } else{
        camPos(player.pos.x, cameraVerticalOffset);
    }
}

function idle(){
        player.use(sprite('playerIdle'));
        player.play('idleAnim');
};

function moveRight(){
        if(player.curAnim() !== 'runAnim' && player.isGrounded()){
            player.use(sprite('playerRun'));
            player.play('runAnim');
        };

        if (player.direction !== 'right') player.direction = 'right';
        player.move(player.speed, 0);       
};

function moveLeft(){
        if(player.curAnim() !== 'runAnim' && player.isGrounded()){
            player.use(sprite('playerRun'));
            player.play('runAnim');
        }

        if (player.direction !== 'left') player.direction = 'left';
        player.move(-player.speed, 0);
};

function playerJump(){
        if(player.curAnim() !== 'jumpAnim' && player.isGrounded()){
            player.use(sprite('playerJump'));
            player.play('jumpAnim');
            player.jump(400);
            player.jumpCount++;
        }

        if(player.curAnim() === 'jumpAnim' && player.jumpCount <=1 && !player.isGrounded()){
            player.use(sprite('playerDoubleJump'));
            player.play('doubleJumpAnim');
            player.jump(400);
            player.jumpCount = 0;
        }
};

function handleInputs(){
    onKeyDown('d',() =>{
        moveRight();
    })

    onKeyRelease('d', () => {
        idle();
    })

    onKeyDown('a',() =>{
        moveLeft();
    })

    onKeyRelease('a', () => {
        idle();
    })

    onKeyPress('space', () => {
        playerJump();
    })
};

function handleMobileInputs(){
    onTouchStart((id,pos) =>{
        if(leftButton.hasPoint(pos)){
            moveLeft();
            leftButton.opacity = 1;
        } else if(rightButton.hasPoint(pos)){
            moveRight();
            rightButton.opacity = 1;
        } else if(button1.hasPoint(pos)){
            playerJump();
        }
    })

    onTouchEnd((_, pos) => {
        if(!leftButton.hasPoint(pos)){

        }
    })
}

//creating a level configuration constant 
onCollide("player", "ground", ()=> {
        player.isGrounded();
        console.log("hasLanded");
});
addLevel(map1, levelConfig);

