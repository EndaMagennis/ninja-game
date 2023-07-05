

const k = kaboom({
    width: 1280,
    height: 720,
});

k.scene('main', () => {
    k.add([
        
    ]);

    addLevel([
        "                   ",
        "                   ",
        "                   ",
        "                   ",
        "                   ",
        "= = = = = = = = =   = = = = = = = = = =",
    ], {
        tileWidth:32,
        tileHeight:32,
        tiles: {
            "=": () => [
                ground = sprite('tile-2'),
                area(),
                scale(2),
                pos(0, 500)
            ],
        }
    })
    
});
// a function to load all 60 swamp tiles to avoid repetition
 
function loadAllTiles(){
    let tilenumber = 0;
    for(let i=0; i < 60; i++){
        tilenumber++;
        console.log(tilenumber);
        loadSprite(`tile-${tilenumber}`, `assets/images/tiles/tile-${tilenumber}.png`);
    };
};

loadAllTiles();



k.go('main');