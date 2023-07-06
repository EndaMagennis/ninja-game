const k = kaboom({
    width: 1280,
    height: 720,
});

k.scene('main', () => {
    k.add([
        
    ]);

    addLevel([
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
        "         / = =                         ",
        "        /  #                           ",
        "       /  #  #                         ",
        "         #  #                          ",
        "= = = = = = = = =   = = = = = = = = = =",
    ], {
        tileWidth:32,
        tileHeight:32,
        tiles: {
            "=": () => [
                ground = sprite('tile-2'),
                area(),
                scale(2),
            ],
            "/": () => [
                rampUp = sprite('tile-47'),
                area(),
                scale(2),
            ],
            "|": () => [
                rampDown = sprite('tile-49'),
                area(),
                scale(2),
            ],
            "#": ()=>[
                dirt = sprite('tile-12'),
                area(),
                scale(2),
            ]
        }
    })
    
});

// a function to load all 60 swamp tiles to avoid repetition
function loadAllTiles(){
    let tilenumber = 0;
    for(let i=0; i < 60; i++){
        tilenumber++;
        console.log(tilenumber);
        loadSprite(`tile-${tilenumber}`, `assets/images/tiles/swamp/swamp-tile-${tilenumber}.png`);
    };
};

loadAllTiles();

k.go('main');