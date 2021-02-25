import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-hour-point',
  templateUrl: './add-hour-point.component.html',
  styleUrls: ['./add-hour-point.component.css']
})
export class AddHourPointComponent implements OnInit {

  formTimePoint: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddHourPointComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    if(this.data){
      this.formTimePoint = this.formBuilder.group({
        customer: [this.data.customer],
        date: [this.data.date],
        description: [this.data.description],
        hour: [this.data.hour],
        manager: [this.data.manager],
        project: [this.data.project],
        service: [this.data.service]
      })
    }else{
      this.formTimePoint = this.formBuilder.group({
        customer: [""],
        date: [""],
        description: [""],
        hour: [""],
        manager: [""],
        project: [""],
        service: [""]
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
