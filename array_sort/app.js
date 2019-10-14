let time;
let array;

window.addEventListener("load", () => {
    const time_in = document.querySelector("#tiempo");
    if (parseInt(time_in.value < 0))
        time = 50;
    else
        time = parseInt(time_in.value);
    set_events();
    handler_arr();
});

// Bubble sort ------------------------------------------------------

async function b_sort(arr) {

    const c1 = document.querySelector("#c1");
    c1.innerText = "Desplazandose";

    if (arr.length <= 1)
        return;

    let j;

    for (let i = 0; i < (arr.length - 1); i++) {
        for (j = 0; j < arr.length - i - 1; j++) {
            if (arr[j].valor > arr[j + 1].valor) {

                arr[j].style.backgroundColor = "green";

                swap(arr, j, j + 1);

                refresh_array(arr);

            }

            await sleep(time);
            arr[j].style.backgroundColor = "blue";

        }
        arr[j].style.backgroundColor = "red";
    }

}

// Recursive bubble sort ------------------------------------------------------

async function rec_b_sort(arr, cant) {

    const c1 = document.querySelector("#c1");
    c1.innerText = "Desplazandose"

    if (cant === 1) {
        return;
    }

    let i

    for (i = 0; i < cant - 1; i++) {
        if (arr[i].valor > arr[i + 1].valor) {

            arr[i].style.backgroundColor = "green";


            swap(arr, i, i + 1);
            refresh_array(arr);

        }

        await sleep(time);
        arr[i].style.backgroundColor = "blue";

    }

    arr[i].style.backgroundColor = "red";

    if (cant - 1 === 1) {
        return;
    }

    await rec_b_sort(arr, cant - 1);

}

/* QS ------------------------------------------------------------------ */

async function q_sort(arr, none, min, max, doble) {

    const c2 = document.querySelector("#c2");
    const c3 = document.querySelector("#c3");
    c2.innerText = "Pivot"
    c3.innerText = "Comparando"

    if (max <= min)
        return;

    let piv = await partition(arr, min, max);

    refresh_array(arr);

    if (doble) {
        await Promise.all([
            q_sort(arr, 0, min, piv - 1, doble),
            q_sort(arr, 0, piv + 1, max, doble)
        ]);
    } else {
        await q_sort(arr, 0, min, piv - 1, doble);
        await q_sort(arr, 0, piv + 1, max, doble);
    }

}

async function partition(arr, min, max) {
    let k = min - 1;
    let piv = arr[max]
    arr[max].style.backgroundColor = "red"

    for (let m = min; m < max; m++) {
        arr[m].style.backgroundColor = "green"
        await sleep(time)
        if (arr[m].valor > piv.valor) {
            k++;

            refresh_array(arr);;

            swap(arr, m, k);

        }
    }

    swap(arr, max, k + 1)

    for (let j = 0; j < arr.length-1; j++)
        arr[j].style.backgroundColor = "blue";

    return k + 1;

}

/* Merge ------------------------------------------------------------------ */

async function m_sort(arr, none, min, max, doble) {

    const c1 = document.querySelector("#c1");
    const c2 = document.querySelector("#c2");
    const c3 = document.querySelector("#c3");
    c1.innerText = "..."
    c2.innerText = "Comparando 1era Mitad"
    c3.innerText = "Comparando 2a Mitad"

    if (max < 0 || min < 0 || max <= min)
        return;

    if (arr.length > 1) {
        if (doble) {
            await Promise.all([
                m_sort(arr, 0, min, Math.floor((max - min) / 2) + min),
                m_sort(arr, 0, Math.floor((max - min) / 2) + min + 1, max)
            ]);
        } else {
            await m_sort(arr, 0, min, Math.floor((max - min) / 2) + min);
            await m_sort(arr, 0, Math.floor((max - min) / 2) + min + 1, max)
        }
    }

    await merge(arr, min, max);

}

async function merge(arr, min, max) {

    if (max === min)
        return;

    const p_mitad = Math.floor((max - min) / 2) + min;
    let arr_ord = new Array();
    let i;
    let j = p_mitad + 1;

    i: for (i = min; i <= p_mitad; i++) {

        arr[i].style.backgroundColor = "red";
        arr[j].style.backgroundColor = "green";

        await sleep(time);
        refresh_array(arr);

        arr[i].style.backgroundColor = "blue";
        arr[j].style.backgroundColor = "blue";

        if (arr[i].valor > arr[j].valor) {
            arr_ord.push(arr[j]);
            j++;
            i--;
        } else {
            arr_ord.push(arr[i])
            continue i;
        }
        if (j > max) {
            i++;
            break i;
        }
    }
    if (i <= p_mitad)
        for (i; i <= p_mitad; i++)
            arr_ord.push(arr[i])
    else
        for (j; j <= max; j++)
            arr_ord.push(arr[j])

    copiar_en(arr_ord, arr, min);

    function copiar_en(arr_in, arr_out, desde) {
        for (let i = 0; i < arr_in.length; i++)
            arr_out[i + desde] = arr_in[i];
    }

}

/* Insertion ------------------------------------------------------------------ */

async function i_sort(arr){

    const c1 = document.querySelector("#c1");
    const c2 = document.querySelector("#c2");
    const c3 = document.querySelector("#c3");
    c1.innerText = "..."
    c2.innerText = "A insertar"
    c3.innerText = "Comparando"

    for(i=1;i<arr.length;i++){
        let j = i-1;
        let val = arr[i];

        arr[i].style.backgroundColor = "red";

        while(j>=0 && arr[j].valor<val.valor){
            
            arr[j].style.backgroundColor = "green";
            await sleep(time);
            refresh_array(arr);
            arr[j].style.backgroundColor = "blue";

            arr[j+1] = arr[j];
            j--;

        }

        val.style.backgroundColor = "blue";
        arr[j+1] = val;

    }

    for (let j = 0; j < arr.length; j++)
            arr[j].style.backgroundColor = "blue";
        
}

/* Selection ------------------------------------------------------------------ */

async function s_sort(arr){

    const c1 = document.querySelector("#c1");
    const c2 = document.querySelector("#c2");
    const c3 = document.querySelector("#c3");
    c1.innerText = "..."
    c2.innerText = "Comparando con máximo"
    c3.innerText = "Buscando máximo"

    for(i=0;i<arr.length-1;i++){
        let max = 0;
        let max_idx = i;

        arr[i].style.backgroundColor = "red";

        for(let j=i;j<arr.length;j++){

            if(j>i)
                arr[j].style.backgroundColor = "green";

            await sleep(time);
            refresh_array(arr);

            if(j>i)
                arr[j].style.backgroundColor = "blue";

            if(arr[j].valor > max){
                max = arr[j].valor;
                max_idx = j;
            }
        }
        arr[i].style.backgroundColor = "blue";
        swap(arr, max_idx, i);
    }
        
}

// Otras func ------------------------------------------------

function handler_arr(e) {
    const tr = document.querySelector("#main");
    const range = document.querySelector("#range");
    array = new Array();
    while (tr.lastChild)
        tr.removeChild(tr.lastChild);
    for (let i = 0; i < range.value; i++) {
        array[i] = document.createElement("tr");
        array[i].valor = Math.floor(Math.random() * (500 - 0) + 0);
        array[i].style.height = `${array[i].valor}px`;
        tr.appendChild(array[i]);
    }
}

function set_events() {
    const range = document.querySelector("#range");
    const time_in = document.querySelector("#tiempo");
    const botones = document.querySelectorAll("button");

    botones[0].addEventListener("click", async function(e) {
        let iv;
        let counter = 0;
        const selector = document.querySelector("#selector");
        const time_d = document.querySelector("#time");
        const alg = [b_sort, rec_b_sort, q_sort, q_sort, m_sort, m_sort, i_sort, s_sort];
        iv = setInterval(() => {
            counter += 1;
            time_d.innerText = counter;
        }, 1)
        await alg[parseFloat(selector.value)](array, range.value, 0, array.length - 1, (selector.value === "3" || selector.value === "5") ? true : false)
        refresh_array(array);
        clearInterval(iv);
    });

    range.addEventListener("input", e => {
        const range_n = document.querySelector("#range_n");
        range_n.innerText = e.target.value;
        handler_arr();
    });

    botones[1].addEventListener("click", () => {
        location.reload()
    });

    time_in.addEventListener("input", () => {
        if (!time_in.value || time_in.value < 0)
            time = 50;
        else
            time = time_in.value;
    })

}

function swap(arr, idx1, idx2) {
    let tmp = arr[idx2];
    arr[idx2] = arr[idx1];
    arr[idx1] = tmp;
}

function sleep(ms) {
    if (parseInt(ms) > 0)
        return new Promise(resolve => setTimeout(resolve, ms));
}

function refresh_array(arr) {

    const tr = document.querySelector("#main");

    while (tr.lastChild)
        tr.removeChild(tr.lastChild);

    for (let j = 0; j < arr.length; j++)
        tr.appendChild(arr[j]);
}