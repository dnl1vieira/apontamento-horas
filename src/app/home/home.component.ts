import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { AddHourPointComponent } from '../add-hour-point/add-hour-point.component';
import { ConfirmActionComponent } from '../core/confirm-action/confirm-action.component';
import { PointServiceService } from './point-service.service';
import { TimePoint } from './TimePoint';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  filters: [] = [];
  tableLength: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  action = 'Close!'
  listTimePoints: TimePoint[] = [];
  displayedColumns: string[] = ['date', 'service', 'customer', 'manager', 'project', 'hour', 'description', 'actions'];
  dataSource = new MatTableDataSource();
  loading: boolean;

  constructor(
    private service: PointServiceService,
    public dialog: MatDialog,
    private alert: MatSnackBar) { }

  ngOnInit(): void {
    this.paginator.page.subscribe(page => this.getAll(page, 0, []));
    this.getAll(this.paginator, 0, []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAll(page, pageIndex = page.pageIndex, filters) {
    this.loading = true;
    this.paginator.pageIndex = pageIndex;
    const pageSize = !this.paginator.pageSize ? 6 : this.paginator.pageSize;
    this.service.listAll(page.pageIndex, pageSize, filters).subscribe(resp => {
      this.loading = false;
      this.listTimePoints = resp["content"];
      this.tableLength = resp["totalElements"];
      this.dataSource = new MatTableDataSource(this.listTimePoints);
    },
      err => {
        this.loading = false;
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
      this.loading = true;
      if (result) {
        this.service.create(result).subscribe(
          resp => {this.getAll(this.paginator, 0, [])
            this.loading = true
            this.alert.open(resp, this.action, {
              duration: 2000,
            });
          },
          err => console.log(err)
        );
      }

    });
  }

  delete(value) {
    this.loading = true;
    this.dialog.open(
      ConfirmActionComponent,
      { data: { message: 'Certeza que deseja deletar esse registro?' } }
    )
      .afterClosed().subscribe(
        result => {
          if(result){
            this.service.delete(value).subscribe(
              resp => { 
                this.loading = false;
                this.getAll(this.paginator, 0, []);
                  this.alert.open(resp, this.action, {
                  duration: 2000,
                  });
              }
            );
          }
        }
      );
  }

  filter() {
    var start = moment(this.range.get('start').value).format('yyyy-MM-DD 00:mm:SS');
    var end = moment(this.range.get('end').value).format('yyyy-MM-DD hh:mm:SS');
    
    this.getAll(this.paginator, 0, {start, end})
  }

  clearFilter(){
    this.range.reset();
    this.getAll(this.paginator, 0, []);
  }

}
