import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  /* router: any; */

  constructor(public navServ: NavigationService) { };

  ngOnInit(): void {
  }


  newGame() {

  }

}
