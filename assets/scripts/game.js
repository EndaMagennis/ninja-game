const k = kaboom({
    width: 1280,
    height: 720,
    background:[35, 35, 35]
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

loadAllTiles();
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
            scale(1),
        ],
        "|": () => [
            rampDown = sprite('swampTile49'),
            area(),
            scale(1),
        ],
        "#": ()=>[
            dirt = sprite('swampTile12'),
            area(),
            scale(1),
        ],

    }
}

const player ={

}

    
//main function to run the game
k.scene('main', () => {
    //add level function takes map and level config to build a level
    addLevel(map1, levelConfig); 
});

k.go('main');