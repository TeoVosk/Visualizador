const board = new Array();

let m_down = 0;
let time;
let player = 0;
let goal = 0;
let b_actual = ""

document.body.addEventListener("mousedown", () => m_down = 1)
document.body.addEventListener("mouseup", () => m_down = 0)
window.addEventListener("load", () => {
    const time_in = document.querySelector("#tiempo");
    if(!time_in.value || time_in.value < 0)
        time = 50;
    else
        time = time_in.value;
    set_board();
});
    
// Funciones -------------------------------------------------------------------------------------------------

function set_events(){
    
    // Elementos -----------------------------------------
    const player_b = document.querySelector("#player");
    const goal_b = document.querySelector("#goal");
    const wall_b = document.querySelector("#wall");
    const erase_b = document.querySelector("#erase");
    const clear = document.querySelector("#clear");
    const go = document.querySelector("#go");
    const generate = document.querySelector("#generate");
    const time_in = document.querySelector("#tiempo");
    const select = document.querySelector("select");
    // -------------------------------------------------
    
    const botones = [player_b, goal_b, wall_b, erase_b];

    generate.addEventListener("click", e => refresh_board(maze))
    
    clear.addEventListener("click", e => location.reload());
    
    go.addEventListener("click", e => {
        let cola = new Array(); //para bfs
        let pila = new Array(); //para dps
        let end = 0;
        const algos = [dfs, bfs, dir];
        if(player){
            cola.push(p_loc)
            let visited = build_visited();
            algos[parseInt(select.value)](p_loc[0], p_loc[1], cola, pila, visited, 0)
        }
    });
    
    for (let i = 0; i < botones.length; i++)
        botones[i].addEventListener("click", e => b_actual = e.target.innerText);
    
    time_in.addEventListener("input", () => {
        if(!time_in.value || time_in.value < 0)
            time = 50;
        else
            time = time_in.value;
        
    });

}

function set_cells(e, n, i, j, b_actual) {
    if (m_down || n) {
        switch (b_actual) {
            case "Erase":
                flag = 0;
                e.target.style.backgroundColor = "initial";
                break;

            case "Wall":
                flag = 0;
                e.target.style.backgroundColor = "black";
                break;

            case "Player":
                if (player === 0) {
                    p_loc = [i, j];
                    flag = 1;
                    player = 1;
                    e.target.style.backgroundColor = "red";
                    e.target.className = b_actual;
                }
                break;

            case "Goal":
                if (!goal) {
                    dest = [i, j]
                    flag = 1;
                    goal = 1;
                    e.target.style.backgroundColor = "blue";
                    e.target.className = b_actual;
                }
                break;
        }

        console.log(b_actual)
        console.log(["Erase", "Wall"].includes(b_actual))
        if (["Erase", "Wall"].includes(b_actual)) {
            if (e.target.className === "Player")
                player = 0;
            else if (e.target.className === "Goal")
                goal = 0;
            e.target.className = b_actual;
        }

    }

}

function set_board(){

    set_events();

    const tbody = document.querySelector("#tbody_m");
    const tr = document.createElement("tr");
    const td = document.createElement("td");

    for (let i = 0; i < 25; i++) {
        board[i] = new Array();
        tbody.appendChild(tr.cloneNode(true));
        for (let j = 0; j < 50; j++) {
            board[i][j] = td.cloneNode(true);
            board[i][j].addEventListener("mouseenter", e => set_cells(e, 0, i, j, b_actual));
            board[i][j].addEventListener("click", e => set_cells(e, 1, i, j, b_actual));
            tbody.lastChild.appendChild(board[i][j]);
        }
    }
}

function refresh_board(arr) {
    const tbody = document.querySelector("#tbody_m");
    const tr = document.createElement("tr");
    const td = document.createElement("td");

    player = 0;
    goal = 0;

    while (tbody.lastChild)
        tbody.removeChild(tbody.lastChild);

    for (let i = 0; i < 25; i++) {
        board[i] = new Array();
        board[i] = arr[i].slice();
        tbody.appendChild(tr.cloneNode(true));
        for (let j = 0; j < 50; j++) {
            board[i][j] = td.cloneNode(true);

            if (arr[i][j] === 1) {
                board[i][j].className = "Wall";
                board[i][j].style.backgroundColor = "black";
            }

            board[i][j].addEventListener("mouseenter", e => set_cells(e, 0, i, j, b_actual));
            board[i][j].addEventListener("click", e => set_cells(e, 1, i, j, b_actual));
            tbody.lastChild.appendChild(board[i][j]);
        }
    }

}

// ----------------------------------------------------------------------------------------