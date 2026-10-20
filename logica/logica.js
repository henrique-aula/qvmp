
const canva = document.getElementById("canva");
const width = 1200;
const height = 750;
const cl = canva.offsetLeft + canva.clientLeft;
const ct = canva.offsetTop + canva.clientTop;
const ctx = canva.getContext("2d");

var box_size = 90;
var pin_size = 30;

var mouse_x = 0;
var mouse_y = 0;
var mouse_held = false;

var portoes = [];
var portao_carregando = null;
var pino_conectando = null;

function update_portao_pin_coords(portao){
    px = portao["x"];
    py = portao["y"];
    inputs = portao["in"];
    outputs = portao["out"];

    let offset = 0;
    if (inputs.length == 0) {}
    else if (inputs.length == 1) {
        outs.push({
            "x": px-pin_size,
            "y": py+pin_size,
        })
        return outs
    }
    else{
        for (let i = 0; i < inputs.length; i++){
            outs.push({
                "x": px-pin_size,
                "y": py+offset,
            })
            offset += pin_size*2;
        }
    }


    offset = 0;
    if (outputs.length == 0) {}
    else if (outputs.length == 1) {
        outs.push({
            "x": px+box_size,
            "y": py+pin_size,
        })
    }
    else{
        for (let i = 0; i < outputs.length; i++){
            outs.push({
                "x": px+box_size,
                "y": py+offset,
            })
            offset += pin_size*2;
        }
    }

}


function draw_wire(x, y, dx, dy){
    ctx.beginPath();
    ctx.moveTo(x, y)
    ctx.lineTo(dx, dy)
    ctx.strokeStyle = "#f6a223"
    ctx.lineWidth = 5
    ctx.stroke()
}
function draw_portao(portao){
    ctx.fillStyle = "#000000";
    ctx.fillRect(portao["x"], portao["y"], box_size, box_size);

    ctx.fillStyle = "#676767";
    inputs = get_inputs_coords(portao);
    for (let i = 0; i < inputs.length; i++){
        ctx.fillRect(inputs[i]["x"], inputs[i]["y"], pin_size, pin_size);
    }
    outputs = get_output_coords(portao);
    for (let i = 0; i < outputs.length; i++){
        ctx.fillRect(outputs[i]["x"], outputs[i]["y"], pin_size, pin_size);

    }

    
    for (let i = 0; i < inputs.length; i++){
        let p = portao["in"][i];
        if (p != pino_conectando) continue;
        x = inputs[i]["x"] + pin_size/2 
        y = inputs[i]["y"] + pin_size/2
        draw_wire(x,y,mouse_x,mouse_y);
    }
    for (let i = 0; i < outputs.length; i++){
        let p = portao["out"][i];
        if (p != pino_conectando) continue;
        x = outputs[i]["x"] + pin_size/2 
        y = outputs[i]["y"] + pin_size/2
        draw_wire(x,y,mouse_x,mouse_y);
    }
}



function gloop(){
    ctx.reset();
    for (let i = 0; i < portoes.length; i++){
        draw_portao(portoes[i]);
    }


    for (let i = 0; i < portoes.length; i++){
        portao = portoes[i];
        inputs = get_inputs_coords(portao);
        outputs = get_output_coords(portao);

        for (let i = 0; i < inputs.length; i++){
            let p = portao["in"][i];
            if (p != pino_conectando) continue;
            x = inputs[i]["x"] + pin_size/2 
            y = inputs[i]["y"] + pin_size/2
            for (let j = 0; j < )

            draw_wire(x,y,mouse_x,mouse_y);
        }
        for (let i = 0; i < outputs.length; i++){
            let p = portao["out"][i];
            if (p != pino_conectando) continue;
            x = outputs[i]["x"] + pin_size/2 
            y = outputs[i]["y"] + pin_size/2
            draw_wire(x,y,mouse_x,mouse_y);
        }
    }

}
setInterval(gloop, 10);



canva.addEventListener("mousemove", e => {
    mouse_x = e.pageX - cl;
    mouse_y = e.pageY - ct;
    if (mouse_held){
        if (portao_carregando){
            portao_carregando["x"] = mouse_x;
            portao_carregando["y"] = mouse_y;
        }

    }
});
canva.addEventListener("mousedown", e => {
    mouse_held = true;

    for (let i = 0; i < portoes.length; i++){
        p = portoes[i];

        if (mouse_x >= p["x"] && mouse_x <= p["x"]+box_size && mouse_y >= p["y"] && mouse_y <= p["y"]+box_size){
            portao_carregando = p;
            break;
        }

        inputs = get_inputs_coords(p);
        for (let j = 0; j < inputs.length; j++){
            d = inputs[j];
            if (mouse_x >= d["x"] && mouse_x <= d["x"]+pin_size && mouse_y >= d["y"] && mouse_y <= d["y"]+pin_size){
                pino_conectando = p["in"][j];
                break;
            }
        }

        outputs = get_output_coords(p);
        for (let j = 0; j < outputs.length; j++){
            d = outputs[j];
            if (mouse_x >= d["x"] && mouse_x <= d["x"]+pin_size && mouse_y >= d["y"] && mouse_y <= d["y"]+pin_size){
                pino_conectando = p["out"][j];
                break;
            }
        }

    }
});
canva.addEventListener("mouseup", e => {
    mouse_held = false;

    if (pino_conectando){
        for (let i = 0; i < portoes.length; i++){
            p = portoes[i];
            inputs = get_inputs_coords(p);
            outputs = get_output_coords(p);

            for (let j = 0; j < inputs.length; j++){
                if (p["in"][j] == pino_conectando) continue;
                d = inputs[j];
                if (!(mouse_x >= d["x"] && mouse_x <= d["x"]+pin_size && mouse_y >= d["y"] && mouse_y <= d["y"]+pin_size)) continue;

                if (!pino_conectando["conn"].includes(p["in"][j])) pino_conectando["conn"].push(p["in"][j])
                console.log(pino_conectando)
                
                break;
            }
            for (let j = 0; j < outputs.length; j++){
                if (p["out"][j] == pino_conectando) continue;
                d = outputs[j];
                if (!(mouse_x >= d["x"] && mouse_x <= d["x"]+pin_size && mouse_y >= d["y"] && mouse_y <= d["y"]+pin_size)) continue;

                if (!pino_conectando["conn"].includes(p["out"][j])) pino_conectando["conn"].push(p["out"][j])
                console.log(pino_conectando);
                break;
            }
        }

    }

    portao_carregando = null;
    pino_conectando = null;
});

var kp = {};
window.addEventListener("keydown", (e) => {
    kp[e.key] = true;

    if (kp["a"]){
        portoes.push({
            "tipo": "and",
            "x": mouse_x,
            "y": mouse_y,
            "in": [
                {
                    "x": 0,
                    "y": 0,
                    "status": false,
                    "conn": []
                },
                {
                    "x": 0,
                    "y": 0,
                    "status": false,
                    "conn": []
                },
            ],
            "out": [
                {
                    "x": 0,
                    "y": 0,
                    "status": false,
                    "conn": []
                },
            ]
        })
    }
    if (kp["n"]){
        portoes.push({
            "tipo": "and",
            "x": mouse_x,
            "y": mouse_y,
            "in": [
                {
                    "x": 0,
                    "y": 0,
                    "status": false,
                    "conn": []
                },
            ],
            "out": [
                {
                    "x": 0,
                    "y": 0,
                    "status": true,
                    "conn": []
                },
            ]
        })
    }
    if(kp["r"]){
    }
});
window.addEventListener("keyup", (e) => {
    kp[e.key] = false;
});