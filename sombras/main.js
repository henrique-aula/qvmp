const box = document.getElementById('box');
const resultado = document.getElementById('resultado');
const inset = document.getElementById('inset');
const state = {x:0,y:0,blur:12,spread:0,color:'rgba(0, 0, 0, 0.5)'};

var addInset = false;

document.querySelectorAll('input[type="range"]').forEach(slider => {
    const value_label = document.getElementById(slider.dataset.target);
    const var_name = slider.dataset.var;
    let animationId;
    slider.addEventListener('input', () => {
        value_label.textContent = slider.value;
        state[var_name] = parseInt(slider.value);

        if (animationId) cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(() => {newstyle();});
    });
});

document.getElementById('random').addEventListener('click', () =>{
    state.x = randint(-50,50);
    state.y = randint(-50,50);
    state.blur = randint(0,200);
    state.spread = randint(0,200);
    if (randint(0, 1) == 1){
        addInset = !addInset;
    }
    document.querySelectorAll('input[type="range"]').forEach(slider => {
        const value_label = document.getElementById(slider.dataset.target);
        const var_name = slider.dataset.var;
        slider.value = state[var_name];
        value_label.textContent = state[var_name];
    });
    
    newstyle();
})

resultado.addEventListener("input", () => {
    box.style.boxShadow = resultado.value.slice(12);
});

inset.addEventListener("click", () => {
    addInset = !addInset;
    newstyle();
});

function randint(x, y){
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

function newstyle(){
    let shadow = `${state.x}px ${state.y}px ${state.blur}px ${state.spread}px ${state.color}`;
    if (addInset){
        shadow = 'inset ' + shadow;
    }

    box.style.boxShadow = shadow;
    resultado.value = 'box-shadow: '+shadow;
}


newstyle();