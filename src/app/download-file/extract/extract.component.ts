import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ExtractService } from './extract.service';
import FileSaver from 'file-saver';



@Component({
  selector: 'app-eextract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.css']
})
export class ExtractComponent implements OnInit {
  loading: boolean;
  
  extractForm = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private formBuilder: FormBuilder,
    private service: ExtractService) { }

  ngOnInit(): void {
    this.extractForm = this.formBuilder.group({
      start: ["", Validators.required],
      end: ["", Validators.required]
    })
  }

  downloadFile(){
    var start = moment(this.extractForm.get('start').value).format('yyyy-MM-DD 00:mm:SS');
    var end = moment(this.extractForm.get('end').value).format('yyyy-MM-DD hh:mm:SS');
    
    this.service.downloadFile(start, end).subscribe(resp => {
      console.log({resp})
      const blob = new Blob([resp], { type: '.xlsx' });
      FileSaver.saveAs(blob, 'apontamento.xlsx');
    }, err => console.log(err))
    
  }

}
