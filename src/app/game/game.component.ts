import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currendCard = '';
  game: Game;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      this.game.players.push(name);
    });
  }


  takeCard() {
    if (!this.pickCardAnimation) {
      this.currendCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.game.playedCards.push(this.currendCard)
        this.pickCardAnimation = false;
      }, 1000)
    }
  }

}
