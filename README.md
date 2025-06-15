# Jogo da Memória

Um jogo da memória interativo e responsivo implementado com HTML, CSS e JavaScript. O objetivo é encontrar todos os pares de cartas dentro de um limite de tempo de 5 minutos, com um bônus de 30 segundos adicionado ao timer a cada par acertado.

## Funcionalidades

- **Tabuleiro 4x5**: Contém 20 cartas (10 pares) dispostas em 4 linhas e 5 colunas.
- **Exibição inicial**: As cartas são exibidas por 10 segundos no início do jogo para memorização.
- **Timer**: O jogo tem um limite de 5 minutos, iniciando após a exibição inicial. Cada par acertado adiciona 30 segundos ao tempo restante.
- **Responsividade**: O layout se adapta a diferentes tamanhos de tela, incluindo celulares e tablets.
- **Interatividade**: Clique nas cartas para virá-las e encontrar pares. O jogo reinicia automaticamente após vitória ou esgotamento do tempo.
- **Mensagens**: Alertas informam quando o jogador vence ("Parabéns! Você encontrou todos os pares!") ou perde ("Tempo esgotado! Você perdeu.").

## Estrutura do Projeto


- `index.html`: Estrutura da página com o título, timer e tabuleiro.
- `styles.css`: Estilos para o layout responsivo, incluindo grid 4x5 e estilização do timer.
- `script.js`: Lógica do jogo, incluindo embaralhamento, virada de cartas, verificação de pares e gerenciamento do timer.
- `img/`: Diretório com as imagens das cartas (`verso.jpg` para o verso e `img1.jpg` a `img10.jpg` para os pares).

## Pré-requisitos

- Um navegador moderno (Chrome, Firefox, Edge, etc.).
- As imagens devem estar no diretório `img/` com os nomes corretos (`verso.jpg` e `img1.jpg` a `img10.jpg`).




