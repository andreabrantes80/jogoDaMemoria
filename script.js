document.addEventListener("DOMContentLoaded", () => {
  iniciarJogo();
});

function iniciarJogo() {
  const imagens = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
    "img5.jpg",
    "img6.jpg",
    "img7.jpg",
    "img8.jpg",
    "img9.jpg",
    "img10.jpg",
  ];

  let imagensDuplicadas = [...imagens, ...imagens];
  let imagensEmbaralhadas = embaralhar(imagensDuplicadas);

  const tabuleiro = document.querySelector(".tabuleiro");
  tabuleiro.innerHTML = "";

  for (let i = 0; i < imagensEmbaralhadas.length; i++) {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.innerHTML = `<img src="img/verso.jpg" alt="Verso da carta" data-imagem="img/${imagensEmbaralhadas[i]}">`;
    tabuleiro.appendChild(carta);
  }

  const cartas = document.querySelectorAll(".carta");
  let cartaVirada = null;
  let travarTabuleiro = true;
  let paresEncontrados = 0;
  let tempoRestante = 180;
  let timerId = null;

  const timerElement = document.querySelector("#timer");
  let tempoElement = document.querySelector("#tempo");


  if (!tempoElement) {

    tempoElement = document.createElement("span");
    tempoElement.id = "tempo";
    tempoElement.textContent = "3:00";
    timerElement.appendChild(tempoElement);
  }

  mostrarImagens();

  function iniciarTimer() {
    timerElement.textContent = formatarTempo(tempoRestante);
    timerId = setInterval(() => {
      tempoRestante--;
      timerElement.textContent = formatarTempo(tempoRestante);
      if (tempoRestante <= 0) {
        clearInterval(timerId);
        gameOver();
      }
    }, 1000);
  }

  function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `Tempo restante: ${minutos}:${segundosRestantes
      .toString()
      .padStart(2, "0")}`;
  }

  // function adicionarTempo() {
  //   tempoRestante += 30; // Adiciona 30 segundos
  //   timerElement.textContent = formatarTempo(tempoRestante);
  // }

  function mostrarImagens() {
    cartas.forEach((carta) => {
      const imgElement = carta.querySelector("img");

      imgElement.src = imgElement.getAttribute("data-imagem");
    });

    setTimeout(() => {
      cartas.forEach((carta) => {
        carta.querySelector("img").src = "img/verso.jpg";
      });

      travarTabuleiro = false;

      cartas.forEach((carta) => {
        carta.addEventListener("click", virarCarta);
      });
      iniciarTimer();
    }, 10000);
  }

  function virarCarta() {
    if (travarTabuleiro || this === cartaVirada) return;

    let imgElement = this.querySelector("img");

    imgElement.src = imgElement.getAttribute("data-imagem");

    if (!cartaVirada) {
      cartaVirada = this;
    } else {
      verificarPar(this, cartaVirada);

      cartaVirada = null;
    }
  }

  function verificarPar(carta1, carta2) {
    if (
      carta1.querySelector("img").getAttribute("data-imagem") ===
      carta2.querySelector("img").getAttribute("data-imagem")
    ) {
      carta1.removeEventListener("click", virarCarta);
      carta2.removeEventListener("click", virarCarta);

      paresEncontrados++;
      adicionarTempo();
      if (paresEncontrados === imagens.length) {
        clearInterval(timerId);
        fimDeJogo();
      }
    } else {
      travarTabuleiro = true;

      setTimeout(() => {
        carta1.querySelector("img").src = "img/verso.jpg";
        carta2.querySelector("img").src = "img/verso.jpg";

        removerTempo();
        travarTabuleiro = false;
      }, 2000);
    }
  }

  function fimDeJogo() {
    setTimeout(() => {
      alert(
        "Parabéns! Você encontrou todos os pares!. Clique OK para recomeçar o jogo."
      );

      iniciarJogo();
    }, 3000);
  }

  function gameOver() {
    travarTabuleiro = true;
    cartas.forEach((carta) => {
      carta.removeEventListener("click", virarCarta);
    });
    setTimeout(() => {
      alert("Tempo esgotado! Você perdeu. Clique OK para tentar novamente.");
      iniciarJogo();
    }, 1000);
  }

  function embaralhar(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function atualizarIcone(icone, cor) {
    let iconeTempo = document.querySelector("#iconeTempo");
    const timerElement = document.querySelector("#timer");

    if (!iconeTempo) {
      console.warn(
        "Elemento #iconeTempo não encontrado. Criando dinamicamente."
      );
      iconeTempo = document.createElement("span");
      iconeTempo.id = "iconeTempo";
      timerElement.appendChild(iconeTempo);
    }
    console.log(`Atualizando ícone: ${icone}, classe: ${cor}`);
    iconeTempo.textContent = icone;
    iconeTempo.className = cor;

    // Forçar re-renderização
    iconeTempo.style.display = 'none';
    iconeTempo.offsetHeight; // Trigger reflow
    iconeTempo.style.display = 'inline-block';

    // Remove o ícone após 3 segundos
    setTimeout(() => {
      iconeTempo.textContent = "";
    }, 5000);

  }

  function adicionarTempo() {
    tempoRestante += 5; // Adiciona 5 segundos
    timerElement.textContent = formatarTempo(tempoRestante);
    atualizarIcone("▲ +5s", "seta-verde");
  }

  function removerTempo() {
    tempoRestante -= 5; // Remove 5 segundos
    if (tempoRestante < 0) tempoRestante = 0; // Garante que não fique negativo
    timerElement.textContent = formatarTempo(tempoRestante);
    atualizarIcone("▼ -5s", "seta-vermelha");
  }
}
