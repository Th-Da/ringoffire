import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogNoticeComponent } from '../dialog-notice/dialog-notice.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Firestore, collectionData, collection, setDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss', './game-media.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  game: Game;
  destroyed = new Subject<void>();
  gameId: string;



  constructor(private route: ActivatedRoute, private angularFirestore: AngularFirestore, public dialog: MatDialog) {

  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];

      this
        .angularFirestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges().
        subscribe((game: any) => {
          console.log('Game update: ', game)
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currendCard = game.currendCard;
        });
    });
  }

  newGame() {
    this.game = new Game();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }


  takeCard() {
    if (!this.game.pickCardAnimation && this.game.players.length > 1) {
      this.game.currendCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currendCard)
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000)
    } else if (!this.game.pickCardAnimation) {
      this.dialog.open(DialogNoticeComponent);
    }
  }

  saveGame() {
    this
      .angularFirestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());

  }

}
