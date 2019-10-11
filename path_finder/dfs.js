// BFS ----------------------------------------------------------------------------------------------------

async function bfs(i, j, cola, none, visited, end) {

    let neigh = new Array();

    let rows = board.length;
    let cols = board[0].length;

    if (i < 0 || j < 0 || i >= rows || j >= cols)
        return;

    let color = board[i][j].style.backgroundColor;

    if (end) 
        return 1;

    if (board[i][j].className != "Player")
        board[i][j].style.backgroundColor = "orange";

    await sleep(time);

    board[i][j].style.backgroundColor = color;

    if (board[i][j].className === "Wall" || visited[i][j] === 1)
        return;

    if (board[i][j].className != "Player")
        board[i][j].style.backgroundColor = "green";

    visited[i][j] = 1;

    if (board[i][j].className === "Goal")
        return fin();

    if (end)
        return 1;

    for (let k = 0; k < 4; k++) {
        neigh = [
            [i - 1, j],
            [i, j - 1],
            [i + 1, j],
            [i, j + 1]
        ];
        let p1 = neigh[k][0];
        let p2 = neigh[k][1]
        if (check(p1, p2))
            cola.push([p1, p2])
    }

    cola.shift();

    if (cola.length === 0)
        return b_fin();

    await bfs(cola[0][0], cola[0][1], cola, none, visited, end);

    // Funciones de ayuda -------------------------------------------------------------------------------

    function compare(arr1, arr2) {
        if (arr1.length != arr2.length)
            return false;
        for (let i = 0; i < arr1.length; i++)
            if (arr1[i] != arr2[i])
                return false
        return true;
    }

    function arr_in_arr(arr_in, arr_out) {
        for (let i = 0; i < arr_out.length; i++) {
            if (compare(arr_out[i], arr_in)) {
                return true;
            }
        }
        return false;
    }

    function check(p1, p2) {
        if (arr_in_arr([p1, p2], cola.slice(), ) || (p1 < 0 || p2 < 0 || p1 >= rows || p2 >= cols || board[p1][p2].className === "Wall" || visited[p1][p2] === 1))
            return false;
        return true;
    }

    function fin() {
        console.log("fin");
        return 1;
    }

}

// DFS ---------------------------------------------------------------------------------------------------

async function dfs(i, j, none, pila, visited, end) {

    let neigh = new Array();
    let rows = board.length;
    let cols = board[0].length;

    if (i < 0 || j < 0 || i >= rows || j >= cols)
        return 0;

    let color = board[i][j].style.backgroundColor;

    board[i][j].style.backgroundColor = "orange";

    await sleep(time);

    board[i][j].style.backgroundColor = color;

    if (board[i][j].className === "Wall" || visited[i][j] === 1)
        return 0;

    if (board[i][j].className != "Player")
        board[i][j].style.backgroundColor = "green";

    if (board[i][j].className === "Goal")
        return fin();

    visited[i][j] = 1;
    pila.push([i, j])

    for (let k = 0; k < 4; k++) {
        neigh = [
            [i - 1, j],
            [i, j + 1],
            [i + 1, j],
            [i, j - 1]
        ];

        end = await dfs(neigh[k][0], neigh[k][1], none, pila, visited);
        if (end) 
            return 1;
    }

    pila.pop()

    if (pila.length === 0)
        return b_fin();

    // Funciones de ayuda -------------------------------------------------------------------------------

    function fin() {
        console.log("Fin");
        pila.shift();
        for (let i = 0; i < pila.length; i++)
            board[pila[i].slice()[0]][pila[i].slice()[1]].style.backgroundColor = "orange";
        return 1;

    }

}

// Busqueda direccionada ---------------------------------------------------------------------------------------------------

async function dir(i, j, none, pila, visited, end) {

    let neigh = new Array();
    let rows = board.length;
    let cols = board[0].length;

    if (i < 0 || j < 0 || i >= rows || j >= cols)
        return 0;

    let color = board[i][j].style.backgroundColor;

    board[i][j].style.backgroundColor = "orange";

    await sleep(time);

    board[i][j].style.backgroundColor = color;

    if (board[i][j].className === "Wall" || visited[i][j] === 1)
        return 0;

    if (board[i][j].className != "Player")
        board[i][j].style.backgroundColor = "green";

    if (board[i][j].className === "Goal")
        return fin();

    visited[i][j] = 1;
    pila.push([i, j])

    let recorrer = set_recorrido(dest, i, j, end)

    for (let k = 0; k < 4; k++){
        end = await dir(recorrer[k][0], recorrer[k][1], none, pila, visited, end);
        if (end) 
            return 1;
    }

    pila.pop()

    if (pila.length === 0)
        return b_fin();

    // Funciones de ayuda -------------------------------------------------------------------------------

    function fin() {
        console.log("Fin");
        pila.shift();
        for (let i = 0; i < pila.length; i++)
            board[pila[i].slice()[0]][pila[i].slice()[1]].style.backgroundColor = "orange";
        return 1;
    }

    function set_recorrido(dest, i, j, end) {
        
        if (end) 
            return;
        neigh = [
            [i - 1, j],
            [i, j + 1],
            [i + 1, j],
            [i, j - 1]
        ];

        let recorrer = new Array();

        if(dest[0]<i)
            recorrer.push([i-1, j])
        else if(dest[0]>i)
            recorrer.push([i+1, j])

        if(dest[1]<j)
            recorrer.push([i, j-1])
        else if(dest[1]>j)
            recorrer.push([i, j+1])

        for(let k=0;k<4;k++)
            if(!nested_includes(recorrer, neigh[k]))
                recorrer.push(neigh[k]);
        
        return recorrer;

        
        function nested_includes(arr_out, arr_in){
            c: for(let c=0;c<arr_out.length;c++){
                for(let d=0;d<arr_out[c].length;d++){
                    if(arr_out[c].length != arr_in.length || arr_out[c][d] != arr_in[d]){
                        if(c>=arr_out.length-1)
                            return false;
                        else
                            continue c;
                    }
                }
                return true; 
            }
        }

    }
    

}

// Otras funciones --------------------------------

function build_visited() {
    let visited = new Array()
    let tmp = new Array()
    let rows = board.length;
    let cols = board[0].length;

    for (let j = 0; j < cols; j++)
        tmp.push(0);
    for (let i = 0; i < rows; i++)
        visited.push(tmp.slice());

    return visited;
}

function b_fin() {
    console.log("No existe camino");
    return 1;
}

function sleep(ms) {
    if (ms > 0)
        return new Promise(resolve => setTimeout(resolve, ms));
}