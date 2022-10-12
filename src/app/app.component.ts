import { Component } from '@angular/core';
import { NavigationService } from './navigation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ringoffire';

  constructor(public navServ: NavigationService) {

  }
}

