$(document).ready(function() {
    
      var index = {
        "one": [0, 0],
        "two": [0, 1],
        "three": [0, 2],
        "four": [1, 0],
        "five": [1, 1],
        "six": [1, 2],
        "seven": [2, 0],
        "eight": [2, 1],
        "nine": [2, 2]
      };
    
      function Move() {
        this.row = 0;
        this.col = 0;
      }
      var player = "x";
      var opponent = "o";
    
      function isMovesLeft(value) {
        for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 3; j++) {
            if (value[i][j] === "_") {
              return true;
            }
          }
        }
        return false;
      }
    
      function evaluate(value) {
        for (var row = 0; row < 3; row++) {
          if (value[row][0] === value[row][1] && value[row][1] === value[row][2]) {
            if (value[row][0] === player) {
              return +10;
            } else if (value[row][0] === opponent) {
              return -10;
            }
          }
        }
    
        for (var col = 0; col < 3; col++) {
          if (value[0][col] === value[1][col] && value[1][col] === value[2][col]) {
            if (value[0][col] === player) {
              return +10;
            } else if (value[0][col] === opponent) {
              return -10;
            }
          }
        }
    
        if (value[0][0] === value[1][1] && value[1][1] === value[2][2]) {
          if (value[0][0] === player) {
            return +10;
          } else if (value[0][0] === opponent) {
            return -10;
          }
        }
    
        if (value[0][2] === value[1][1] && value[1][1] === value[2][0]) {
          if (value[0][2] === player) {
            return +10;
          } else if (value[0][2] === opponent) {
            return -10;
          }
        }
    
        return 0;
      }
    
      function minimax(board, depth, isMax) {
    
        var score = evaluate(board);
    
        if (score === 10) {
          return score;
        }
    
        if (score === -10) {
          return score;
        }
    
        if (isMovesLeft(board) === false) {
          return 0;
        }
    
        //console.log(score);
    
        if (isMax) {
          var best = -1000;
    
          for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
              if (board[i][j] === "_") {
                board[i][j] = player;
    
                best = Math.max(best, minimax(board, depth + 1, !isMax));
                //console.log(best);
    
                board[i][j] = "_";
              }
            }
          }
    
          return best;
        } else {
          var best = 1000;
    
          for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
              if (board[i][j] === "_") {
                board[i][j] = opponent;
    
                best = Math.min(best, minimax(board, depth + 1, !isMax));
                // console.log(board);
    
                board[i][j] = "_";
              }
            }
          }
    
          return best;
        }
    
      }
    
      function findBestMove(board) {
    
        var bestVal = -1000;
        var bestMove = new Move();
        bestMove.row = -1;
        bestMove.col = -1;
    
        for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 3; j++) {
    
            if (board[i][j] === "_") {
              board[i][j] = player;
    
              var moveVal = minimax(board, 0, false);
    
              board[i][j] = "_";
    
              // console.log(moveVal);
              if (moveVal > bestVal) {
                bestMove.row = i;
                bestMove.col = j;
                bestVal = moveVal;
                // console.log(bestVal);
    
              }
            }
    
          }
        }
    
        return bestMove;
    
      }
    
      var mainIndex = [
        ["one", "two", "three"],
        ["four", "five", "six"],
        ["seven", "eight", "nine"]
      ];
    
      var mainBoard = [
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"]
      ];
    
      $("#main").hide();
    
      $(".squares").on("click", function() {
    
        var id = $(this).attr("id");
        //console.log(index[id]);
        var arr = index[id];
        if(mainBoard[arr[0]][arr[1]] !== "_"){
          return;
        }
        
        id = '#' + id;
        $(id).html(opponent);
    
        //console.log(arr);
        mainBoard[arr[0]][arr[1]] = opponent;
    
        if (evaluate(mainBoard) === -10) {
          $("#main").fadeTo(1000,0.4);
          $("#chooser").fadeIn();
          $("#result").fadeIn();
          $("#result").html("You win!");
          $(".squares").prop("disabled",true);
          return;
        }
        if (isMovesLeft(mainBoard) === false) {
         $("#main").fadeTo(1000,0.4);
          $("#chooser").fadeIn();
          $("#result").fadeIn();
          $("#result").html("Draw!");
           $(".squares").prop("disabled",true);
          return;
        }
    
        // console.log(mainBoard);
    
        var nowMove = findBestMove(mainBoard);
        var newId = mainIndex[nowMove.row][nowMove.col];
        $("#" + newId).html(player);
        mainBoard[nowMove.row][nowMove.col] = player;
    
        if (evaluate(mainBoard) === 10) {
         $("#main").fadeTo(1000,0.4);
          $("#result").fadeIn();
          $("#result").html("You lost!");
          $("#chooser").fadeIn();
           $(".squares").prop("disabled",true);
          return;
        }
    
        if (isMovesLeft(mainBoard) === false) {
         $("#main").fadeTo(1000,0.4);
          $("#chooser").fadeIn();
          $("#result").fadeIn();
          $("#result").html("Draw!");
         $(".squares").prop("disabled",true);
          return;
        }
    
      });
    
      $("#xBtn").on("click", function() {
    
        player = "o";
        opponent = "x";
        $("#chooser").fadeOut();
        $("#result").fadeOut();
        $("#main").fadeTo(1000,1.0);
        $(".squares").prop("disabled",false);
    
        mainBoard = [
          ["_", "_", "_"],
          ["_", "_", "_"],
          ["_", "_", "_"]
        ];
        var keys = Object.keys(index);
        //console.log(keys);
        for (var i = 0; i < keys.length; i++) {
    
          //console.log(keys[i]);
          $("#" + keys[i]).html("");
        }
        $("main").empty();
    
        var rand = Math.floor(Math.random() * (keys.length + 1));
    
        var arr = index[keys[rand]];
        //console.log(keys[rand]);
        var id = mainIndex[arr[0]][arr[1]];
        $("#" + id).html(player);
        mainBoard[arr[0]][arr[1]] = player;
    
      });
    
      $("#oBtn").on("click", function() {
    
        player = "x";
        opponent = "o";
        $("#chooser").fadeOut();
        $("#result").fadeOut();
        $("#main").fadeTo(1000,1.0);
    $(".squares").prop("disabled",false);
        mainBoard = [
          ["_", "_", "_"],
          ["_", "_", "_"],
          ["_", "_", "_"]
        ];
    
        var keys = Object.keys(index);
        //console.log(keys);
        for (var i = 0; i < keys.length; i++) {
    
          //console.log(keys[i]);
          $("#" + keys[i]).html("");
        }
        $("main").empty();
    
        var rand = Math.floor(Math.random() * (keys.length + 1));
    
        var arr = index[keys[rand]];
    
        var id = mainIndex[arr[0]][arr[1]];
        $("#" + id).html(player);
        mainBoard[arr[0]][arr[1]] = player;
      });
    
    });