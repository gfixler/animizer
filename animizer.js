var CANVAS = document.getElementById('canvas');
var CONTEXT = CANVAS.getContext('2d');
var STARTTIME = Date.now();

CANVAS.width = window.innerWidth;
CANVAS.height = window.innerWidth;

function konst (x) {
    function konst_ (y) {
        return x;
    }
    return konst_;
}

function mkImg (path) {
    img = new Image();
    img.src = path;
    return img;
}

function putImg (image, x, y, r) {
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CONTEXT.save();
    CONTEXT.translate(x + CANVAS.width / 2, y + CANVAS.height / 2);
    CONTEXT.rotate(r * Math.PI / 180);
    CONTEXT.drawImage(image, -image.width / 2, -image.height / 2);
    CONTEXT.restore();
}

function mkSprite (img) {
    var sprite = { img: img, fx: konst(0), fy: konst(0), fr: konst(0) };
    return sprite;
}

function putSprite (t, sprite) {
    x = sprite.fx(t);
    y = sprite.fy(t);
    r = sprite.fr(t);
    putImg(sprite.img, x, y, r);
}

function getTime () {
    return (Date.now() - STARTTIME);
}

function getLoopingTime (mod) {
    return (getTime() % mod);
}


moonman = mkSprite(mkImg("moonman.png"));
moonman.fx = function(t) { return (t / 10); };
moonman.fy = function(t) { return (Math.sin(t / 500) * 100); };

loop = (function () {
    putSprite(getLoopingTime(3000), moonman);
    setInterval(loop, 1000/60);
});

setInterval(loop, 1000/60);

