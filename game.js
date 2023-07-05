import kaboom from 'kaboom'

const k = kaboom({
    width: 1280,
    height: 720,
})
k.scene('main', () => {
    k.add([
        text('Hello Kaboom', 32),
        pos(k.width() *0.5, k.height() *0.5),
        color(1,1,1,1),
    ])
});

k.go('main');