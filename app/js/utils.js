// utils.js
function calculateClock() {
    let time = 0;
    let interval;
    let isRunning = false; // Variável para verificar se o cronômetro está em execução
    let imagePath = "../media/img/time";
    let digitElements = [
        document.getElementById("grado01"),
        document.getElementById("grado02"),
        document.getElementById("grado03")
    ];

    // Função para iniciar o cronômetro
    function startTimer() {
        // Verifica se algum dos elementos já tem o valor "notwork"
        if (digitElements.some(el => el.value === "notwork")) {
            return; // Não faz nada se algum dos elementos for "notwork"
        }

        if (isRunning) return; // Se já estiver em execução, não faz nada
        isRunning = true; // Marca que o cronômetro está em execução
        clearInterval(interval); // Limpa qualquer intervalo anterior
        time = 0; // Reseta o tempo
        interval = setInterval(updateTimer, 1000); // Inicia o cronômetro, atualizando a cada 1 segundo
    }

    // Função para parar o cronômetro
    function stopTimer() {
        clearInterval(interval); // Para o cronômetro
        isRunning = false; // Marca que o cronômetro não está mais em execução
    }

    // Função para reiniciar o cronômetro
    function resetTimer() {
        stopTimer(); // Para o cronômetro
        time = 0; // Reseta o tempo
        // Atualiza os dígitos para mostrar 0
        digitElements[0].src = `${imagePath}00.png`; // Minuto
        digitElements[1].src = `${imagePath}00.png`; // Dezena de segundos
        digitElements[2].src = `${imagePath}00.png`; // Unidade de segundos
    }

    // Função para atualizar os dígitos do cronômetro
    function updateTimer() {
        time++; // Incrementa o tempo em 1 segundo
        let minutes = Math.floor(time / 60); // Calcula os minutos
        let seconds = time % 60; // Calcula os segundos

        // Garante que o cronômetro não ultrapasse 999
        if (time >= 600) {
            clearInterval(interval); // Para o cronômetro se atingir 999 segundos
            return;
        }

        // Divide os dígitos: exibe como 3 dígitos juntos (ex: 1:23 → "123")
        let digit1 = Math.floor(minutes); // Minuto
        let digit2 = Math.floor(seconds / 10); // Primeiro dígito dos segundos
        let digit3 = seconds % 10; // Segundo dígito dos segundos

        // Atualiza as imagens dos dígitos
        digitElements[0].src = `${imagePath}0${digit1}.png`; // Minuto
        digitElements[1].src = `${imagePath}0${digit2}.png`; // Dezena de segundos
        digitElements[2].src = `${imagePath}0${digit3}.png`; // Unidade de segundos
    }

    // Retorna as funções necessárias para controle
    return {
        startTimer,
        stopTimer,
        resetTimer
    };
}

const clock = calculateClock(); // Inicia o cronômetro e obtém a referência
