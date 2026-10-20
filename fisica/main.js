canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

const gravidade = 0
const bounce_loss = 0.80

var bola_radius = 30;
var bolas = [];

function normalize(v){
    let mag = Math.sqrt(v.y*v.y + v.x*v.x);
    if (mag === 0) return {x: 0, y: 0};

    return {
        x: v.x/mag,
        y: v.y/mag
    };
}

function get_vec_normal(v){
    return{
        x: v.y,
        y: -v.x
    };
}
function dot_product(v, w){
    return v.x * w.x + v.y * w.y;
}
function scalar_mult(v, c){
    return {
        x: v.x*c,
        y: v.y*c
    };
}
function vec_add(v, w){
    return {
        x: v.x + w.x,
        y: v.y + w.y
    }
}
function vec_sub(v, w){
    return {
        x: v.x - w.x,
        y: v.y - w.y
    }
}


function rn(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min;
}

function reset(){
    ctx.reset();
    ctx.translate(800/2, 800/2);
    ctx.lineWidth = 3;
}

function new_bola(x, y, s){
    let size = rn(1, s);

    bolas.push({
        x: x,
        y: y,
        s: size,
        vx: rn(-5, 5),
        vy: rn(-5, 5),

        mass: size
    });
}

function gloop(){
    reset();
    //movimentacao
    for (b of bolas){
        //colisao
        for (j = 0; j < bolas.length; j++){
            if (bolas[j] === b) continue;

            let rs = b.s + bolas[j].s;

            let dx = b.x - bolas[j].x;
            let dy = b.y - bolas[j].y;

            let dt = Math.sqrt(dx*dx + dy*dy);
            if ((dx*dx + dy*dy) > rs*rs) continue;
            

            let overlap = 0.5*(rs-dt);
            let nc = {x: (dx / dt), y: (dy / dt)};

            b.x += overlap * nc.x;
            b.y += overlap * nc.y;
            bolas[j].x -= overlap * nc.x;
            bolas[j].y -= overlap * nc.y;

            let col_normal = normalize((get_vec_normal(nc)));

            let bolacdp = dot_product({x: b.vx, y: b.vy}, nc);
            let dolacdp = dot_product({x: bolas[j].vx, y: bolas[j].vy}, nc);

            let ms = (b.mass + bolas[j].mass);
            let bm = (bolacdp * (b.mass - bolas[j].mass) + 2 * bolas[j].mass * dolacdp) / ms;
            let dm = (dolacdp * (bolas[j].mass - b.mass) + 2 * b.mass * bolacdp) / ms;

            let bolandp = dot_product({x: b.vx, y: b.vy}, col_normal);
            let dolandp = dot_product({x: bolas[j].vx, y: bolas[j].vy}, col_normal);

            bolav = vec_add(scalar_mult(col_normal, bolandp), scalar_mult(nc, bm));
            dolav = vec_add(scalar_mult(col_normal, dolandp), scalar_mult(nc, dm));

            b.vx = bolav.x;
            b.vy = bolav.y;

            bolas[j].vx = dolav.x;
            bolas[j].vy = dolav.y;
        }

        b.vy += gravidade;
        b.x += b.vx;
        b.y += b.vy;


        if (b.y+b.s > 400) {
            b.y = 400-b.s;
            b.vy *= -bounce_loss;
        }
        if (b.y-b.s < -400) {
            b.y = -400+b.s;
            b.vy *= -bounce_loss;
        }
        if (b.x+b.s > 400) {
            b.x = 400-b.s;
            b.vx *= -bounce_loss;
        }
        if (b.x-b.s < -400){
            b.x = -400+b.s;
            b.vx *= -bounce_loss;
        } 

    }





    //render


    for (b of bolas){
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.s, 0, 2*Math.PI);
        ctx.fill();
    }
}
setInterval(gloop, 0);




var kp = {};
window.addEventListener("keydown", (e) => {
    kp[e.key] = true;

    if (kp["n"]){
        new_bola(rn(-400+bola_radius, 400-bola_radius), rn(-400+bola_radius, 400-bola_radius), bola_radius);
    }
    if(kp["r"]){
        bolas = [];
    }
});
window.addEventListener("keyup", (e) => {
    kp[e.key] = false;
});