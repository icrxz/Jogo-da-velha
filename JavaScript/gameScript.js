var gb;

class Player {
  constructor(name, symbol, img) {
    this.name = name;
    this.symbol = symbol;
    this.img = img;
    this.points = 0;
    this.yourTurn = false;
  }
}

class Game {
  constructor(player1, player2) {
    this.Board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
    this.rounds = 0;
    this.Player1 = player1;
    this.Player2 = player2;
  }
}

function startGame() {
  var name1;
  if ($('#namePlayer1').val().length > 0)
    name1 = $('#namePlayer1').val();
  else
    name1 = "Jon Snow";
  var pathImg1 = $('#imagePl1').attr('src');
  var name2;
  if ($('#namePlayer2').val().length > 0)
    name2 = $('#namePlayer2').val();
  else
    name2 = "Daenerys Targaryen"
  var pathImg2 = $('#imagePl2').attr('src');
  pl1 = new Player(name1, 'X', pathImg1);
  pl2 = new Player(name2, '0', pathImg2);
  pl1.yourTurn = true;

  gb = new Game(pl1, pl2);

  $('#playerSelection').hide();
  $('#gameBoard').show();
  $('#playerInformation').show();
  $('#pageFooter').show();

  $('#NameP1').text(gb.Player1.name);
  $('#NameP2').text(gb.Player2.name);
  $('#imagePlayer1').attr('src', gb.Player1.img);
  $('#imagePlayer2').attr('src', gb.Player2.img);
  $("#Points1").val(gb.Player1.points);
  $("#Points2").val(gb.Player2.points);
}

function insertPlay(posX, posY, element) {
  if (gb.Board[posX][posY] != "") {
    alert("Posição já está marcada!");
    return;
  }
  else {
    var x = element.getElementsByTagName("p");
    for (let e of x) {
      if (gb.Player1.yourTurn) {
        gb.Board[posX][posY] = gb.Player1.symbol;
        $('#' + e.id).text(gb.Player1.symbol);
        $("#player1Time").text("Player 1");
        $("#player2Time").text("Player 2, é sua vez");
      }
      else {
        gb.Board[posX][posY] = gb.Player2.symbol;
        $('#' + e.id).text(gb.Player2.symbol);
        $("#player2Time").text("Player 2");
        $("#player1Time").text("Player 1, é sua vez");
      }
    }
  }
  $("#roundsId").text(++gb.rounds);
  gb.Player1.yourTurn = gb.Player2.yourTurn;
  gb.Player2.yourTurn = !gb.Player1.yourTurn;
  verifyGame();
}

function verifyGame() {
  if (gb.rounds >= 3) {
    if (
      gb.Board[0][0] === gb.Board[1][1] && gb.Board[1][1] === gb.Board[2][2] && gb.Board[2][2] != "" ||
      gb.Board[0][2] === gb.Board[1][1] && gb.Board[1][1] === gb.Board[2][0] && gb.Board[2][0] != "" ||
      checkMatrices(gb.Board)
    ) {
      if (!gb.Player1.yourTurn) {
        alert('O jogador ' + gb.Player1.name + ' venceu!');
        $("#Points1").val(++gb.Player1.points);
      }
      else {
        alert('O jogador ' + gb.Player2.name + ' venceu!');
        $("#Points2").val(++gb.Player2.points);
      }
      restartGame()
    }
    else if (gb.rounds >= 9) {
      alert("Jogo empatado, a partida irá reiniciar!");
      restartGame();
      return;
    }
  }
}

function restartGame() {
  gb.Board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  gb.rounds = 0;
  $("#roundsId").text(gb.rounds);
  $("#gameBoard p").text("");
}

function checkMatrices(matrix) {
  for (i = 0; i < matrix.length; i++) {
    if (matrix[0][i] == matrix[1][i] && matrix[1][i] == matrix[2][i] && matrix[0][i] != "")
      return true;
    else if (matrix[i][0] == matrix[i][1] && matrix[i][1] == matrix[i][2] && matrix[i][0] != "")
      return true;
  }
}

$().ready(function () {
  $('#gameBoard').hide();
  $('#playerInformation').hide();
  $('#pageFooter').hide();

  $("#btnStart").click(function () {
    startGame();
  })

  $("#linkReset").click(function () {
    restartGame();
  })
})