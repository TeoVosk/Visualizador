async function q_sort(arr, none, min, max, doble) {

    const c2 = document.querySelector("#c2");
    const c3 = document.querySelector("#c3");
    c2.innerText = "Pivot"
    c3.innerText = "Comparando"

    if (max <= min)
        return;

    const tr = document.querySelector("#main");

    let piv = await partition(arr, min, max);

    while (tr.lastChild)
        tr.removeChild(tr.lastChild);

    for (let j = 0; j < arr.length; j++)
        tr.appendChild(arr[j]);

    console.log(max, piv+ Math.floor(piv/2) -1)

    await Promise.all([
        q_sort(arr, 0, min, Math.floor(piv/2 -1), doble),
        q_sort(arr, 0, Math.floor(piv/2), piv + Math.floor(piv/2) -1, doble),
        q_sort(arr, 0, piv + Math.floor(piv/2), max, doble)
    ]);

}

async function partition(arr, min, max) {
    const tr = document.querySelector("#main");
    let k = min - 1;
    let piv = arr[max]
    arr[max].style.backgroundColor = "red"
    for (let m = min; m < max; m++) {
        arr[m].style.backgroundColor = "purple"
        if (arr[m].valor > piv.valor) {
            k++;

            while (tr.lastChild)
                tr.removeChild(tr.lastChild);

            for (let j = 0; j < arr.length; j++)
                tr.appendChild(arr[j]);

            await sleep(time)

            swap(arr, m, k);

        }
    }

    swap(arr, max, k + 1)

    for (let j = 0; j < arr.length; j++)
        arr[j].style.backgroundColor = "blue";

    return k + 1;

}

function swap(arr, idx1, idx2) {
    let tmp = arr[idx2];
    arr[idx2] = arr[idx1];
    arr[idx1] = tmp;
}

/*
let pila = []
let n = 0
let flag = 0

let matrix = [
	[1,0,0,1,0],
	[1,0,1,0,0],
	[0,0,1,0,1],
	[1,0,1,0,1],
	[1,0,1,1,0]
]

let visited = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0]
]

let rows = matrix.length;
let cols = matrix[0].length;

//riverSizes(matrix);

function riverSizes(matrix){
	
	arr_out = []
	for(let i=0;i<matrix.length;i++){
		for(let j=0;j<matrix[i].length;j++){
			pila = []
			//armar_visited()
            dfs(matrix, 0, 0);
            if(n>0){
                console.log(i,j)
                arr_out.push(n)
            }
			n=0
		}
    }
    console.log(arr_out)
}

function dfs(arr, i, j){
	//console.log(arr)	
	let neigh = [];
	
	if(flag == 1)
		return;
	
	if(i<0 || j<0 || i>=rows || j>=cols || visited[i][j] === 1 || matrix[i][j] === 0)
		return;
	
	n += 1
	
	pila.push([i,j])
	visited[i][j] = 1
	
	for(let k=0;k<4;k++){
		neigh = [[i-1,j],[i,j-1],[i+1,j],[i,j+1]]
		dfs(arr, neigh[k][0], neigh[k][1])
	}
		
	pila.pop()
	
	if(pila.length === 0){
		flag = 1
		return;
	}
	
}

function armar_visited(){
	for(let i=0;i<matrix.length;i++){
		let tmp = []
		for(let j=0;j<matrix[i].length;j++)
			tmp.push(0)
		visited.push(tmp.slice())
	}
}

// Do not edit the line below.
//exports.riverSizes = riverSizes;
//riverSizes(matrix)*/