/*let x = 0;
const y = 15;
let flag = 1;

class Node {
    constructor(n) {
        this.height = Math.floor(Math.random() * (500 - 0) + 0);
        this.build = function () {
            fill(0, 0, 0);
            if(!n)
                rect(5+(n*10), 400, 10, this.height);
            else
                rect(7+(n*10), 400, 10, this.height);
        };
    }
}
*/

let h = 400;
let w = 1271; 
let arr;
let i = -1;
let j = 0;
let ended = 0;

function setup() {
    createCanvas(w, h);
    background(0)
    
    arr = new Array(w);
    for(let i=0;i<w;i++){
        arr[i] = random(h);
    }

}


function draw() {
    background(0);
    if(!ended)
        b_sort();


}

function q_sort(arr, min, max){
    //modif = new Array(w);
    if(max <= min)
        return;

    let piv = partition(arr, min, max);

    for (let k = 0; k < arr.length; k++) {
        stroke(255);
        if (k === piv)
            stroke(255, 0, 0);
        /*if(elem_en(k, modif) != -1)
            stroke(0,255,0);*/
        line(k, h, k, h - arr[k])
    }

    q_sort(arr, min, piv-1);
    q_sort(arr, piv+1, max);

}

function partition(arr, min, max){
    let k = min-1;
    let piv = arr[max]
    for(let m=min;m<max;m++){
        if(arr[m]>piv){
            k++;
            swap(arr, j, k);
        }
    }
    swap(arr[max], arr[k+1])

    return k+1;

}

function b_sort(){
    modif = new Array(w);
    i++;
    if(i<arr.length-1){
        for (j = 0; j < arr.length; j++) {
            if (arr[i] < arr[j]) {
                modif.push(j);
                swap(arr, j, i)
            }
        }
    } else {
        i = -1;
        j = 0;
        ended = 1;
    }

    for (let k = 0; k < arr.length; k++) {
        stroke(255);
        if (k === i)
            stroke(255, 0, 0);
        if(elem_en(k, modif) != -1)
            stroke(0,255,0);
        line(k, h, k, h - arr[k])
    }

    menores = []

}

function elem_en(n, arr){
    for(let p = 0;p<arr.length;p++){
        if(arr[p] === n)
            return p;
    }
    return -1;

}

function swap(arr, idx1, idx2){
    let tmp = arr[idx2];
    arr[idx2] = arr[idx1];
    arr[idx1] = tmp;
}