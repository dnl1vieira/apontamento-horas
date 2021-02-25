import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddHourPointComponent } from '../add-hour-point/add-hour-point.component';
import { ConfirmActionComponent } from '../core/confirm-action/confirm-action.component';
import { PointServiceService } from './point-service.service';
import { TimePoint } from './TimePoint';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  listTimePoints: TimePoint[] = [];
  displayedColumns: string[] = ['customer', 'date', 'manager', 'project', 'hour', 'description', 'actions'];
  dataSource = [];

  constructor(
    private service: PointServiceService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.listAll().subscribe(resp => {
      this.listTimePoints = resp["content"];
      this.dataSource = this.listTimePoints
    },
      err => {
        console.log(err);
      }
    );
  }

  openNewTimePoint(element) {
    const dialogConfig = {
      width: '400px',
      height: '530px',
      data: element
    }

    const dialogRef = this.dialog.open(AddHourPointComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.create(result).subscribe(
          resp => this.getAll(),
          err => console.log(err)
        );
      }

    });
  }

  delete(value) {
    this.dialog.open(
      ConfirmActionComponent,
      { data: { message: 'Certeza que deseja deletar esse registro?' } }
    )
      .afterClosed().subscribe(
        result => {
          this.service.delete(value).subscribe(
            () => { this.getAll(); }
          );
        }
      );
  }

}
