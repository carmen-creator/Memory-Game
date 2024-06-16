const joc = document.querySelector(".container");
const scor = document.getElementById("scor");
const btn = document.getElementById("btnReset")
// okCount reprezinta perechile de cartonase pe care utilizatorul le a apasat si care se potrivesc
let okCount = 0;

let poza1, poza2;
//sunt folosite pentru a stoca referintelel la care utilizatorul da click
let busy = false;

let mutari = 0;

document.addEventListener("DOMContentLoaded", onLoad);
joc.addEventListener("click", onImageClick);

function onLoad() {
    btn.addEventListener("click", onReset)
    genereazaCartonase(4, 4)
}
function onReset() {
    okCount = 0;
    btn.disabled = true;
    mutari = 0;
    joc.innerHTML = "";
    scor.textContent = "0";
    genereazaCartonase(4, 4)
}
function onImageClick(e) {
    let poza = e.target;
    console.log(e.target);
    console.log(poza);
 

    if (!poza.hasOwnProperty("k")) return
    if (poza.hasOwnProperty("done") || poza == poza1 || busy) return;
    let key = poza.k;
    if (!poza1) {
        console.log(poza1, "cum arata aceasta poza1")
        poza1 = poza;
        poza1.setAttribute("src", `./img/${key}.png`);
        console.log(poza1, "aici are acest atribut adica este poza efectiv")
    } else {
        poza2 = poza;
        console.log(poza2)
        poza2.setAttribute("src", `./img/${key}.png`);
        console.log(poza2, "e diferit data de primul consoel.log")
        mutari++;

        scor.textContent = mutari.toString();
        console.log(mutari);
        if (poza1.k == poza2.k) {
            okCount++;
            poza1.done = true;
            poza2.done = true;
            poza1 = null;
            poza2 = null;
            if (okCount == 8) {
                alert("felicitari, ati castigat");
                btn.disabled = false;
            }
        } else {
            busy = true;
            setTimeout(() => {
                poza1.setAttribute("src", " ");
                poza2.setAttribute("src", " ");
                poza1 = null
                poza2 = null;
                busy = false;

            }, 700);
        }
    }
}

function genereazaCartonase(l, c) {
    //functia fill(0) seteaza fiecare element din array la valoarea 0 aici practic am creat u
    //atentie noi avem 16 casuta si practiv va trebui ca sub fiecare cartonas sa fie aleatoriu un numar de la 1 la 8
    let keys = Array(16).fill(0);
    //fill(0) seteaza fiecare element din array la val 0
    //codul de mai sus face un array de 16 care are cifra 0 in fiecare pozitie

    let key = 0
    for (i = 0; i < keys.length; i++) {
        //     //% resutul impartii la 8

        keys[i] = i % 8 + 1;
        // console.log(keys[i], "aici am cate o cifra de la 1 la 8 care se repede de 2 ori");
        console.log(keys, "hai sa vedem ce este aici")
    }
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < c; j++) {
            //in variabila asta se stocheaza numarul generat
            //aici se genereaza un numar intre 0 si 15 si memoram aceasta pozitie in variabila ndx
            let ndx = genereazaNumar(0, keys.length - 1);
            console.log(ndx);
            // console.log(ndx, " hai sa vedem ce face acest ndx")
            //key este elementul aflat in array la pozitia generata
            key = keys[ndx];
            // console.log(key)
            // console.log(keys[ndx])
            //acest c este efectiv cartonasul pe care il are in spate 
            let c = document.createElement("img");
            // console.log(c, "unde vad acest element")
            c.k = key;
            console.log(c.k, "aici este un nr de la 1 la 8");
            // console.log(c);
            //aici pe obiectul imagine c se aplica o proprietate cu .k care  key
            keys.splice(ndx, 1);
            console.log(keys, "hai sa vedem ce este aici, avem un keys mai mic sau cum ?")
            //aici acoatem din array
            //aici splice inseamna  ca incepand cu poziti 4, daca numaratoarea incepe de la 0.1.2.3 il scoate pe 5 cum ar fi in acest caz
            // console.log(keys, "aici sunt curioasa ce fel arata keys")
            //aici se pune patratul in joc
            joc.appendChild(c);
        }
    }
}
function genereazaNumar(min, max) {
    return Math.ceil(min + Math.random() * (max - min));
}
