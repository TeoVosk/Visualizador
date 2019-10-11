let end =0;

function set_maze_gen(arr, i, j, pila) {
    for (let i = 0; i < arr.length; i++)
        for (let j = 0; j < arr[i].length; j++)
            arr[i][j].style.backgroundColor = "black";

    let visited = build_visited();

    maze_gen(arr, i, j, visited, pila);   
}

async function maze_gen(arr, i, j, visited, pila) {

    if (!check(arr, i, j, visited))
        return;

    if(await check_neighs(arr, i, j, true))
        return;

    visited[i][j] = 1;
    arr[i][j].className = "";
    arr[i][j].style.backgroundColor = "red"

    pila.push([i, j]);

    let neigh;
    let n;
    let rands = new Array();

    for (let k = 0; k < 4; k++) {
        while (rands.includes(n = Math.floor(Math.random() * 4)));
        rands.push(n)
        neigh = [
            [i - 1, j],
            [i, j - 1],
            [i + 1, j],
            [i, j + 1]
        ];
        await maze_gen(arr, neigh[n][0], neigh[n][1], visited, pila)
    }

    if (end === 1) return;

    pila.pop()

    if (pila.length === 0)
        b_fin();


    async function check_neighs(arr, i, j, f) {
        let t;
        if(!check(arr, i, j, visited))
            return;
        arr[i][j].style.backgroundColor = "orange";
        k: for (let k = 0; k < 4; k++) {
            await sleep(10)
            let neigh = [
                [i - 1, j],
                [i, j - 1],
                [i + 1, j],
                [i, j + 1]
            ];
            if (f) {
                arr[i][j].style.backgroundColor = "orange";
                t = await check_neighs(arr, neigh[k][0], neigh[k][1], false)
                if (t) {
                    arr[i][j].style.backgroundColor = "initial";
                    return true;
                }
            } else {
                if (check(arr, neigh[k][0], neigh[k][1], visited))
                    if (arr[neigh[k][0]][neigh[k][1]].style.backgroundColor === "initial")
                        return true;
            }
        }
    }

    function check(arr, i, j, visited) {
        if (i < 0 || j < 0 || i >= arr.length || j >= arr[0].length || visited[i][j] === 1 || arr[i][j].style.backgroundColor === "")
            return false;
        else
            return true;
    }

}
