// handle.js
const rows = 9;
const cols = 9;
const totalBombs = 10; // Número de bombas
const board = Array.from({ length: rows }, () => Array(cols).fill(0));
let gameOver = false; // Variável para controlar o estado do jogo

// Função para colocar bombas
function placeBombs() {
    let placedBombs = 0;
    while (placedBombs < totalBombs) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (board[row][col] !== "B") {
            // Verifica se não há bomba
            board[row][col] = "B";
            placedBombs++;
            updateSurroundingSquares(row, col);
        }
    }
}

// Função para atualizar contagem de bombas nas células adjacentes
function updateSurroundingSquares(bombRow, bombCol) {
    for (let r = bombRow - 1; r <= bombRow + 1; r++) {
        for (let c = bombCol - 1; c <= bombCol + 1; c++) {
            if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] !== "B") {
                board[r][c]++;
            }
        }
    }
}

// Função para revelar todas as bombas
function revealAllBombs() {
    const cells = document.querySelectorAll(".findTheRightSquare");
    cells.forEach(cell => {
        const cellType = cell.dataset.type;
        if (cellType === "B") {
            cell.src = "../media/img/bomba.png"; // Revela a imagem da bomba
        }
    });
}

// Coloca as bombas no tabuleiro
placeBombs();

// Cria o tabuleiro visual
const boardElement = document.getElementById("euamojessica");
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let cellValue = board[i][j];
        let imgSrc = "../media/img/show/vazio.png"; // Caminho da imagem coberta inicial
        // Cria a célula do tabuleiro
        const img = document.createElement("img");
        img.id = "checkCel";
        img.className = "findTheRightSquare";
        img.dataset.type = cellValue;
        img.src = imgSrc;
        img.alt = "covered";
        img.dataset.revealed = "false";
        // Adiciona a célula ao tabuleiro
        boardElement.appendChild(img);
    }
}

// Função de clique para revelar a célula
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("findTheRightSquare")) {
        if (gameOver) return; // Se o jogo acabou, ignora cliques
        const cell = event.target;
        const cellType = cell.dataset.type;
        const revealed = cell.dataset.revealed === "true";
        // Revela a célula apenas se ainda não estiver revelada
        if (!revealed) {
            if (cellType === "B") {
                cell.src = "../media/img/bomba.png"; // Caminho da imagem de bomba revelada
                gameOver = true; // Marca o jogo como encerrado
                revealAllBombs(); // Revela todas as bombas
                clock.stopTimer(); // Para o cronômetro
                
                // Define os valores como "notwork" ao encontrar uma bomba
                document.getElementById("grado01").value = "notwork";
                document.getElementById("grado02").value = "notwork";
                document.getElementById("grado03").value = "notwork";
            } else if (cellType > 0) {
                cell.src = `../media/img/show/${cellType}.png`; // Revela a imagem do número correto
            } else {
                cell.src = "../media/img/nada.png"; // Revela a célula vazia
            }
            cell.dataset.revealed = "true"; // Atualiza o estado para "revelado"
        }

        // Se o cronômetro ainda não foi iniciado, inicie-o
        clock.startTimer(); // Inicia o cronômetro se não estiver em execução
    }
});

// Reinicia o jogo ao clicar na carinha3
const carinhaElement = document.querySelector('.carinha');
carinhaElement.addEventListener('click', function () {
    window.location.reload(); // Recarrega a página
    clock.resetTimer(); // Reseta o cronômetro ao reiniciar o jogo
});
