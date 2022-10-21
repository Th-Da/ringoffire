import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { GameRulesComponent } from './game-rules/game-rules.component';
import { MatCardModule } from '@angular/material/card';
import { DialogNoticeComponent } from './dialog-notice/dialog-notice.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RoomFullNoticeComponent } from './room-full-notice/room-full-notice.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
/* import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; */



@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    GameComponent,
    PlayerComponent,
    DialogAddPlayerComponent,
    GameRulesComponent,
    DialogNoticeComponent,
    RoomFullNoticeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    LayoutModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    /*     provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()) */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
