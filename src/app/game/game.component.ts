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
  pickCardAnimation = false;
  currendCard = '';
  game: Game;
  destroyed = new Subject<void>();



  constructor(private route: ActivatedRoute, private angularFirestore: AngularFirestore, public dialog: MatDialog) {

  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);


      this
        .angularFirestore
        .collection('games')
        .doc(params['id'])
        .valueChanges().
        subscribe((game: any) => {
          console.log('Game update: ', game)
          this.game.currentPlayer = game.currentPlayer;
          this.game.currentPlayer = game.playedCards;
          this.game.currentPlayer = game.players;
          this.game.currentPlayer = game.stack;
        });
    });
  }

  newGame() {
    this.game = new Game();
    /*     this.angularFirestore
          .collection('games')
          .add(this.game.toJson()); */
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
