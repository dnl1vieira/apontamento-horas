import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-hour-point',
  templateUrl: './add-hour-point.component.html',
  styleUrls: ['./add-hour-point.component.css']
})
export class AddHourPointComponent implements OnInit {

  formTimePoint: FormGroup;
  title: string;
  services: string[] = ['DESENVOLVIMENTO', 'TESTES', 'SUPORTE'];

  constructor(public dialogRef: MatDialogRef<AddHourPointComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.title = "Editar Apontamento"
      this.formTimePoint = this.formBuilder.group({
        id: [this.data.id],
        customer: [this.data.customer, Validators.required],
        date: [this.data.date, Validators.required],
        description: [this.data.description, Validators.required],
        hour: [this.data.hour, Validators.required],
        manager: [this.data.manager, Validators.required],
        project: [this.data.project, Validators.required],
        service: [this.data.service, Validators.required]
      })
    } else {
      this.title = "Novo Apontamento"
      this.formTimePoint = this.formBuilder.group({
        id: [""],
        customer: ["", Validators.required],
        date: ["", Validators.required],
        description: ["", Validators.required],
        hour: ["", Validators.required],
        manager: ["", Validators.required],
        project: ["", Validators.required],
        service: ["", Validators.required]
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.formTimePoint.reset();
  }

}
