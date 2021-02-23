import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddHourPointComponent } from '../add-hour-point/add-hour-point.component';
import { PointServiceService } from './point-service.service';
import { timePoint } from './timePoint';

// TODO Adjust to my object "TIMEPOINT"
export interface PeriodicElement {
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { name: 'Helium', weight: 4.0026, symbol: 'He' },
  { name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { name: 'Boron', weight: 10.811, symbol: 'B' },
  { name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private service: PointServiceService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.listAll().subscribe(resp => {
      console.log(resp);
    },
      err => {
        console.log(err);
      }
    );
  }

  openNewTimePoint(): void {
    const dialogRef = this.dialog.open(AddHourPointComponent , {
      width: '400px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }


}
