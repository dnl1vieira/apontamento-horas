import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  arrow;
  isClose = true;
  events: string[] = [];
  opened: boolean;

  shouldRun = true;

  constructor() { }

  ngOnInit(): void {
    this.changeIconArrow();
  }

  changeIconArrow() {  
    if(this.isClose){
      this.arrow = "keyboard_arrow_right";
      this.isClose = false; 
    }else{
      this.arrow = "keyboard_arrow_left";
      this.isClose = true; 
    }
    
  }

}
