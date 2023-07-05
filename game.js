import kaboom from "kaboom";
kaboom();

const k = kaboom({
    width: 1280,
    height: 720,
});

k.scene('main', () => {
    k.add([
        text('Hello Kaboom', 32),
        pos(k.width() *0.5, k.height() *0.5),
        color(1,1,1,1),
    ])
    
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