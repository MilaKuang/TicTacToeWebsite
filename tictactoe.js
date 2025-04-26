new Vue({
    el: "#app",
    data: {
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      player: "X",
      computer: "O",
    },
    methods: {
      playerMove(i, j) {
        if (this.board[i][j] !== "") return;
        this.$set(this.board[i], j, this.player);
  
        if (this.checkWin(this.player)) {
          alert("You win!");
          return;
        }
        // Let computer play immediately
        this.computerMove();
        if (this.checkWin(this.computer)) {
          alert("Computer wins!");
        }
      },
  
      computerMove() {
        // 1. Win if possible
        if (this.tryWinOrBlock(this.computer)) return;
        // 2. Block player
        if (this.tryWinOrBlock(this.player)) return;
        // 3. Take center
        if (this.board[1][1] === "") {
          this.$set(this.board[1], 1, this.computer);
          return;
        }
        // 4. Take a corner
        const corners = [
          [0, 0],
          [0, 2],
          [2, 0],
          [2, 2],
        ];
        for (let [i, j] of corners) {
          if (this.board[i][j] === "") {
            this.$set(this.board[i], j, this.computer);
            return;
          }
        }
        // 5. Otherwise take a side
        const sides = [
          [0, 1],
          [1, 0],
          [1, 2],
          [2, 1],
        ];
        for (let [i, j] of sides) {
          if (this.board[i][j] === "") {
            this.$set(this.board[i], j, this.computer);
            return;
          }
        }
      },
  
      tryWinOrBlock(player) {
        // Try each empty cell
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (this.board[i][j] === "") {
              this.$set(this.board[i], j, player);
              if (this.checkWin(player)) {
                // If it's computer's turn, keep the move; if player's, block
                if (player === this.computer) {
                  return true;
                } else {
                  this.$set(this.board[i], j, this.computer);
                  return true;
                }
              }
              this.$set(this.board[i], j, "");
            }
          }
        }
        return false;
      },
  
      checkWin(player) {
        const b = this.board;
        // Rows & columns
        for (let i = 0; i < 3; i++) {
          if (
            b[i][0] === player &&
            b[i][1] === player &&
            b[i][2] === player
          )
            return true;
          if (
            b[0][i] === player &&
            b[1][i] === player &&
            b[2][i] === player
          )
            return true;
        }
        // Diagonals
        if (
          b[0][0] === player &&
          b[1][1] === player &&
          b[2][2] === player
        )
          return true;
        if (
          b[0][2] === player &&
          b[1][1] === player &&
          b[2][0] === player
        )
          return true;
  
        return false;
      },
  
      reset() {
        // Clear the board
        this.board = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];
      },
    },
  });
