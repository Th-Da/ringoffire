import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogNoticeComponent } from '../dialog-notice/dialog-notice.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoomFullNoticeComponent } from '../room-full-notice/room-full-notice.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss', './game-media.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  pickCardAnimation = false;
  currendCard = '';
  game: Game;
  destroyed = new Subject<void>();

  constructor(public dialog: MatDialog) {

  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe(name => {
     /*  if (this.game.players.length > 3) {
        this.dialog.open(RoomFullNoticeComponent);
      }
      else */ if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }


  takeCard() {
    if (!this.pickCardAnimation && this.game.players.length > 1) {
      this.currendCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.game.playedCards.push(this.currendCard)
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.pickCardAnimation = false;
      }, 1000)
    } else if (!this.pickCardAnimation) {
      this.dialog.open(DialogNoticeComponent);
    }
  }

}
