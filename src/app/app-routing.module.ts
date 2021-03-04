import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddHourPointComponent } from './add-hour-point/add-hour-point.component';
import { ExtractComponent } from './download-file/extract/extract.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "add-hour-point",
    component: AddHourPointComponent,
  },
  {
    path: "extract-to-file",
    component: ExtractComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
