let record = 1
let atual = 1

if(localStorage.getItem("record") != null){
    record = localStorage.getItem("record")
    document.getElementById("record").innerText = `Recorde: ${record}`
}

if(localStorage.getItem("atual") != null){
    atual = localStorage.getItem("atual")
    document.getElementById("main").innerText = atual
    console.log(atual)
}
function clicar(){
    if(document.getElementById("main").classList.contains("clicado")) return
    if(document.getElementById("main").classList.contains("solto")) return

    console.log("aqui")

    document.getElementById("main").classList.add("clicado")
    setTimeout(()=>{
        document.getElementById("main").classList.remove("clicado")
        document.getElementById("main").classList.add("solto")

        setTimeout(()=>{
            document.getElementById("main").classList.remove("solto")
        }, 130)
    }, 170)

    let sortido = Math.floor(Math.random() * 100) + 1
    console.log(`sortido: ${sortido}\natual: ${atual}`)

    if(sortido <= atual){
        atual = 1
        document.getElementById("main").innerText = atual
        localStorage.setItem("atual", atual)
        return
    }

    atual++
    document.getElementById("main").innerText = atual
    localStorage.setItem("atual", atual)

    if(record < atual){
        record = atual
        localStorage.setItem("record", atual)
        document.getElementById("record").innerText = `Recorde: ${record}`
    }
}
function testar(){
    setTimeout(() => {
        if(document.getElementById("main").classList.contains("clicado")) return

        console.log("aqui2")

        document.getElementById("main").classList.remove("solto")
        document.getElementById("main").classList.add("clicado")

        let sortido = Math.floor(Math.random() * 100) + 1
        console.log(`sortido: ${sortido}\natual: ${atual}`)

        if(sortido <= atual){
            atual = 1
            document.getElementById("main").innerText = atual
            localStorage.setItem("atual", atual)
            return
        }

        atual++
        document.getElementById("main").innerText = atual
        localStorage.setItem("atual", atual)

        if(record < atual){
            record = atual
            localStorage.setItem("record", atual)
            document.getElementById("record").innerText = `Recorde: ${record}`
        }
    }, 1);
}

function release(){
    if(!document.getElementById("main").classList.contains("clicado")) return

    document.getElementById("main").classList.remove("clicado")
    document.getElementById("main").classList.add("solto")
}